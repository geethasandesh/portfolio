import { applyCors, hasAdminCredentials, verifyCredentials, createToken } from '../lib/auth.js';

export default async function handler(req, res) {
    applyCors(res);
    if (req.method === 'OPTIONS') return res.status(204).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    if (!hasAdminCredentials()) {
        return res.status(500).json({ error: 'ADMIN_EMAIL and ADMIN_PASSWORD are not set on the server.' });
    }

    const { email, password } = req.body || {};
    if (!verifyCredentials(email, password)) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }

    return res.status(200).json({ token: createToken() });
}
