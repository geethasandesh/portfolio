import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useContent } from '../context/ContentContext';

const TABS = ['Profile', 'Hero', 'Projects', 'Experience', 'Skills', 'Education'];
const TOKEN_KEY = 'portfolio_admin_token';

const inputClass =
    'w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 placeholder:text-gray-500';

function newId(prefix) {
    return `${prefix}-${crypto.randomUUID()}`;
}

function Field({ label, value, onChange, placeholder, type = 'text' }) {
    const [visible, setVisible] = useState(false);
    const isPassword = type === 'password';
    const inputType = isPassword && visible ? 'text' : type;

    return (
        <label className="block space-y-1">
            <span className="text-sm text-gray-300">{label}</span>
            <div className="relative">
                <input
                    className={`${inputClass} ${isPassword ? 'pr-11' : ''}`}
                    type={inputType}
                    value={value || ''}
                    placeholder={placeholder}
                    onChange={(e) => onChange(e.target.value)}
                    autoComplete={isPassword ? 'current-password' : undefined}
                />
                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setVisible((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                        aria-label={visible ? 'Hide password' : 'Show password'}
                    >
                        {visible ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                    </button>
                )}
            </div>
        </label>
    );
}

function Area({ label, value, onChange, rows = 4 }) {
    return (
        <label className="block space-y-1">
            <span className="text-sm text-gray-300">{label}</span>
            <textarea className={`${inputClass} min-h-[96px]`} rows={rows} value={value || ''} onChange={(e) => onChange(e.target.value)} />
        </label>
    );
}

function ImageField({ label, value, onChange, token }) {
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState('');

    const onFile = async (file) => {
        if (!file) return;
        setBusy(true);
        setError('');
        try {
            const data = await readAsDataUrl(file);
            const res = await fetch('/api/upload', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({ filename: file.name, data }),
            });
            const json = await res.json();
            if (!res.ok) throw new Error(json.error || 'Upload failed');
            onChange(json.url);
        } catch (err) {
            setError(err.message);
        } finally {
            setBusy(false);
        }
    };

    return (
        <div className="space-y-2">
            <Field label={label} value={value} onChange={onChange} placeholder="/images/photo.jpg or https://..." />
            <div className="flex items-center gap-3">
                <label className="cursor-pointer px-3 py-1.5 rounded-lg border border-white/20 bg-white/5 text-sm hover:bg-white/10">
                    {busy ? 'Uploading…' : 'Upload file'}
                    <input type="file" accept="image/*,.pdf" className="hidden" disabled={busy} onChange={(e) => onFile(e.target.files?.[0])} />
                </label>
                {value && (
                    value.endsWith('.pdf') ? (
                        <a href={value} target="_blank" rel="noreferrer" className="text-sm text-blue-300">View file</a>
                    ) : (
                        <img src={value} alt="" className="h-12 w-12 rounded object-cover border border-white/20" />
                    )
                )}
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
        </div>
    );
}

