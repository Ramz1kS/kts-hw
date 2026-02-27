import { action, makeObservable, observable } from 'mobx';
import type { pageName } from 'shared/types/types';

class NavigationStore {
    currentPage: pageName = 'Products';
    isMenuOpen = false;

    constructor() {
        makeObservable(this, {
            currentPage: observable,
            isMenuOpen: observable,
            setCurrentPage: action.bound,
            toggleMenu: action.bound,
            closeMenu: action.bound,
        });
    }

    setCurrentPage(page: pageName) {
        this.currentPage = page;
    }

    toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
    }

    closeMenu() {
        this.isMenuOpen = false;
    }
}

export const navigationStore = new NavigationStore();
