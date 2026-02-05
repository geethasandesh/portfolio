import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Contact = () => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState({ type: '', msg: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus({ type: '', msg: '' });

        try {
            const response = await fetch('/api/email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const result = await response.json();

            if (response.ok) {
                setStatus({ type: 'success', msg: 'Message sent successfully!' });
                setFormData({ name: '', email: '', message: '' });
            } else {
                setStatus({ type: 'error', msg: result.message || 'Failed to send message.' });
            }
        } catch (error) {
            setStatus({ type: 'error', msg: 'An error occurred. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div id="contact" className="py-20 max-w-4xl mx-auto">
            <div className="backdrop-blur-xl bg-white/10 border border-white/60 shadow-xl rounded-2xl p-6 text-center">
                <h2 className="text-3xl font-bold mb-6">{t('contact.title')}</h2>
                <p className="text-gray-300 mb-8 max-w-xl mx-auto">
                    {t('contact.subtitle')}
                </p>

                {status.msg && (
                    <div className={`mb-4 p-3 rounded-lg ${status.type === 'success' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                        {status.msg}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 text-left">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">{t('contact.name')}</label>
                        <input
                            name="name"
                            type="text"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-gray-500"
                            placeholder={t('contact.namePlaceholder')}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">{t('contact.email')}</label>
                        <input
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-gray-500"
                            placeholder={t('contact.emailPlaceholder')}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">{t('contact.messageLabel')}</label>
                        <textarea
                            name="message"
                            required
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-gray-500 h-32"
                            placeholder={t('contact.messagePlaceholder')}
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? 'Sending...' : t('contact.submit')}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Contact;
