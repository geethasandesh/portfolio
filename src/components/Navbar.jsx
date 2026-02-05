import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaLanguage } from 'react-icons/fa';

const Navbar = () => {
    const { t, i18n } = useTranslation();
    const [isLangOpen, setIsLangOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const lastScrollY = React.useRef(0);

    React.useEffect(() => {
        const handleScroll = () => {
            const container = document.getElementById('scroll-container');
            const isDesktop = window.innerWidth >= 1024;
            const currentY = isDesktop ? (container?.scrollTop || 0) : window.scrollY;

            // Hide on scroll down, show on scroll up. Buffer of 50px before hiding.
            if (currentY > lastScrollY.current && currentY > 50) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
            lastScrollY.current = currentY;
        };

        window.addEventListener('scroll', handleScroll);
        const container = document.getElementById('scroll-container');
        if (container) container.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (container) container.removeEventListener('scroll', handleScroll);
        };
    }, []);

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
        <div className={`sticky top-0 z-30 p-2 lg:p-8 pb-0 pointer-events-none transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
            <div className="flex justify-between lg:justify-center items-center max-w-4xl mx-auto relative pointer-events-auto">
                <ul className="flex overflow-x-auto lg:overflow-visible no-scrollbar pb-2 lg:pb-0 w-full lg:w-auto gap-3 lg:gap-4 md:justify-center text-sm font-medium text-gray-300 px-1 snap-x">
                    {['home', 'projects', 'experience', 'skills', 'education', 'contact'].map((item) => (
                        <li key={item} className="snap-center shrink-0">
                            <a href={`#${item === 'home' ? 'home' : item}`} className="px-4 py-2 border border-white/60 bg-black/20 backdrop-blur-md rounded-full hover:bg-white/10 hover:scale-105 hover:border-white/90 transition-all shadow-lg text-gray-200 block whitespace-nowrap">
                                {t(`nav.${item}`)}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Language Switcher - Absolute positioned to the right of the menu */}
                <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2">
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
            <div className="flex lg:hidden justify-end pr-2 -mt-10 lg:mt-4 pointer-events-auto absolute right-0 top-6">
                {/* Actually, putting absolute toggle might overlay scroll. Let's keep it separate or integrating it is better.
                    Given the horizontal scroll menu, maybe put language button at the end of the scroll list?
                    Or keep it below? The user code had it below. Let's keep it simple for now, but ensure it doesn't overlap excessively.
                 */}
            </div>
            <div className="flex lg:hidden justify-center mt-2 pointer-events-auto pb-2">
                <div className="relative">
                    <button
                        onClick={() => setIsLangOpen(!isLangOpen)}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/60 bg-black/20 backdrop-blur-md text-white text-xs"
                    >
                        <FaLanguage size={16} />
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
