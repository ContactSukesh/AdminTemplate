/**
 * Sidebar Module
 * Handles sidebar interactions, menu navigation, and responsive behavior
 */

class Sidebar {
    constructor() {
        this.sidebar = document.querySelector('.sidebar');
        this.sidebarToggle = document.querySelector('.navbar-toggle');
        this.sidebarOverlay = document.querySelector('.sidebar-overlay');
        this.menuItems = document.querySelectorAll('.menu-item.has-submenu');
        
        this.init();
    }

    init() {
        if (!this.sidebar) return;

        // Toggle sidebar
        if (this.sidebarToggle) {
            this.sidebarToggle.addEventListener('click', () => this.toggle());
        }

        // Close sidebar on overlay click
        if (this.sidebarOverlay) {
            this.sidebarOverlay.addEventListener('click', () => this.close());
        }

        // Handle submenu toggles
        this.menuItems.forEach(item => {
            const link = item.querySelector('.menu-link');
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleSubmenu(item);
            });
        });

        // Close sidebar on mobile when clicking menu links
        this.handleMobileNavigation();

        // Handle window resize
        window.addEventListener('resize', () => this.handleResize());
    }

    toggle() {
        this.sidebar.classList.toggle('show');
        if (this.sidebarOverlay) {
            this.sidebarOverlay.classList.toggle('show');
        }
    }

    close() {
        this.sidebar.classList.remove('show');
        if (this.sidebarOverlay) {
            this.sidebarOverlay.classList.remove('show');
        }
    }

    open() {
        this.sidebar.classList.add('show');
        if (this.sidebarOverlay) {
            this.sidebarOverlay.classList.add('show');
        }
    }

    toggleSubmenu(item) {
        const isOpen = item.classList.contains('open');
        
        // Close all other submenus
        this.menuItems.forEach(menuItem => {
            if (menuItem !== item) {
                menuItem.classList.remove('open');
            }
        });

        // Toggle current submenu
        if (isOpen) {
            item.classList.remove('open');
        } else {
            item.classList.add('open');
        }
    }

    handleMobileNavigation() {
        const menuLinks = document.querySelectorAll('.menu-link:not(.has-submenu .menu-link), .submenu-link');
        
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth < 992) {
                    this.close();
                }
            });
        });
    }

    handleResize() {
        if (window.innerWidth >= 992) {
            this.close();
        }
    }

    collapse() {
        this.sidebar.classList.add('collapsed');
        localStorage.setItem('sidebarCollapsed', 'true');
    }

    expand() {
        this.sidebar.classList.remove('collapsed');
        localStorage.setItem('sidebarCollapsed', 'false');
    }

    toggleCollapse() {
        if (this.sidebar.classList.contains('collapsed')) {
            this.expand();
        } else {
            this.collapse();
        }
    }
}

// Initialize sidebar
document.addEventListener('DOMContentLoaded', () => {
    window.sidebar = new Sidebar();
});

export default Sidebar;
