
import type { Theme, ThemeColors } from './types';

// Icons using Lucide React (or similar library, here just using SVG paths for simplicity)
export const icons = {
  tutor: (props: any) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22h6a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h2"/><path d="M12 18h.01"/><path d="M18 14h-5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h5Z"/><path d="M12 6V4"/><path d="M12 22v-2"/><path d="M12 12V8"/><path d="m15 12-2-4"/></svg>
  ),
  mindmap: (props: any) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v1a2 2 0 0 1-2 2H8a2 2 0 0 0-2 2v1"/><path d="M12 3h1a2 2 0 0 1 2 2v1"/><path d="M12 3v1a2 2 0 0 0 2 2h2a2 2 0 0 1 2 2v3a2 2 0 0 0 2 2h1"/><path d="M12 21v-1a2 2 0 0 1 2-2h2a2 2 0 0 0 2-2v-1"/><path d="M12 21h-1a2 2 0 0 1-2-2v-1"/><path d="M12 21v-1a2 2 0 0 0-2-2H8a2 2 0 0 1-2-2v-3a2 2 0 0 0-2-2H2"/><circle cx="12" cy="12" r="2"/></svg>
  ),
  whiteboard: (props: any) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="12" x="3" y="6" rx="2"/><path d="M7 12h10"/><path d="M12 18v-6"/><path d="M12 6V4"/><path d="M16 4h-8"/></svg>
  ),
  tools: (props: any) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2l.15-.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
  ),
  send: (props: any) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
  ),
  upload: (props: any) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
  ),
  table: (props: any) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3H20V21H4V3H12Z"/><path d="M4 9H20"/><path d="M12 3V21"/></svg>
  ),
  tasks: (props: any) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/><path d="m9 14 2 2 4-4"/></svg>
  ),
};

export const THEMES: Record<Theme, ThemeColors> = {
    deep_ocean: {
        primary: 'bg-slate-800',
        secondary: 'bg-slate-900',
        background: 'bg-slate-950',
        card: 'bg-slate-900',
        text: 'text-slate-100',
        textSecondary: 'text-slate-400',
        border: 'border-slate-700',
        accent: 'bg-cyan-500',
    },
    cool_mint: {
        primary: 'bg-emerald-600',
        secondary: 'bg-emerald-700',
        background: 'bg-gray-100',
        card: 'bg-white',
        text: 'text-gray-800',
        textSecondary: 'text-gray-500',
        border: 'border-gray-200',
        accent: 'bg-emerald-500',
    },
    sunset_glow: {
        primary: 'bg-orange-500',
        secondary: 'bg-red-800',
        background: 'bg-gray-900',
        card: 'bg-gray-800',
        text: 'text-orange-100',
        textSecondary: 'text-orange-300',
        border: 'border-orange-900',
        accent: 'bg-yellow-400',
    },
    ivory_gold: {
        primary: 'bg-amber-400',
        secondary: 'bg-stone-200',
        background: 'bg-stone-50',
        card: 'bg-white',
        text: 'text-stone-800',
        textSecondary: 'text-stone-500',
        border: 'border-stone-200',
        accent: 'bg-amber-500',
    },
    royal_purple: {
        primary: 'bg-purple-700',
        secondary: 'bg-purple-900',
        background: 'bg-gray-900',
        card: 'bg-gray-800',
        text: 'text-purple-100',
        textSecondary: 'text-purple-300',
        border: 'border-purple-700',
        accent: 'bg-fuchsia-500',
    },
    white: {
        primary: 'bg-blue-600',
        secondary: 'bg-gray-200',
        background: 'bg-gray-100',
        card: 'bg-white',
        text: 'text-gray-800',
        textSecondary: 'text-gray-500',
        border: 'border-gray-300',
        accent: 'bg-blue-500',
    },
    sky_blue: {
        primary: 'bg-sky-500',
        secondary: 'bg-sky-600',
        background: 'bg-sky-50',
        card: 'bg-white',
        text: 'text-sky-900',
        textSecondary: 'text-sky-600',
        border: 'border-sky-200',
        accent: 'bg-amber-400',
    },
    light_green: {
        primary: 'bg-green-600',
        secondary: 'bg-green-100',
        background: 'bg-green-50',
        card: 'bg-white',
        text: 'text-green-900',
        textSecondary: 'text-green-700',
        border: 'border-green-200',
        accent: 'bg-lime-500',
    },
    pastel_purple: {
        primary: 'bg-violet-500',
        secondary: 'bg-violet-200',
        background: 'bg-rose-50',
        card: 'bg-white',
        text: 'text-violet-900',
        textSecondary: 'text-violet-600',
        border: 'border-violet-200',
        accent: 'bg-pink-500',
    },
};