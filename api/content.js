import { applyCors, getTokenFromRequest, verifyToken } from '../lib/auth.js';
import { canPersist, readContent, writeContent } from '../lib/contentStore.js';

export default async function handler(req, res) {
    applyCors(res);
    res.setHeader('Cache-Control', 'no-store');
    if (req.method === 'OPTIONS') return res.status(204).end();

    try {
        if (req.method === 'GET') {
            const content = await readContent();
            return res.status(200).json(content);
        }

        if (req.method === 'PUT' || req.method === 'POST') {
            const token = getTokenFromRequest(req);
            if (!verifyToken(token)) {
                return res.status(401).json({ error: 'Unauthorized' });
            }
            const content = req.body;
            if (!content || typeof content !== 'object') {
                return res.status(400).json({ error: 'Invalid content' });
            }
            const result = await writeContent(content);
            return res.status(200).json({ success: true, ...result, persist: canPersist() });
        }

        return res.status(405).json({ error: 'Method not allowed' });
    } catch (error) {
        console.error('Content API error:', error);
        return res.status(500).json({ error: error.message || 'Failed to handle content' });
    }
}
