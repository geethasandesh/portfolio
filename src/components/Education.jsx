import React from 'react';
import { useContent } from '../context/ContentContext';

const Education = () => {
    const { content } = useContent();
    const { education } = content;
    const items = education.items || [];

    return (
        <div className="py-20" id="education">
            <h2 className="text-3xl font-bold mb-10 text-center">{education.title || 'Education'}</h2>
            <div className="max-w-3xl mx-auto space-y-8">
                {items.map((edu) => (
                    <div key={edu.id} className="bg-white/5 backdrop-blur-sm border border-white/60 rounded-xl p-6 hover:bg-white/10 transition-colors flex flex-col md:flex-row justify-between items-start md:items-center">
                        <div>
                            <h3 className="text-xl font-bold text-white mb-2">{edu.degree}</h3>
                            <p className="text-blue-300 font-medium mb-1">{edu.institution}</p>
                            <p className="text-gray-400 text-sm">{edu.location}</p>
                        </div>
                        <div className="mt-4 md:mt-0 md:text-right">
                            <span className="block text-white font-semibold mb-1">{edu.score}</span>
                            <span className="text-sm text-gray-500">{edu.period}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Education;
