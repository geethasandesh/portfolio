import {
    SiPython, SiJavascript, SiHtml5, SiCss3, SiC,
    SiReact, SiTailwindcss,
    SiNodedotjs, SiExpress, SiFirebase, SiSupabase,
    SiGit, SiGithub, SiPostman, SiVercel, SiExpo,
    SiMongodb, SiFigma, SiTypescript, SiNextdotjs,
    SiDocker, SiPostgresql, SiRedux, SiGraphql, SiOpenai
} from 'react-icons/si';
import { FaJava, FaProjectDiagram, FaCode } from 'react-icons/fa';
import { VscCode } from 'react-icons/vsc';

const iconMap = {
    python: SiPython,
    java: FaJava,
    javascript: SiJavascript,
    js: SiJavascript,
    html: SiHtml5,
    css: SiCss3,
    c: SiC,
    react: SiReact,
    'react / native': SiReact,
    expo: SiExpo,
    nodejs: SiNodedotjs,
    'node.js': SiNodedotjs,
    express: SiExpress,
    'express.js': SiExpress,
    mongodb: SiMongodb,
    tailwind: SiTailwindcss,
    'tailwind css': SiTailwindcss,
    firebase: SiFirebase,
    supabase: SiSupabase,
    n8n: FaProjectDiagram,
    git: SiGit,
    github: SiGithub,
    vscode: VscCode,
    'vs code': VscCode,
    postman: SiPostman,
    figma: SiFigma,
    vercel: SiVercel,
    typescript: SiTypescript,
    nextjs: SiNextdotjs,
    'next.js': SiNextdotjs,
    docker: SiDocker,
    postgresql: SiPostgresql,
    postgres: SiPostgresql,
    redux: SiRedux,
    graphql: SiGraphql,
    openai: SiOpenai,
};

const colorMap = {
    python: 'text-blue-400',
    java: 'text-red-500',
    javascript: 'text-yellow-400',
    js: 'text-yellow-400',
    html: 'text-orange-500',
    css: 'text-blue-500',
    c: 'text-blue-300',
    react: 'text-cyan-400',
    expo: 'text-white',
    nodejs: 'text-green-500',
    'node.js': 'text-green-500',
    express: 'text-gray-400',
    mongodb: 'text-green-500',
    tailwind: 'text-cyan-300',
    firebase: 'text-yellow-500',
    supabase: 'text-emerald-400',
    n8n: 'text-red-500',
    git: 'text-red-500',
    github: 'text-white',
    vscode: 'text-blue-400',
    postman: 'text-orange-500',
    figma: 'text-purple-400',
    vercel: 'text-white',
};

function keyFor(skill) {
    return (skill.icon || skill.name || '').toLowerCase().trim();
}

export function getSkillIcon(skill) {
    const key = keyFor(skill);
    const Icon = iconMap[key] || FaCode;
    const color = colorMap[key] || 'text-gray-300';
    return <Icon className={color} />;
}
