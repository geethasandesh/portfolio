import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaLanguage } from 'react-icons/fa';

const Navbar = () => {
    const { t, i18n } = useTranslation();
    const [isLangOpen, setIsLangOpen] = useState(false);

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        setIsLangOpen(false);
    };

    const languages = [
        { code: 'en', label: 'English' },
        { code: 'hi', label: 'हिंदी' },
        { code: 'te', label: 'తెలుగు' },
        { code: 'fr', label: 'Français' },
        { code: 'de', label: 'Deutsch' },
        { code: 'es', label: 'Español' }
    ];

    return (
        <div className="sticky top-0 z-30 p-4 lg:p-8 pb-0 pointer-events-none">
            <div className="flex justify-center items-center max-w-4xl mx-auto relative pointer-events-auto">
                <ul className="flex flex-wrap justify-center items-center gap-4 text-sm font-medium text-gray-300">
                    {['home', 'projects', 'experience', 'skills', 'education', 'contact'].map((item) => (
                        <li key={item}>
                            <a href={`#${item === 'home' ? 'home' : item}`} className="px-5 py-2 border border-white/60 bg-black/20 backdrop-blur-md rounded-full hover:bg-white/10 hover:scale-105 hover:border-white/90 transition-all shadow-lg text-gray-200 block">
                                {t(`nav.${item}`)}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Language Switcher - Absolute positioned to the right of the menu */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:block">
                    <div className="relative">
                        <button
                            onClick={() => setIsLangOpen(!isLangOpen)}
                            className="p-3 rounded-full border border-white/60 bg-black/20 backdrop-blur-md hover:bg-white/10 transition-colors text-white"
                        >
                            <FaLanguage size={24} />
                        </button>

                        {isLangOpen && (
                            <div className="absolute right-0 mt-2 w-40 bg-gray-900 border border-white/20 rounded-xl shadow-xl overflow-hidden py-2 backdrop-blur-xl">
                                {languages.map((lang) => (
                                    <button
                                        key={lang.code}
                                        onClick={() => changeLanguage(lang.code)}
                                        className={`w-full text-left px-4 py-2 text-sm hover:bg-white/10 transition-colors ${i18n.language === lang.code ? 'text-blue-400 font-bold' : 'text-gray-300'}`}
                                    >
                                        {lang.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* Mobile Language Switcher (Visible on small screens) */}
            <div className="flex lg:hidden justify-center mt-4 pointer-events-auto">
                <div className="relative">
                    <button
                        onClick={() => setIsLangOpen(!isLangOpen)}
                        className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/60 bg-black/20 backdrop-blur-md text-white text-sm"
                    >
                        <FaLanguage size={20} />
                        <span>Language</span>
                    </button>
                    {isLangOpen && (
                        <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-40 bg-gray-900 border border-white/20 rounded-xl shadow-xl overflow-hidden py-2 backdrop-blur-xl z-50">
                            {languages.map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() => changeLanguage(lang.code)}
                                    className={`w-full text-left px-4 py-2 text-sm hover:bg-white/10 transition-colors ${i18n.language === lang.code ? 'text-blue-400 font-bold' : 'text-gray-300'}`}
                                >
                                    {lang.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div >
    );
};

export default Navbar;
