import React from 'react';

const skillCategories = [
    {
        title: "Languages",
        skills: ["Python", "JavaScript", "SQL"]
    },
    {
        title: "Frontend",
        skills: ["ReactJS", "React Native", "Expo", "Tailwind CSS", "UI/UX", "Figma"]
    },
    {
        title: "Backend & Database",
        skills: ["Node.js", "MySQL", "Firebase"]
    },
    {
        title: "Tools & AI",
        skills: ["Git", "GitHub", "N8N Automation", "TensorFlow", "PyTorch", "Scikit-learn", "OpenCV"]
    }
];

const Skills = () => {
    return (
        <div className="py-20" id="skills">
            <h2 className="text-3xl font-bold mb-10 text-center">Technical Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {skillCategories.map((category, index) => (
                    <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                        <h3 className="text-xl font-bold mb-4 text-blue-300">{category.title}</h3>
                        <div className="flex flex-wrap gap-2">
                            {category.skills.map((skill, idx) => (
                                <span key={idx} className="px-3 py-1 bg-white/10 rounded-full text-sm text-gray-200 border border-white/5">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Skills;
