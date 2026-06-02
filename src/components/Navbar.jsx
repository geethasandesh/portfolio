import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaLanguage, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
    const { t, i18n } = useTranslation();
    const [isLangOpen, setIsLangOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const lastScrollY = React.useRef(0);

    const navItems = ['home', 'projects', 'experience', 'skills', 'education', 'contact'];

    React.useEffect(() => {
        const handleScroll = () => {
            const container = document.getElementById('scroll-container');
            const isDesktop = window.innerWidth >= 1024;
            const currentY = isDesktop ? (container?.scrollTop || 0) : window.scrollY;

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

    React.useEffect(() => {
        document.body.style.overflow = isMenuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isMenuOpen]);

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        setIsLangOpen(false);
    };

    const handleNavClick = () => {
        setIsMenuOpen(false);
    };

    const languages = [
        { code: 'en', label: 'English' },
        { code: 'hi', label: 'हिंदी' },
        { code: 'te', label: 'తెలుగు' },
        { code: 'fr', label: 'Français' },
        { code: 'de', label: 'Deutsch' },
        { code: 'es', label: 'Español' }
    ];

    const LanguageDropdown = ({ align = 'right', compact = false }) => (
        <div className="relative">
            <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className={`flex items-center gap-2 rounded-full border border-white/60 bg-black/20 backdrop-blur-md hover:bg-white/10 transition-colors text-white ${compact ? 'p-3' : 'px-4 py-2 text-sm'}`}
            >
                <FaLanguage size={compact ? 24 : 18} />
                {!compact && <span>Language</span>}
            </button>
            {isLangOpen && (
                <div className={`absolute ${align === 'center' ? 'left-1/2 -translate-x-1/2' : 'right-0'} mt-2 w-40 bg-gray-900 border border-white/20 rounded-xl shadow-xl overflow-hidden py-2 backdrop-blur-xl z-50`}>
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
    );

    return (
        <div className={`sticky top-0 z-30 p-3 lg:p-8 pb-0 pointer-events-none transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
            {/* Desktop nav */}
            <div className="hidden lg:flex justify-center items-center max-w-4xl mx-auto relative pointer-events-auto">
                <ul className="flex gap-4 text-sm font-medium text-gray-300">
                    {navItems.map((item) => (
                        <li key={item}>
                            <a href={`#${item === 'home' ? 'home' : item}`} className="px-4 py-2 border border-white/60 bg-black/20 backdrop-blur-md rounded-full hover:bg-white/10 hover:scale-105 hover:border-white/90 transition-all shadow-lg text-gray-200 block whitespace-nowrap">
                                {t(`nav.${item}`)}
                            </a>
                        </li>
                    ))}
                </ul>

                <div className="absolute right-0 top-1/2 -translate-y-1/2">
                    <LanguageDropdown compact />
                </div>
            </div>

            {/* Mobile nav */}
            <div className="lg:hidden flex justify-between items-center pointer-events-auto max-w-full">
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="p-3 rounded-full border border-white/60 bg-black/20 backdrop-blur-md hover:bg-white/10 transition-colors text-white"
                    aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                >
                    {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                </button>
                <LanguageDropdown align="center" />
            </div>

            {/* Mobile menu overlay */}
            {isMenuOpen && (
                <div className="lg:hidden fixed inset-0 z-40 pointer-events-auto">
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={() => setIsMenuOpen(false)}
                    />
                    <nav className="absolute top-16 left-3 right-3 bg-gray-900/95 border border-white/20 rounded-2xl shadow-2xl backdrop-blur-xl p-4 max-h-[calc(100vh-5rem)] overflow-y-auto">
                        <ul className="flex flex-col gap-2">
                            {navItems.map((item) => (
                                <li key={item}>
                                    <a
                                        href={`#${item === 'home' ? 'home' : item}`}
                                        onClick={handleNavClick}
                                        className="block px-4 py-3 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 transition-colors text-gray-200 font-medium text-center"
                                    >
                                        {t(`nav.${item}`)}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            )}
        </div>
    );
};

export default Navbar;
