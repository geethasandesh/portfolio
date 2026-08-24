import React, { createContext, useContext, useEffect, useState } from 'react';

const emptyContent = {
    profile: { name: '', image: '', location: '', linkedin: '', github: '', instagram: '', resume: '' },
    hero: { badge: '', badgeLink: '', role1: '', role2: '', description: '' },
    projects: { badge: '', title: '', categories: [] },
    experience: { badge: '', title: '', items: [] },
    skills: { badge: '', title: '', items: [] },
    education: { title: '', items: [] },
};

const ContentContext = createContext({
    content: emptyContent,
    loading: true,
    refresh: () => {},
});

export function ContentProvider({ children }) {
    const [content, setContent] = useState(emptyContent);
    const [loading, setLoading] = useState(true);

    const load = async () => {
        try {
            const res = await fetch('/api/content', { cache: 'no-store' });
            if (res.ok) {
                setContent(await res.json());
                return;
            }
        } catch {
            // Fall through to static JSON.
        }
        try {
            const res = await fetch('/content.json', { cache: 'no-store' });
            if (res.ok) setContent(await res.json());
        } catch {
            setContent(emptyContent);
        }
    };

    useEffect(() => {
        load().finally(() => setLoading(false));
    }, []);

    return (
        <ContentContext.Provider value={{ content, loading, refresh: load }}>
            {children}
        </ContentContext.Provider>
    );
}

export function useContent() {
    return useContext(ContentContext);
}
