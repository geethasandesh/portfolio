import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import GradientText from './GradientText';
import { useContent } from '../context/ContentContext';

const HeroSection = () => {
    const { t } = useTranslation();
    const { content } = useContent();
    const { profile, hero } = content;
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseMove = (e) => {
        setCursorPos({ x: e.clientX, y: e.clientY });
    };

    return (
        <div id="home" className="min-h-[90vh] flex flex-col justify-center px-4 md:px-12 max-w-full overflow-x-hidden">

            <div className="mb-8 animate-fade-in-up">
                <a
                    href={hero.badgeLink || profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-sm md:text-base font-medium text-gray-200 hover:bg-white/10 transition-colors"
                >
                    {hero.badge || t('hero.badge')} <span className="animate-wave">👋</span>
                </a>
            </div>

            <div
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                onMouseMove={handleMouseMove}
                className={`transition-all duration-300 ${isHovering ? 'cursor-none' : ''}`}
            >
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 tracking-tight animate-fade-in-up delay-100 break-words">
                    {t('hero.im')}{' '}
                    <GradientText
                        colors={["#ef4444", "#f97316", "#eab308", "#ef4444"]}
                        animationSpeed={3}
                        showBorder={false}
                        className="inline-block"
                    >
                        {profile.name}
                    </GradientText>
                </h1>

                <div className="text-2xl sm:text-3xl md:text-5xl font-medium text-gray-300 space-y-2 mb-8 animate-fade-in-up delay-200">
                    <p>{hero.role1}</p>
                    <p>{hero.role2}</p>
                </div>

                <p className="text-gray-400 max-w-2xl mb-12 text-lg leading-relaxed animate-fade-in-up delay-200">
                    {hero.description}
                </p>
            </div>

            {isHovering && (
                <div
                    style={{
                        left: `${cursorPos.x}px`,
                        top: `${cursorPos.y}px`,
                        transform: 'translate(-50%, -50%)'
                    }}
                    className="fixed pointer-events-none z-50 text-4xl animate-cursor-wave"
                >
                    👋
                </div>
            )}

            <div className="flex flex-wrap gap-6 animate-fade-in-up delay-300">
                <a href="#contact" className="flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 transition-colors group">
                    <span className="font-medium">{t('hero.contactBtn')}</span>
                </a>

                <a
                    href={profile.resume}
                    download="Geetha_Sandesh_Resume.pdf"
                    className="flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 transition-colors group cursor-pointer"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 group-hover:translate-y-1 transition-transform">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                    <span className="font-medium">{t('hero.downloadBtn')}</span>
                </a>
            </div>

        </div>
    );
};

export default HeroSection;
