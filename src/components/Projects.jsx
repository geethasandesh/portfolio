import React from 'react';
import { FaExternalLinkAlt, FaLock } from 'react-icons/fa';
import { useContent } from '../context/ContentContext';
import { useLocalizedText } from '../lib/useLocalizedText';

const Projects = () => {
    const { tx } = useLocalizedText();
    const { content } = useContent();
    const { projects } = content;
    const categories = projects.categories || [];

    return (
        <div className="py-20" id="projects">
            <div className="mb-16">
                <div className="inline-block px-4 py-1.5 mb-4 border border-white/60 rounded-full bg-white/5 backdrop-blur-sm text-sm font-medium text-gray-300">
                    {tx('projects.badge', projects.badge)}
                </div>
                <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                    {tx('projects.title', projects.title)}
                </h2>
            </div>

            <div className="space-y-20">
                {categories.map((category) => (
                    <div key={category.id}>
                        <h3 className="text-2xl font-bold text-gray-200 mb-8 border-l-4 border-blue-500 pl-4">
                            {tx(`projects.categories.${category.id}`, category.label)}
                        </h3>

                        <div className="grid grid-cols-1 gap-12">
                            {(category.projects || []).map((project) => {
                                const title = tx(`projects.items.${project.id}.title`, project.title);
                                const description = tx(`projects.items.${project.id}.description`, project.description);
                                return (
                                <div
                                    key={project.id}
                                    className="group relative grid grid-cols-1 md:grid-cols-2 bg-white/5 backdrop-blur-sm border border-white/60 rounded-3xl overflow-hidden hover:bg-white/10 transition-colors duration-300"
                                >
                                    <div className="h-64 md:h-auto relative overflow-hidden flex items-center justify-center border-r border-white/10 bg-black/20 p-4 md:p-8 group-hover:bg-black/30 transition-colors">
                                        <div className="w-full h-auto aspect-video rounded-xl border border-white/20 overflow-hidden shadow-2xl relative group-hover:scale-105 transition-transform duration-500">
                                            {project.image ? (
                                                <img
                                                    src={project.image}
                                                    alt={title}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-white/5" />
                                            )}
                                        </div>
                                    </div>

                                    <div className="p-8 md:p-12 flex flex-col justify-center">
                                        <div className="flex justify-between items-start mb-4">
                                            <h4 className="text-2xl font-bold text-white group-hover:text-blue-300 transition-colors">
                                                {title}
                                            </h4>
                                            {project.link ? (
                                                <a
                                                    href={project.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-gray-400 hover:text-white transition-colors"
                                                >
                                                    <FaExternalLinkAlt />
                                                </a>
                                            ) : (
                                                <span className="text-gray-600" title="Internal/Academic Project">
                                                    <FaLock size={14} />
                                                </span>
                                            )}
                                        </div>

                                        <p className="text-gray-400 mb-8 text-lg leading-relaxed">
                                            {description}
                                        </p>

                                        <div className="flex flex-wrap gap-2 mt-auto">
                                            {(project.tags || []).map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-300 text-sm font-medium"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Projects;
