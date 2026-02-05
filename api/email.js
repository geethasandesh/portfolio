
import nodemailer from 'nodemailer';

// Create transporter using provided credentials
const createTransporter = () => {
    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
};

// ...

// Vercel Serverless Function Handler
export default async function handler(req, res) {
    // ...

    try {
        const transporter = createTransporter();
        const mailOptions = {
            from: process.env.EMAIL_USER, // Sender address (authenticated account)
            to: 'geethasandesh09@gmail.com', // Receiver address
            replyTo: email, // Allow replying directly to the sender
            subject: `New Contact from Portfolio: ${name}`,
            html: createEmailTemplate({ name, email, message }),
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.messageId);

        return res.status(200).json({ success: true, message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ success: false, message: 'Failed to send email', error: error.message });
    }
}
