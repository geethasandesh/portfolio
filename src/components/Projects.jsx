import React from 'react';
import { FaExternalLinkAlt, FaGithub, FaLock } from 'react-icons/fa';

import vcrImg from '../assets/projects/vcr.jpg';
import dailyToolsImg from '../assets/projects/dailytools.png';
import tplImg from '../assets/projects/tpl.png';
import goldImg from '../assets/projects/gold.png';
import sklImg from '../assets/projects/skl.png';
import farmCartImg from '../assets/projects/farmkart.png';
import sangeethImg from '../assets/projects/sangeeth.png';

const projectCategories = [
    {
        title: "AI & Machine Learning",
        projects: [
            {
                title: "Vehicle License Plate Recognition",
                description: "ML-based system to detect and track license plates in video frames. Solves the challenge of identifying vehicles from moving platforms using Computer Vision.",
                tags: ["Python", "OpenCV", "Machine Learning"],
                link: null, // Academic project
                image: vcrImg
            },
            {
                title: "Daily Tools - AI Services",
                description: "Web services hub powered by backend AI models and Python scripts. Provides various online tools for productivity and automation.",
                tags: ["Python", "AI Models", "Railway", "React"],
                link: "https://dailytools1.vercel.app/",
                image: dailyToolsImg
            }
        ]
    },
    {
        title: "Web Development",
        projects: [
            {
                title: "The Powder Legacy",
                description: "Full-stack e-commerce platform for organic powders. Features smooth animations, Razorpay payment integration, and a separate admin dashboard.",
                tags: ["React", "Supabase", "Tailwind", "Razorpay"],
                link: "https://www.thepowderlegacy.in/",
                image: tplImg
            },
            {
                title: "Gold Center App",
                description: "Business management app for gold shops. Handles live rates, staff management, and complex gold making calculations with billing.",
                tags: ["React", "Firebase", "Logic & Math"],
                link: "https://goldrush-one.vercel.app/",
                image: goldImg
            },
            {
                title: "Skull Engine Studio",
                description: "Immersive service website for a marketing and animation studio. Features themed sections to match different service vibes.",
                tags: ["React", "Tailwind CSS", "EmailJS"],
                link: "https://www.skullenginestudio.in/",
                image: sklImg
            }
        ]
    },
    {
        title: "Mobile Development",
        projects: [
            {
                title: "Farm Cart",
                description: "Direct-to-consumer marketplace app connecting farmers with buyers for fresh organic produce. Bridges the gap between source and table.",
                tags: ["React Native", "Expo Go", "Firebase"],
                link: "https://github.com/geethasandesh/farmcart",
                image: farmCartImg
            },
            {
                title: "Sangeeth Music",
                description: "Personalized music streaming application. Allows users to manage playlists and stream songs seamlessly via Firebase.",
                tags: ["React Native", "Expo Go", "Firebase"],
                link: "https://github.com/geethasandesh/sangeeth",
                image: sangeethImg
            }
        ]
    }
];

const Projects = () => {
    return (
        <div className="py-20">
            {/* Section Header */}
            <div className="mb-16">
                <div className="inline-block px-4 py-1.5 mb-4 border border-white/60 rounded-full bg-white/5 backdrop-blur-sm text-sm font-medium text-gray-300">
                    Projects
                </div>
                <h2 className="text-4xl md:text-4xl font-semibold text-white tracking-tight">
                    Check out my featured projects
                </h2>
            </div>

            {/* Categories */}
            <div className="space-y-20">
                {projectCategories.map((category, catIndex) => (
                    <div key={catIndex}>
                        <h3 className="text-2xl font-bold text-gray-200 mb-8 border-l-4 border-blue-500 pl-4">
                            {category.title}
                        </h3>

                        <div className="grid grid-cols-1 gap-12">
                            {category.projects.map((project, index) => (
                                <div
                                    key={index}
                                    className="group relative grid grid-cols-1 md:grid-cols-2 bg-white/5 backdrop-blur-sm border border-white/60 rounded-3xl overflow-hidden hover:bg-white/10 transition-colors duration-300"
                                >
                                    {/* Image Side */}
                                    <div className="h-64 md:h-auto relative overflow-hidden flex items-center justify-center border-r border-white/10 bg-black/20 p-4 md:p-8 group-hover:bg-black/30 transition-colors">
                                        <div className="w-full h-auto aspect-video rounded-xl border border-white/20 overflow-hidden shadow-2xl relative group-hover:scale-105 transition-transform duration-500">
                                            <img
                                                src={project.image}
                                                alt={project.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>

                                    {/* Content Side */}
                                    <div className="p-8 md:p-12 flex flex-col justify-center">
                                        <div className="flex justify-between items-start mb-4">
                                            <h4 className="text-2xl font-bold text-white group-hover:text-blue-300 transition-colors">
                                                {project.title}
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
                                            {project.description}
                                        </p>

                                        <div className="flex flex-wrap gap-2 mt-auto">
                                            {project.tags.map(tag => (
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
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Projects;
