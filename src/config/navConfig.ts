import type { pageName } from 'shared/types/types';

export type NavItem = {
    name: pageName;
    path: string;
};

export const navItems: NavItem[] = [
    { name: 'Products', path: '/' },
    { name: 'Categories', path: '/categories' },
    { name: 'About us', path: '/about' },
];
