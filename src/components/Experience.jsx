import React from 'react';
import { FaCalendarAlt, FaExternalLinkAlt } from 'react-icons/fa';
import { useContent } from '../context/ContentContext';
import { useLocalizedText } from '../lib/useLocalizedText';

const Experience = () => {
    const { t, tx, txList } = useLocalizedText();
    const { content } = useContent();
    const { experience } = content;
    const items = experience.items || [];

    return (
        <div className="py-20" id="experience">
            <div className="mb-16">
                <div className="inline-block px-4 py-1.5 mb-4 border border-white/60 rounded-full bg-white/5 backdrop-blur-sm text-sm font-medium text-gray-300">
                    {tx('experience.badge', experience.badge)}
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                    {tx('experience.title', experience.title)}
                </h2>
            </div>

            <div className="space-y-12">
                {items.map((exp) => {
                    const role = tx(`experience.items.${exp.id}.role`, exp.role);
                    const company = tx(`experience.items.${exp.id}.company`, exp.company);
                    const period = tx(`experience.items.${exp.id}.period`, exp.period);
                    const summary = tx(`experience.items.${exp.id}.summary`, exp.summary);
                    const achievements = txList(`experience.items.${exp.id}.achievements`, exp.achievements || []);

                    return (
                    <div key={exp.id} className="group relative bg-white/5 backdrop-blur-sm border-2 border-white/60 rounded-3xl p-6 md:p-10 hover:bg-white/10 transition-colors duration-300">

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                            <div className="lg:col-span-4 flex flex-col items-start border-b lg:border-b-0 lg:border-r border-white/20 pb-8 lg:pb-0 lg:pr-8">

                                <h3 className="text-2xl font-bold text-white mb-2">{role}</h3>
                                <p className="text-blue-400 text-lg font-medium mb-4">{company}</p>

                                <div className="flex items-center gap-2 text-gray-400 text-sm mt-auto bg-white/5 px-4 py-2 rounded-lg border border-white/10">
                                    <FaCalendarAlt />
                                    <span>{period}</span>
                                </div>
                            </div>

                            <div className="lg:col-span-8 space-y-8">
                                <div className="relative pl-6 border-l-2 border-blue-500">
                                    <p className="text-gray-300 text-lg leading-relaxed italic">
                                        "{summary}"
                                    </p>
                                </div>

                                <div className="bg-black/20 rounded-2xl p-6 border border-white/20">
                                    <div className="flex items-center gap-2 mb-4 text-white font-semibold uppercase tracking-wider text-sm">
                                        {t('experience.keyAchievements')}
                                    </div>
                                    <ul className="space-y-3">
                                        {achievements.map((item, idx) => (
                                            <li key={idx} className="flex items-start gap-3 text-gray-300 text-sm md:text-base leading-relaxed">
                                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="flex flex-col md:flex-row justify-between items-end gap-6 pt-4">
                                    <div className="flex gap-4 w-full md:w-auto overflow-x-auto pb-4 md:pb-0 no-scrollbar">
                                        {(exp.images || []).filter(Boolean).map((img, i) => (
                                            <div key={i} className="w-32 h-24 md:w-40 md:h-28 flex-shrink-0 rounded-xl border border-white/20 overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300">
                                                <img
                                                    src={img}
                                                    alt={`${company} highlight ${i + 1}`}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        ))}
                                    </div>

                                    {exp.link && (
                                        <a href={exp.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white font-medium hover:text-blue-300 transition-colors group/link whitespace-nowrap">
                                            {t('experience.visitCompany')}
                                            <FaExternalLinkAlt className="text-sm group-hover/link:translate-x-1 transition-transform" />
                                        </a>
                                    )}
                                </div>

                            </div>
                        </div>
                    </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Experience;
