
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import emailHandler from './api/email.js';

dotenv.config();

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Proxy Vercel Function
app.all('/api/email', async (req, res) => {
    try {
        await emailHandler(req, res);
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Backend server running at http://localhost:${PORT}`);
});
