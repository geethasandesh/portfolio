import React from 'react';

const Contact = () => {
    return (
        <div className="py-20 max-w-4xl mx-auto">
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-xl rounded-2xl p-6 text-center">
                <h2 className="text-3xl font-bold mb-6">Let's Work Together</h2>
                <p className="text-gray-300 mb-8 max-w-xl mx-auto">
                    Have a project in mind? I'm always open to discussing new opportunities and interesting ideas.
                </p>
                <form className="max-w-md mx-auto space-y-4 text-left">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                        <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-gray-500" placeholder="John Doe" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                        <input type="email" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-gray-500" placeholder="john@example.com" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Message</label>
                        <textarea className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-gray-500 h-32" placeholder="Tell me about your project..."></textarea>
                    </div>
                    <button type="button" className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-blue-500/25">
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Contact;
