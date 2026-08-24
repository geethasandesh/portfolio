import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const CONTENT_PATH = 'public/content.json';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const localContentPath = path.join(__dirname, '..', CONTENT_PATH);

function githubConfig() {
    const token = process.env.GITHUB_TOKEN;
    const owner = process.env.GITHUB_REPO?.split('/')[0] || process.env.VERCEL_GIT_REPO_OWNER;
    const repo = process.env.GITHUB_REPO?.split('/')[1] || process.env.VERCEL_GIT_REPO_SLUG;
    const branch = process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || 'main';
    if (!token || !owner || !repo) return null;
    return { token, owner, repo, branch };
}

async function githubRequest(url, token, options = {}) {
    const res = await fetch(url, {
        ...options,
        headers: {
            Accept: 'application/vnd.github+json',
            Authorization: `Bearer ${token}`,
            'X-GitHub-Api-Version': '2022-11-28',
            'User-Agent': 'portfolio-cms',
            ...(options.headers || {}),
        },
    });
    return res;
}

async function readFromGitHub() {
    const gh = githubConfig();
    if (!gh) return null;
    const url = `https://api.github.com/repos/${gh.owner}/${gh.repo}/contents/${CONTENT_PATH}?ref=${encodeURIComponent(gh.branch)}`;
    const res = await githubRequest(url, gh.token);
    if (!res.ok) return null;
    const data = await res.json();
    const json = Buffer.from(data.content, 'base64').toString('utf8');
    return { content: JSON.parse(json), sha: data.sha };
}

async function writeToGitHub(content) {
    const gh = githubConfig();
    if (!gh) throw new Error('GitHub is not configured');
    const current = await readFromGitHub();
    const body = {
        message: 'Update portfolio content from admin panel',
        content: Buffer.from(JSON.stringify(content, null, 2), 'utf8').toString('base64'),
        branch: gh.branch,
        ...(current?.sha ? { sha: current.sha } : {}),
    };
    const url = `https://api.github.com/repos/${gh.owner}/${gh.repo}/contents/${CONTENT_PATH}`;
    const res = await githubRequest(url, gh.token, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });
    if (!res.ok) {
        const err = await res.text();
        throw new Error(`GitHub save failed: ${res.status} ${err}`);
    }
}

async function writeFileToGitHub(filePath, buffer, message) {
    const gh = githubConfig();
    if (!gh) return null;
    const apiPath = filePath.replace(/^\//, '');
    const getUrl = `https://api.github.com/repos/${gh.owner}/${gh.repo}/contents/${apiPath}?ref=${encodeURIComponent(gh.branch)}`;
    const existing = await githubRequest(getUrl, gh.token);
    const sha = existing.ok ? (await existing.json()).sha : undefined;
    const putUrl = `https://api.github.com/repos/${gh.owner}/${gh.repo}/contents/${apiPath}`;
    const res = await githubRequest(putUrl, gh.token, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            message,
            content: buffer.toString('base64'),
            branch: gh.branch,
            ...(sha ? { sha } : {}),
        }),
    });
    if (!res.ok) {
        const err = await res.text();
        throw new Error(`GitHub upload failed: ${res.status} ${err}`);
    }
    return `/${apiPath.replace(/^public\//, '')}`;
}

async function readFromFile() {
    const candidates = [
        localContentPath,
        path.join(process.cwd(), CONTENT_PATH),
    ];
    for (const filePath of candidates) {
        try {
            const raw = await fs.readFile(filePath, 'utf8');
            return JSON.parse(raw);
        } catch {
            // try next location
        }
    }
    throw new Error('Could not read content.json');
}

export function canPersist() {
    return Boolean(githubConfig()) || !process.env.VERCEL;
}

export async function readContent() {
    const fromGitHub = await readFromGitHub();
    if (fromGitHub?.content) return fromGitHub.content;
    return readFromFile();
}

export async function writeContent(content) {
    if (githubConfig()) {
        await writeToGitHub(content);
        try {
            await fs.writeFile(localContentPath, JSON.stringify(content, null, 2));
        } catch {
            // Read-only on Vercel — GitHub is the source of truth.
        }
        return { storage: 'github' };
    }
    if (process.env.VERCEL) {
        throw new Error('Set GITHUB_TOKEN on Vercel so the admin panel can save after hosting.');
    }
    await fs.writeFile(localContentPath, JSON.stringify(content, null, 2));
    return { storage: 'file' };
}

export async function saveUpload({ filename, buffer }) {
    const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, '_');
    const unique = `${Date.now()}-${safeName}`;
    const relative = `public/images/uploads/${unique}`;

    if (githubConfig()) {
        const publicUrl = await writeFileToGitHub(relative, buffer, `Upload ${unique} from admin panel`);
        return publicUrl;
    }
    if (process.env.VERCEL) {
        throw new Error('Set GITHUB_TOKEN on Vercel to upload images after hosting.');
    }
    const destDir = path.join(__dirname, '..', 'public/images/uploads');
    await fs.mkdir(destDir, { recursive: true });
    await fs.writeFile(path.join(destDir, unique), buffer);
    return `/images/uploads/${unique}`;
}
