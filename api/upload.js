import { applyCors, getTokenFromRequest, verifyToken } from '../lib/auth.js';
import { saveUpload } from '../lib/contentStore.js';

const MAX_BYTES = 2 * 1024 * 1024;

export default async function handler(req, res) {
    applyCors(res);
    if (req.method === 'OPTIONS') return res.status(204).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const token = getTokenFromRequest(req);
    if (!verifyToken(token)) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const { filename, data } = req.body || {};
        if (!filename || !data) {
            return res.status(400).json({ error: 'filename and data are required' });
        }
        const match = String(data).match(/^data:([^;]+);base64,(.+)$/);
        if (!match) {
            return res.status(400).json({ error: 'Invalid data URL' });
        }
        const buffer = Buffer.from(match[2], 'base64');
        if (buffer.length > MAX_BYTES) {
            return res.status(400).json({ error: 'File is larger than 2MB' });
        }
        const url = await saveUpload({ filename, buffer });
        return res.status(200).json({ url });
    } catch (error) {
        console.error('Upload API error:', error);
        return res.status(500).json({ error: error.message || 'Upload failed' });
    }
}
