/**
 * Theme Module
 * Handles theme switching between light, dark, and semi-dark modes
 */

class Theme {
    constructor() {
        this.currentTheme = this.getStoredTheme() || 'light';
        this.themeToggles = document.querySelectorAll('[data-theme-toggle]');
        
        this.init();
    }

    init() {
        // Apply stored theme
        this.applyTheme(this.currentTheme);

        // Initialize theme toggles
        this.themeToggles.forEach(toggle => {
            toggle.addEventListener('click', () => {
                const theme = toggle.dataset.themeToggle;
                this.setTheme(theme);
            });
        });

        // Update active state
        this.updateActiveState();
    }

    getStoredTheme() {
        return localStorage.getItem('theme');
    }

    setTheme(theme) {
        this.currentTheme = theme;
        this.applyTheme(theme);
        localStorage.setItem('theme', theme);
        this.updateActiveState();

        // Dispatch custom event
        document.dispatchEvent(new CustomEvent('themechange', {
            detail: { theme }
        }));
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        
        // Update meta theme-color
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            const colors = {
                light: '#ffffff',
                dark: '#2b2c40',
                'semi-dark': '#2b2c40'
            };
            metaThemeColor.setAttribute('content', colors[theme] || colors.light);
        }
    }

    toggleTheme() {
        const themes = ['light', 'dark', 'semi-dark'];
        const currentIndex = themes.indexOf(this.currentTheme);
        const nextIndex = (currentIndex + 1) % themes.length;
        this.setTheme(themes[nextIndex]);
    }

    updateActiveState() {
        this.themeToggles.forEach(toggle => {
            const theme = toggle.dataset.themeToggle;
            if (theme === this.currentTheme) {
                toggle.classList.add('active');
            } else {
                toggle.classList.remove('active');
            }
        });
    }

    getCurrentTheme() {
        return this.currentTheme;
    }

    isDark() {
        return this.currentTheme === 'dark' || this.currentTheme === 'semi-dark';
    }
}

// Initialize theme
document.addEventListener('DOMContentLoaded', () => {
    window.theme = new Theme();
});

export default Theme;
