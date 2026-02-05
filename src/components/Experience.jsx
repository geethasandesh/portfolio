import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaCalendarAlt, FaExternalLinkAlt } from 'react-icons/fa';

import artihcus1 from '../assets/company_experience/artihcus11.jpg';
import artihcus2 from '../assets/company_experience/artihcus2.jpg';
import artihcus3 from '../assets/company_experience/artihcus3.jpg';
import artihcusIntern1 from '../assets/company_experience/artihcusintern1.jpg';
import artihcusIntern2 from '../assets/company_experience/artihcusintern2.jpg';
import grahmindImg from '../assets/company_experience/grahmind.png';

const experienceIds = [
    {
        id: "assoc_dev",
        link: "https://artihcus.com/",
        images: [artihcus1, artihcus2, artihcus3]
    },
    {
        id: "intern",
        link: "https://artihcus.com/",
        images: [artihcusIntern1, artihcusIntern2]
    },
    {
        id: "cofounder",
        link: "https://grahmind.com",
        images: [grahmindImg]
    }
];

const Experience = () => {
    const { t } = useTranslation();

    return (
        <div className="py-20" id="experience">
            {/* Section Header */}
            <div className="mb-16">
                <div className="inline-block px-4 py-1.5 mb-4 border border-white/60 rounded-full bg-white/5 backdrop-blur-sm text-sm font-medium text-gray-300">
                    {t('experience.badge')}
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                    {t('experience.title')}
                </h2>
            </div>

            <div className="space-y-12">
                {experienceIds.map((exp, index) => (
                    <div key={index} className="group relative bg-white/5 backdrop-blur-sm border-2 border-white/60 rounded-3xl p-6 md:p-10 hover:bg-white/10 transition-colors duration-300">

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                            {/* Left Column: Role Info (4 cols) */}
                            <div className="lg:col-span-4 flex flex-col items-start border-b lg:border-b-0 lg:border-r border-white/20 pb-8 lg:pb-0 lg:pr-8">

                                <h3 className="text-2xl font-bold text-white mb-2">{t(`experience.items.${exp.id}.role`)}</h3>
                                <p className="text-blue-400 text-lg font-medium mb-4">{t(`experience.items.${exp.id}.company`)}</p>

                                <div className="flex items-center gap-2 text-gray-400 text-sm mt-auto bg-white/5 px-4 py-2 rounded-lg border border-white/10">
                                    <FaCalendarAlt />
                                    <span>{t(`experience.items.${exp.id}.period`)}</span>
                                </div>
                            </div>

                            {/* Right Column: Content (8 cols) */}
                            <div className="lg:col-span-8 space-y-8">

                                {/* Summary Section */}
                                <div className="relative pl-6 border-l-2 border-blue-500">
                                    <p className="text-gray-300 text-lg leading-relaxed italic">
                                        "{t(`experience.items.${exp.id}.summary`)}"
                                    </p>
                                </div>

                                {/* Achievements Box */}
                                <div className="bg-black/20 rounded-2xl p-6 border border-white/20">
                                    <div className="flex items-center gap-2 mb-4 text-white font-semibold uppercase tracking-wider text-sm">
                                        {t('experience.keyAchievements')}
                                    </div>
                                    <ul className="space-y-3">
                                        {(t(`experience.items.${exp.id}.achievements`, { returnObjects: true }) || []).map((item, idx) => (
                                            <li key={idx} className="flex items-start gap-3 text-gray-300 text-sm md:text-base leading-relaxed">
                                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Bottom Row: Images & Link */}
                                <div className="flex flex-col md:flex-row justify-between items-end gap-6 pt-4">
                                    {/* Image Placeholders */}
                                    <div className="flex gap-4 w-full md:w-auto overflow-x-auto pb-4 md:pb-0 no-scrollbar">
                                        {exp.images.map((img, i) => (
                                            <div key={i} className="w-32 h-24 md:w-40 md:h-28 flex-shrink-0 rounded-xl border border-white/20 overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300">
                                                <img
                                                    src={img}
                                                    alt={`${t(`experience.items.${exp.id}.company`)} highlight ${i + 1}`}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        ))}
                                    </div>

                                    {/* Link */}
                                    <a href={exp.link} className="flex items-center gap-2 text-white font-medium hover:text-blue-300 transition-colors group/link whitespace-nowrap">
                                        {t('experience.visitCompany')}
                                        <FaExternalLinkAlt className="text-sm group-hover/link:translate-x-1 transition-transform" />
                                    </a>
                                </div>

                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Experience;
