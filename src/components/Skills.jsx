import React from 'react';
import {
    SiPython, SiJavascript, SiHtml5, SiCss3, SiC,
    SiReact, SiTailwindcss,
    SiNodedotjs, SiExpress, SiFirebase, SiSupabase,
    SiGit, SiGithub, SiPostman, SiVercel, SiExpo,
    SiMongodb, SiN8n, SiFigma
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import { VscCode } from 'react-icons/vsc';

const skills = [
    { name: "Python", icon: <SiPython className="text-blue-400" /> },
    { name: "Java", icon: <FaJava className="text-red-500" /> },
    { name: "JavaScript", icon: <SiJavascript className="text-yellow-400" /> },
    { name: "HTML", icon: <SiHtml5 className="text-orange-500" /> },
    { name: "CSS", icon: <SiCss3 className="text-blue-500" /> },
    { name: "C", icon: <SiC className="text-blue-300" /> },
    { name: "React / Native", icon: <SiReact className="text-cyan-400" /> },
    { name: "Expo Go", icon: <SiExpo className="text-white" /> },
    { name: "Node.js", icon: <SiNodedotjs className="text-green-500" /> },
    { name: "Express.js", icon: <SiExpress className="text-gray-400" /> },
    { name: "MongoDB", icon: <SiMongodb className="text-green-500" /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss className="text-cyan-300" /> },
    { name: "Firebase", icon: <SiFirebase className="text-yellow-500" /> },
    { name: "Supabase", icon: <SiSupabase className="text-emerald-400" /> },
    { name: "n8n", icon: <SiN8n className="text-red-500" /> },
    { name: "Git", icon: <SiGit className="text-red-500" /> },
    { name: "GitHub", icon: <SiGithub className="text-white" /> },
    { name: "VS Code", icon: <VscCode className="text-blue-400" /> },
    { name: "Postman", icon: <SiPostman className="text-orange-500" /> },
    { name: "Figma", icon: <SiFigma className="text-purple-400" /> },
    { name: "Vercel", icon: <SiVercel className="text-white" /> },
];

const Skills = () => {
    return (
        <div className="py-20" id="skills">
            {/* Section Header */}
            <div className="mb-16">
                <div className="inline-block px-4 py-1.5 mb-4 border border-white/60 rounded-full bg-white/5 backdrop-blur-sm text-sm font-medium text-gray-300">
                    Skills
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                    Technical Proficiency
                </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {skills.map((skill, index) => (
                    <div
                        key={index}
                        className="group flex flex-col items-center justify-center p-4 bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/10 hover:border-white/60 transition-all duration-300 hover:-translate-y-1"
                    >
                        <div className="text-3xl mb-2 transform group-hover:scale-110 transition-transform duration-300 filter drop-shadow-lg">
                            {skill.icon}
                        </div>
                        <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                            {skill.name}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Skills;
