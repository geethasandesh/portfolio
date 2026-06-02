import React from 'react';
import { useTranslation } from 'react-i18next';
import profileImg from '../assets/1739438380694.jpg';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

// Using the user-provided image
const PROFILE_IMAGE = profileImg;

const Sidebar = ({ className = '' }) => {
    const { t } = useTranslation();

    return (
        <div className={`w-full lg:w-1/4 lg:h-full p-0 lg:p-4 z-20 flex items-center justify-center pointer-events-none max-w-full ${className}`}>
            <div className="w-full max-w-full h-auto lg:h-[85vh] flex flex-col justify-between items-center text-center p-4 sm:p-6 border border-white/60 bg-black/10 backdrop-blur-sm shadow-2xl rounded-2xl relative pointer-events-auto overflow-hidden">

                {/* Profile Header */}
                <div className="flex flex-col items-center w-full max-w-full">
                    <h2 className="text-xl sm:text-2xl font-bold mb-4 break-words">Geetha Sandesh</h2>
                    <div className="relative w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 mb-4 rounded-2xl overflow-hidden border-2 border-white/60 shadow-2xl group mx-auto">
                        <img
                            src={PROFILE_IMAGE}
                            alt="Profile"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                    </div>
                </div>

                {/* Profile Info */}
                <div className="w-full max-w-full text-left space-y-4 px-1">
                    <div>
                        <p className="text-gray-400 text-sm mb-1">{t('sidebar.specialization')}:</p>
                        <p className="font-semibold text-white">{t('hero.role1')}</p>
                        <p className="font-semibold text-white">{t('hero.role2')}</p>
                    </div>
                    <div className="space-y-3">
                        <div>
                            <p className="text-gray-400 text-sm mb-1">{t('sidebar.basedIn')}:</p>
                            <p className="font-semibold text-white">Hyderabad, Telangana</p>
                        </div>
                        {/* Icons added to Based In section as requested */}
                        <div className="flex gap-3 text-gray-300">
                            <a href="https://www.instagram.com/zeroograavity?igsh=MWl4dmE5dXB0cTM5dg%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition-colors"><FaInstagram size={20} /></a>
                            <a href="https://www.linkedin.com/in/geetha-sandesh-nomula-591186259/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors"><FaLinkedin size={20} /></a>
                            <a href="https://github.com/geethasandesh" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><FaGithub size={20} /></a>
                        </div>
                    </div>
                </div>

                {/* Contact section was removed as per request */}
            </div>

        </div>
    );
};

export default Sidebar;