function readAsDataUrl(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

function Card({ title, children, onRemove, onMoveUp, onMoveDown }) {
    return (
        <div className="border border-white/15 rounded-2xl p-4 md:p-5 bg-white/5 space-y-4">
            <div className="flex items-center justify-between gap-2">
                <h4 className="font-semibold text-white">{title}</h4>
                <div className="flex gap-2">
                    {onMoveUp && <button type="button" onClick={onMoveUp} className="px-2 py-1 text-xs rounded border border-white/20 hover:bg-white/10">Up</button>}
                    {onMoveDown && <button type="button" onClick={onMoveDown} className="px-2 py-1 text-xs rounded border border-white/20 hover:bg-white/10">Down</button>}
                    {onRemove && <button type="button" onClick={onRemove} className="px-2 py-1 text-xs rounded border border-red-400/40 text-red-300 hover:bg-red-500/10">Remove</button>}
                </div>
            </div>
            {children}
        </div>
    );
}

function moveItem(list, index, dir) {
    const next = [...list];
    const target = index + dir;
    if (target < 0 || target >= next.length) return next;
    [next[index], next[target]] = [next[target], next[index]];
    return next;
}

const Admin = () => {
    const { content, refresh } = useContent();
    const [draft, setDraft] = useState(null);
    const [tab, setTab] = useState('Profile');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState(() => sessionStorage.getItem(TOKEN_KEY) || '');
    const [status, setStatus] = useState({ type: '', msg: '' });
    const [saving, setSaving] = useState(false);
    const [loggingIn, setLoggingIn] = useState(false);

    useEffect(() => {
        if (content) setDraft(structuredClone(content));
    }, [content]);

    const loggedIn = Boolean(token);

    const update = (path, value) => {
        setDraft((prev) => {
            const next = structuredClone(prev);
            const keys = path.split('.');
            let cur = next;
            for (let i = 0; i < keys.length - 1; i++) cur = cur[keys[i]];
            cur[keys[keys.length - 1]] = value;
            return next;
        });
    };

    const login = async (e) => {
        e.preventDefault();
        setLoggingIn(true);
        setStatus({ type: '', msg: '' });
        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const json = await res.json();
            if (!res.ok) throw new Error(json.error || 'Login failed');
            sessionStorage.setItem(TOKEN_KEY, json.token);
            setToken(json.token);
            setEmail('');
            setPassword('');
        } catch (err) {
            setStatus({ type: 'error', msg: err.message });
        } finally {
            setLoggingIn(false);
        }
    };

    const logout = () => {
        sessionStorage.removeItem(TOKEN_KEY);
        setToken('');
    };

    const save = async () => {
        setSaving(true);
        setStatus({ type: '', msg: '' });
        try {
            const res = await fetch('/api/content', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify(draft),
            });
            const json = await res.json();
            if (!res.ok) throw new Error(json.error || 'Save failed');
            await refresh();
            const extra = json.storage === 'github'
                ? ' Live site updates in about a minute.'
                : ' Open the homepage to see changes.';
            setStatus({ type: 'success', msg: 'Saved.' + extra });
        } catch (err) {
            setStatus({ type: 'error', msg: err.message });
        } finally {
            setSaving(false);
        }
    };

    const tabBody = useMemo(() => {
        if (!draft) return null;
        if (tab === 'Profile') {
            return (
                <div className="grid gap-4 max-w-2xl">
                    <Field label="Name" value={draft.profile.name} onChange={(v) => update('profile.name', v)} />
                    <Field label="Location" value={draft.profile.location} onChange={(v) => update('profile.location', v)} />
                    <ImageField label="Profile photo URL" value={draft.profile.image} onChange={(v) => update('profile.image', v)} token={token} />
                    <ImageField label="Resume URL (PDF)" value={draft.profile.resume} onChange={(v) => update('profile.resume', v)} token={token} />
                    <Field label="LinkedIn" value={draft.profile.linkedin} onChange={(v) => update('profile.linkedin', v)} />
                    <Field label="GitHub" value={draft.profile.github} onChange={(v) => update('profile.github', v)} />
                    <Field label="Instagram" value={draft.profile.instagram} onChange={(v) => update('profile.instagram', v)} />
                </div>
            );
        }
        if (tab === 'Hero') {
            return (
                <div className="grid gap-4 max-w-2xl">
                    <Field label="Badge text" value={draft.hero.badge} onChange={(v) => update('hero.badge', v)} />
                    <Field label="Badge link" value={draft.hero.badgeLink} onChange={(v) => update('hero.badgeLink', v)} />
                    <Field label="Role 1" value={draft.hero.role1} onChange={(v) => update('hero.role1', v)} />
                    <Field label="Role 2" value={draft.hero.role2} onChange={(v) => update('hero.role2', v)} />
                    <Area label="About / description" value={draft.hero.description} onChange={(v) => update('hero.description', v)} rows={6} />
                </div>
            );
        }
        if (tab === 'Projects') {
            return (
                <div className="space-y-8">
                    <div className="grid gap-4 max-w-2xl">
                        <Field label="Section badge" value={draft.projects.badge} onChange={(v) => update('projects.badge', v)} />
                        <Field label="Section title" value={draft.projects.title} onChange={(v) => update('projects.title', v)} />
                    </div>
                    {(draft.projects.categories || []).map((cat, catIndex) => (
                        <Card
                            key={cat.id}
                            title={cat.label || 'Category'}
                            onRemove={() => update('projects.categories', draft.projects.categories.filter((_, i) => i !== catIndex))}
                            onMoveUp={() => update('projects.categories', moveItem(draft.projects.categories, catIndex, -1))}
                            onMoveDown={() => update('projects.categories', moveItem(draft.projects.categories, catIndex, 1))}
                        >
                            <Field
                                label="Category name"
                                value={cat.label}
                                onChange={(v) => {
                                    const categories = structuredClone(draft.projects.categories);
                                    categories[catIndex].label = v;
                                    update('projects.categories', categories);
                                }}
                            />
                            <div className="space-y-4">
                                {(cat.projects || []).map((project, pIndex) => (
                                    <Card
                                        key={project.id}
                                        title={project.title || 'Project'}
                                        onRemove={() => {
                                            const categories = structuredClone(draft.projects.categories);
                                            categories[catIndex].projects = categories[catIndex].projects.filter((_, i) => i !== pIndex);
                                            update('projects.categories', categories);
                                        }}
                                        onMoveUp={() => {
                                            const categories = structuredClone(draft.projects.categories);
                                            categories[catIndex].projects = moveItem(categories[catIndex].projects, pIndex, -1);
                                            update('projects.categories', categories);
                                        }}
                                        onMoveDown={() => {
                                            const categories = structuredClone(draft.projects.categories);
                                            categories[catIndex].projects = moveItem(categories[catIndex].projects, pIndex, 1);
                                            update('projects.categories', categories);
                                        }}
                                    >
                                        <Field label="Title" value={project.title} onChange={(v) => {
                                            const categories = structuredClone(draft.projects.categories);
                                            categories[catIndex].projects[pIndex].title = v;
                                            update('projects.categories', categories);
                                        }} />
                                        <Area label="Description" value={project.description} onChange={(v) => {
                                            const categories = structuredClone(draft.projects.categories);
                                            categories[catIndex].projects[pIndex].description = v;
                                            update('projects.categories', categories);
                                        }} />
                                        <Field label="Live / GitHub link (leave empty to hide)" value={project.link} onChange={(v) => {
                                            const categories = structuredClone(draft.projects.categories);
                                            categories[catIndex].projects[pIndex].link = v;
                                            update('projects.categories', categories);
                                        }} />
                                        <Field label="Tags (comma separated)" value={(project.tags || []).join(', ')} onChange={(v) => {
                                            const categories = structuredClone(draft.projects.categories);
                                            categories[catIndex].projects[pIndex].tags = v.split(',').map((t) => t.trim()).filter(Boolean);
                                            update('projects.categories', categories);
                                        }} />
                                        <ImageField label="Image" value={project.image} token={token} onChange={(v) => {
                                            const categories = structuredClone(draft.projects.categories);
                                            categories[catIndex].projects[pIndex].image = v;
                                            update('projects.categories', categories);
                                        }} />
                                    </Card>
                                ))}
                                <button
                                    type="button"
                                    className="px-4 py-2 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 text-sm"
                                    onClick={() => {
                                        const categories = structuredClone(draft.projects.categories);
                                        categories[catIndex].projects.push({
                                            id: newId('project'),
                                            title: 'New project',
                                            description: '',
                                            tags: [],
                                            link: '',
                                            image: '',
                                        });
                                        update('projects.categories', categories);
                                    }}
                                >
                                    + Add project
                                </button>
                            </div>
                        </Card>
                    ))}
                    <button
                        type="button"
                        className="px-4 py-2 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 text-sm"
                        onClick={() => update('projects.categories', [
                            ...draft.projects.categories,
                            { id: newId('cat'), label: 'New category', projects: [] },
                        ])}
                    >
                        + Add category
                    </button>
                </div>
            );
        }
        if (tab === 'Experience') {
            return (
                <div className="space-y-6">
                    <div className="grid gap-4 max-w-2xl">
                        <Field label="Section badge" value={draft.experience.badge} onChange={(v) => update('experience.badge', v)} />
                        <Field label="Section title" value={draft.experience.title} onChange={(v) => update('experience.title', v)} />
                    </div>
                    {(draft.experience.items || []).map((exp, index) => (
                        <Card
                            key={exp.id}
                            title={`${exp.role || 'Role'} · ${exp.company || 'Company'}`}
                            onRemove={() => update('experience.items', draft.experience.items.filter((_, i) => i !== index))}
                            onMoveUp={() => update('experience.items', moveItem(draft.experience.items, index, -1))}
                            onMoveDown={() => update('experience.items', moveItem(draft.experience.items, index, 1))}
                        >
                            <div className="grid md:grid-cols-2 gap-4">
                                <Field label="Role" value={exp.role} onChange={(v) => {
                                    const items = structuredClone(draft.experience.items);
                                    items[index].role = v;
                                    update('experience.items', items);
                                }} />
                                <Field label="Company" value={exp.company} onChange={(v) => {
                                    const items = structuredClone(draft.experience.items);
                                    items[index].company = v;
                                    update('experience.items', items);
                                }} />
                                <Field label="Period" value={exp.period} onChange={(v) => {
                                    const items = structuredClone(draft.experience.items);
                                    items[index].period = v;
                                    update('experience.items', items);
                                }} />
                                <Field label="Company website" value={exp.link} onChange={(v) => {
                                    const items = structuredClone(draft.experience.items);
                                    items[index].link = v;
                                    update('experience.items', items);
                                }} />
                            </div>
                            <Area label="Summary" value={exp.summary} onChange={(v) => {
                                const items = structuredClone(draft.experience.items);
                                items[index].summary = v;
                                update('experience.items', items);
                            }} />
                            <Area label="Achievements (one per line)" value={(exp.achievements || []).join('\n')} onChange={(v) => {
                                const items = structuredClone(draft.experience.items);
                                items[index].achievements = v.split('\n').map((line) => line.trim()).filter(Boolean);
                                update('experience.items', items);
                            }} rows={6} />
                            <div className="space-y-3">
                                <p className="text-sm text-gray-300">Photos</p>
                                {(exp.images || []).map((img, imgIndex) => (
                                    <div key={imgIndex} className="flex items-end gap-2">
                                        <div className="flex-1">
                                            <ImageField
                                                label={`Photo ${imgIndex + 1}`}
                                                value={img}
                                                token={token}
                                                onChange={(v) => {
                                                    const items = structuredClone(draft.experience.items);
                                                    items[index].images[imgIndex] = v;
                                                    update('experience.items', items);
                                                }}
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            className="mb-2 px-2 py-1 text-xs rounded border border-red-400/40 text-red-300"
                                            onClick={() => {
                                                const items = structuredClone(draft.experience.items);
                                                items[index].images = items[index].images.filter((_, i) => i !== imgIndex);
                                                update('experience.items', items);
                                            }}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    className="px-3 py-1.5 text-sm rounded border border-white/20 hover:bg-white/10"
                                    onClick={() => {
                                        const items = structuredClone(draft.experience.items);
                                        items[index].images = [...(items[index].images || []), ''];
                                        update('experience.items', items);
                                    }}
                                >
                                    + Add photo
                                </button>
                            </div>
                        </Card>
                    ))}
                    <button
                        type="button"
                        className="px-4 py-2 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 text-sm"
                        onClick={() => update('experience.items', [
                            ...draft.experience.items,
                            {
                                id: newId('exp'),
                                role: 'New role',
                                company: '',
                                period: '',
                                summary: '',
                                achievements: [],
                                link: '',
                                images: [],
                            },
                        ])}
                    >
                        + Add experience
                    </button>
                </div>
            );
        }
        if (tab === 'Skills') {
            return (
                <div className="space-y-6">
                    <div className="grid gap-4 max-w-2xl">
                        <Field label="Section badge" value={draft.skills.badge} onChange={(v) => update('skills.badge', v)} />
                        <Field label="Section title" value={draft.skills.title} onChange={(v) => update('skills.title', v)} />
                    </div>
                    <div className="grid gap-3">
                        {(draft.skills.items || []).map((skill, index) => (
                            <div key={`${skill.name}-${index}`} className="grid grid-cols-[1fr_1fr_auto] gap-2 items-end">
                                <Field label="Name" value={skill.name} onChange={(v) => {
                                    const items = structuredClone(draft.skills.items);
                                    items[index].name = v;
                                    update('skills.items', items);
                                }} />
                                <Field label="Icon key (python, react, firebase…)" value={skill.icon} onChange={(v) => {
                                    const items = structuredClone(draft.skills.items);
                                    items[index].icon = v;
                                    update('skills.items', items);
                                }} />
                                <button type="button" className="mb-0.5 px-3 py-2 text-sm rounded border border-red-400/40 text-red-300" onClick={() => update('skills.items', draft.skills.items.filter((_, i) => i !== index))}>
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                    <button
                        type="button"
                        className="px-4 py-2 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 text-sm"
                        onClick={() => update('skills.items', [...draft.skills.items, { name: 'New skill', icon: '' }])}
                    >
                        + Add skill
                    </button>
                </div>
            );
        }
        return (
            <div className="space-y-6">
                <Field label="Section title" value={draft.education.title} onChange={(v) => update('education.title', v)} />
                {(draft.education.items || []).map((edu, index) => (
                    <Card
                        key={edu.id}
                        title={edu.institution || 'Education'}
                        onRemove={() => update('education.items', draft.education.items.filter((_, i) => i !== index))}
                        onMoveUp={() => update('education.items', moveItem(draft.education.items, index, -1))}
                        onMoveDown={() => update('education.items', moveItem(draft.education.items, index, 1))}
                    >
                        <Field label="Degree / title" value={edu.degree} onChange={(v) => {
                            const items = structuredClone(draft.education.items);
                            items[index].degree = v;
                            update('education.items', items);
                        }} />
                        <div className="grid md:grid-cols-2 gap-4">
                            <Field label="Institution" value={edu.institution} onChange={(v) => {
                                const items = structuredClone(draft.education.items);
                                items[index].institution = v;
                                update('education.items', items);
                            }} />
                            <Field label="Location" value={edu.location} onChange={(v) => {
                                const items = structuredClone(draft.education.items);
                                items[index].location = v;
                                update('education.items', items);
                            }} />
                            <Field label="Period" value={edu.period} onChange={(v) => {
                                const items = structuredClone(draft.education.items);
                                items[index].period = v;
                                update('education.items', items);
                            }} />
                            <Field label="Score" value={edu.score} onChange={(v) => {
                                const items = structuredClone(draft.education.items);
                                items[index].score = v;
                                update('education.items', items);
                            }} />
                        </div>
                    </Card>
                ))}
                <button
                    type="button"
                    className="px-4 py-2 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 text-sm"
                    onClick={() => update('education.items', [
                        ...draft.education.items,
                        { id: newId('edu'), degree: '', institution: '', location: '', period: '', score: '' },
                    ])}
                >
                    + Add education
                </button>
            </div>
        );
    }, [draft, tab, token]);

    if (!loggedIn) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
                <form onSubmit={login} className="w-full max-w-sm border border-white/20 bg-white/5 backdrop-blur-xl rounded-2xl p-8 space-y-5">
                    <div>
                        <p className="text-sm text-gray-400 mb-1">Portfolio CMS</p>
                        <h1 className="text-2xl font-bold">Admin login</h1>
                    </div>
                    <Field label="Email" type="email" value={email} onChange={setEmail} placeholder="you@example.com" />
                    <Field label="Password" type="password" value={password} onChange={setPassword} placeholder="Password" />
                    {status.msg && <p className="text-red-400 text-sm">{status.msg}</p>}
                    <button disabled={loggingIn} className="w-full bg-gradient-to-r from-blue-500 to-purple-500 font-semibold py-3 rounded-lg hover:opacity-90 disabled:opacity-50">
                        {loggingIn ? 'Signing in…' : 'Sign in'}
                    </button>
                    <Link to="/" className="block text-center text-sm text-gray-400 hover:text-white">Back to site</Link>
                </form>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white">
            <header className="sticky top-0 z-20 border-b border-white/10 bg-black/80 backdrop-blur-md">
                <div className="max-w-6xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <p className="text-xs text-gray-400">Edit without touching code</p>
                        <h1 className="text-xl font-bold">Portfolio admin</h1>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <Link to="/" className="px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10 text-sm">View site</Link>
                        <button onClick={logout} className="px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10 text-sm">Log out</button>
                        <button onClick={save} disabled={saving || !draft} className="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 font-semibold text-sm disabled:opacity-50">
                            {saving ? 'Saving…' : 'Save changes'}
                        </button>
                    </div>
                </div>
            </header>

            <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
                {status.msg && (
                    <div className={`p-3 rounded-lg ${status.type === 'success' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                        {status.msg}
                    </div>
                )}

                <div className="flex flex-wrap gap-2">
                    {TABS.map((name) => (
                        <button
                            key={name}
                            onClick={() => setTab(name)}
                            className={`px-4 py-2 rounded-full text-sm border ${tab === name ? 'bg-white text-black border-white' : 'border-white/20 text-gray-300 hover:bg-white/10'}`}
                        >
                            {name}
                        </button>
                    ))}
                </div>

                {draft ? tabBody : <p className="text-gray-400">Loading content…</p>}
            </div>
        </div>
    );
};

export default Admin;
