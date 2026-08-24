import crypto from 'crypto';

const TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000;

function getSecret() {
    return process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD || 'dev-secret';
}

function safeEqual(a, b) {
    if (typeof a !== 'string' || typeof b !== 'string') return false;
    const left = Buffer.from(a);
    const right = Buffer.from(b);
    if (left.length !== right.length) return false;
    return crypto.timingSafeEqual(left, right);
}

export function hasAdminCredentials() {
    return Boolean(process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD);
}

export function verifyCredentials(email, password) {
    const expectedEmail = (process.env.ADMIN_EMAIL || '').trim().toLowerCase();
    const expectedPassword = process.env.ADMIN_PASSWORD || '';
    const givenEmail = (email || '').trim().toLowerCase();
    return safeEqual(givenEmail, expectedEmail) && safeEqual(password, expectedPassword);
}

export function createToken() {
    const payload = Buffer.from(JSON.stringify({ exp: Date.now() + TOKEN_TTL_MS })).toString('base64url');
    const sig = crypto.createHmac('sha256', getSecret()).update(payload).digest('base64url');
    return `${payload}.${sig}`;
}

export function verifyToken(token) {
    if (!token || typeof token !== 'string' || !token.includes('.')) return false;
    const [payload, sig] = token.split('.');
    const expected = crypto.createHmac('sha256', getSecret()).update(payload).digest('base64url');
    const sigBuf = Buffer.from(sig);
    const expectedBuf = Buffer.from(expected);
    if (sigBuf.length !== expectedBuf.length) return false;
    if (!crypto.timingSafeEqual(sigBuf, expectedBuf)) return false;
    try {
        const data = JSON.parse(Buffer.from(payload, 'base64url').toString());
        return Date.now() < data.exp;
    } catch {
        return false;
    }
}

export function getTokenFromRequest(req) {
    const header = req.headers.authorization || req.headers.Authorization || '';
    if (header.startsWith('Bearer ')) return header.slice(7);
    return null;
}

export function applyCors(res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}
