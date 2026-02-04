import React from 'react';

const projects = [
    {
        title: "E-Commerce Dashboard",
        description: "A comprehensive dashboard for managing online stores with real-time analytics.",
        tags: ["React", "Tailwind", "Recharts"]
    },
    {
        title: "Social Media App",
        description: "Connect with friends and share moments in a beautiful glassmorphism interface.",
        tags: ["Next.js", "Firebase", "Framer Motion"]
    },
    {
        title: "AI Image Generator",
        description: "Generate stunning artwork using the latest stable diffusion models.",
        tags: ["Python", "React", "FastAPI"]
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
