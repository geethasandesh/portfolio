
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import emailHandler from './api/email.js';
import loginHandler from './api/login.js';
import contentHandler from './api/content.js';
import uploadHandler from './api/upload.js';

dotenv.config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.all('/api/email', async (req, res) => {
    try {
        await emailHandler(req, res);
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.all('/api/login', loginHandler);
app.all('/api/content', contentHandler);
app.all('/api/upload', uploadHandler);

app.listen(PORT, () => {
    console.log(`Backend server running at http://localhost:${PORT}`);
});
