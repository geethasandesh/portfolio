import React from 'react';

const projects = [
    {
        title: "Vehicle License Plate Recognition",
        description: "ML-based system to detect and track license plates in video frames, addressing the challenge of moving platforms.",
        tags: ["Machine Learning", "Python", "Computer Vision"]
    },
    {
        title: "The Powder Legacy",
        description: "Responsive e-commerce site for organic powders with animations, payments (Razorpay), and post-order management (Ecwid).",
        tags: ["React", "Tailwind CSS", "Supabase", "Razorpay"],
        link: "https://www.thepowderlegacy.in/"
    },
    {
        title: "Skull Engine Studio",
        description: "Service-based website for marketing and animation with themed sections and EmailJS integration.",
        tags: ["React", "Tailwind CSS", "EmailJS"],
        link: "https://www.skullenginestudio.in/"
    },
    {
        title: "Gold Center - Web App",
        description: "Web app for a gold shop to manage rates, staff, billing, and custom gold making calculations. WhatsApp integration.",
        tags: ["React", "Firebase", "Math Logic"],
        link: "https://goldrush-one.vercel.app/"
    },
    {
        title: "Daily Tools",
        description: "Web services hub with online tools. AI models/Python scripts on backend (Railway) and React frontend (Vercel).",
        tags: ["React", "Python", "AI Models"],
        link: "https://dailytools1.vercel.app/"
    },
    {
        title: "Farm Cart - Mobile App",
        description: "Mobile app connecting farmers and users for organic produce. Features direct buying/selling.",
        tags: ["React Native", "Expo Go", "Firebase"],
        link: "https://github.com/geethasandesh/farmcart"
    },
    {
        title: "Sangeeth - Music App",
        description: "Personal music streaming app using Expo and Firebase for playlist management and playback.",
        tags: ["React Native", "Expo Go", "Firebase"],
        link: "https://github.com/geethasandesh/sangeeth"
    }
];

const Projects = () => {
    return (
        <div className="py-20">
            <h2 className="text-3xl font-bold mb-10 text-center">Featured Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project, index) => (
                    <div key={index} className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-xl rounded-2xl p-6 hover:bg-white/15 transition-colors cursor-pointer group">
                        <h3 className="text-xl font-bold mb-3 group-hover:text-blue-300 transition-colors">{project.title}</h3>
                        <p className="text-gray-300 mb-6">{project.description}</p>
                        <div className="flex flex-wrap gap-2">
                            {project.tags.map(tag => (
                                <span key={tag} className="text-xs px-2 py-1 rounded bg-white/5 border border-white/10 text-gray-300">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Projects;
