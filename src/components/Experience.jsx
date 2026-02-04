import React from 'react';

const experiences = [
    {
        role: "Associate Software Developer",
        company: "Artihcus Global Private Limited",
        period: "June 2025 - Present",
        description: [
            "Promoted to full-time Software Engineer following successful completion of internship.",
            "Developed 'Artifact', a scalable internal documentation tool using React and Node.js with Firebase integration.",
            "Collaborated with design and backend teams to implement scalable systems.",
            "Integrated machine learning modules for internal tools.",
            "Developing packaging application for space optimization."
        ]
    },
    {
        role: "Intern",
        company: "Artihcus Global",
        period: "Oct 2024 - June 2025",
        description: [
            "Revamped company's official website using React and Firebase.",
            "Integrated Warehouse Management with AI.",
            "Learnt SAP Basics.",
            "Represented Artihcus AI Solutions at Expos."
        ]
    }
];

const Experience = () => {
    return (
        <div className="py-20" id="experience">
            <h2 className="text-3xl font-bold mb-10 text-center">Experience</h2>
            <div className="relative border-l border-gray-700 ml-4 md:ml-10 space-y-12">
                {experiences.map((exp, index) => (
                    <div key={index} className="mb-10 ml-6 group">
                        <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-900 rounded-full -left-3 ring-8 ring-gray-900 group-hover:bg-blue-600 transition-colors">
                            <svg className="w-3 h-3 text-blue-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path>
                            </svg>
                        </span>
                        <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 transition-colors shadow-lg">
                            <h3 className="flex flex-col md:flex-row md:items-center mb-1 text-lg font-semibold text-white">
                                {exp.role}
                                <span className="hidden md:inline mx-2 text-gray-500">-</span>
                                <span className="text-blue-400 text-sm md:text-lg">{exp.company}</span>
                            </h3>
                            <time className="block mb-4 text-sm font-normal leading-none text-gray-500">{exp.period}</time>
                            <ul className="list-disc list-inside text-gray-400 space-y-1">
                                {exp.description.map((item, idx) => (
                                    <li key={idx} className="leading-relaxed">{item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Experience;
