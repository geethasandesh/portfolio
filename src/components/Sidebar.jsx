import React from 'react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { useContent } from '../context/ContentContext';
import { useLocalizedText } from '../lib/useLocalizedText';

const Sidebar = ({ className = '' }) => {
    const { t, tx } = useLocalizedText();
    const { content } = useContent();
    const { profile, hero } = content;

    return (
        <div className={`w-full lg:w-1/4 lg:h-full p-0 lg:p-4 z-20 flex items-center justify-center pointer-events-none max-w-full ${className}`}>
            <div className="w-full max-w-full h-auto lg:h-[85vh] flex flex-col justify-between items-center text-center p-4 sm:p-6 border border-white/60 bg-black/10 backdrop-blur-sm shadow-2xl rounded-2xl relative pointer-events-auto overflow-hidden">

                <div className="flex flex-col items-center w-full max-w-full">
                    <h2 className="text-xl sm:text-2xl font-bold mb-4 break-words">{profile.name}</h2>
                    <div className="relative w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 mb-4 rounded-2xl overflow-hidden border-2 border-white/60 shadow-2xl group mx-auto">
                        <img
                            src={profile.image}
                            alt={profile.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                    </div>
                </div>

                <div className="w-full max-w-full text-left space-y-4 px-1">
                    <div>
                        <p className="text-gray-400 text-sm mb-1">{t('sidebar.specialization')}:</p>
                        <p className="font-semibold text-white">{tx('hero.role1', hero.role1)}</p>
                        <p className="font-semibold text-white">{tx('hero.role2', hero.role2)}</p>
                    </div>
                    <div className="space-y-3">
                        <div>
                            <p className="text-gray-400 text-sm mb-1">{t('sidebar.basedIn')}:</p>
                            <p className="font-semibold text-white">{tx('sidebar.location', profile.location)}</p>
                        </div>
                        <div className="flex gap-3 text-gray-300">
                            {profile.instagram && (
                                <a href={profile.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition-colors"><FaInstagram size={20} /></a>
                            )}
                            {profile.linkedin && (
                                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors"><FaLinkedin size={20} /></a>
                            )}
                            {profile.github && (
                                <a href={profile.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><FaGithub size={20} /></a>
                            )}
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default Sidebar;
