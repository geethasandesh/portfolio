import { useTranslation } from 'react-i18next';

export function useLocalizedText() {
    const { t, i18n } = useTranslation();
    const isEnglish = (i18n.resolvedLanguage || i18n.language || 'en').toLowerCase().startsWith('en');

    const tx = (key, fallback = '') => {
        if (isEnglish && fallback) return fallback;
        return t(key, { defaultValue: fallback || undefined });
    };

    const txList = (key, fallback = []) => {
        if (isEnglish && fallback.length) return fallback;
        const value = t(key, { returnObjects: true, defaultValue: fallback });
        return Array.isArray(value) ? value : fallback;
    };

    return { t, tx, txList, i18n };
}
