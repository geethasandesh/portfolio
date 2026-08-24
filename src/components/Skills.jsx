import React from 'react';
import { useTranslation } from 'react-i18next';
import { useContent } from '../context/ContentContext';
import { getSkillIcon } from '../lib/skillIcons';

const Skills = () => {
    const { t } = useTranslation();
    const { content } = useContent();
    const { skills } = content;
    const items = skills.items || [];

    return (
        <div className="py-20" id="skills">
            <div className="mb-16">
                <div className="inline-block px-4 py-1.5 mb-4 border border-white/60 rounded-full bg-white/5 backdrop-blur-sm text-sm font-medium text-gray-300">
                    {skills.badge || t('skills.badge')}
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                    {skills.title || t('skills.title')}
                </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {items.map((skill, index) => (
                    <div
                        key={`${skill.name}-${index}`}
                        className="group flex flex-col items-center justify-center p-4 bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/10 hover:border-white/60 transition-all duration-300 hover:-translate-y-1"
                    >
                        <div className="text-3xl mb-2 transform group-hover:scale-110 transition-transform duration-300 filter drop-shadow-lg">
                            {getSkillIcon(skill)}
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
