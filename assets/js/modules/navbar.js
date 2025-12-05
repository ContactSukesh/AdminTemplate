/**
 * Navbar Module
 * Handles navbar dropdowns, search, and user interactions
 */

class Navbar {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.dropdowns = document.querySelectorAll('[data-dropdown]');
        this.searchInput = document.querySelector('.navbar-search-input');
        
        this.init();
    }

    init() {
        if (!this.navbar) return;

        // Initialize dropdowns
        this.initDropdowns();

        // Handle search
        if (this.searchInput) {
            this.initSearch();
        }

        // Handle keyboard shortcuts
        this.initKeyboardShortcuts();

        // Close dropdowns on outside click
        document.addEventListener('click', (e) => this.handleOutsideClick(e));
    }

    initDropdowns() {
        this.dropdowns.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.stopPropagation();
                const dropdownId = trigger.dataset.dropdown;
                const dropdown = document.getElementById(dropdownId);
                
                if (dropdown) {
                    this.toggleDropdown(dropdown);
                }
            });
        });
    }

    toggleDropdown(dropdown) {
        const isOpen = dropdown.classList.contains('show');
        
        // Close all dropdowns
        document.querySelectorAll('.navbar-dropdown').forEach(d => {
            d.classList.remove('show');
        });

        // Toggle current dropdown
        if (!isOpen) {
            dropdown.classList.add('show');
        }
    }

    closeAllDropdowns() {
        document.querySelectorAll('.navbar-dropdown').forEach(dropdown => {
            dropdown.classList.remove('show');
        });
    }

    handleOutsideClick(e) {
        if (!e.target.closest('[data-dropdown]') && !e.target.closest('.navbar-dropdown')) {
            this.closeAllDropdowns();
        }
    }

    initSearch() {
        this.searchInput.addEventListener('focus', () => {
            this.searchInput.parentElement.classList.add('focused');
        });

        this.searchInput.addEventListener('blur', () => {
            this.searchInput.parentElement.classList.remove('focused');
        });

        this.searchInput.addEventListener('input', (e) => {
            this.handleSearch(e.target.value);
        });
    }

    handleSearch(query) {
        if (query.length >= 2) {
            // Implement search logic here
            console.log('Searching for:', query);
        }
    }

    initKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + K for search
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                if (this.searchInput) {
                    this.searchInput.focus();
                }
            }

            // Escape to close dropdowns
            if (e.key === 'Escape') {
                this.closeAllDropdowns();
            }
        });
    }
}

// Initialize navbar
document.addEventListener('DOMContentLoaded', () => {
    window.navbar = new Navbar();
});

export default Navbar;
