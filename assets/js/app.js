/**
 * Main Application Entry Point
 * Initializes all modules and handles global app logic
 */

import Sidebar from './modules/sidebar.js';
import Navbar from './modules/navbar.js';
import Theme from './modules/theme.js';
import Utils from './modules/utils.js';

class App {
    constructor() {
        this.modules = {};
        this.init();
    }

    init() {
        // Initialize core modules
        this.modules.sidebar = new Sidebar();
        this.modules.navbar = new Navbar();
        this.modules.theme = new Theme();

        // Initialize utilities
        this.utils = Utils;

        // Initialize components
        this.initComponents();

        // Handle page load animations
        this.handlePageLoad();

        // Initialize tooltips
        this.initTooltips();

        // Handle scroll behavior
        this.initScrollBehavior();
    }

    initComponents() {
        // Initialize all interactive components
        this.initDropdowns();
        this.initModals();
        this.initTabs();
        this.initAccordions();
    }

    initDropdowns() {
        const dropdownToggles = document.querySelectorAll('[data-bs-toggle="dropdown"]');
        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', function(e) {
                e.stopPropagation();
                const menu = this.nextElementSibling;
                if (menu && menu.classList.contains('dropdown-menu')) {
                    menu.classList.toggle('show');
                }
            });
        });

        // Close dropdowns on outside click
        document.addEventListener('click', () => {
            document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
                menu.classList.remove('show');
            });
        });
    }

    initModals() {
        // Modal logic can be added here
        const modalTriggers = document.querySelectorAll('[data-modal]');
        modalTriggers.forEach(trigger => {
            trigger.addEventListener('click', function() {
                const modalId = this.dataset.modal;
                const modal = document.getElementById(modalId);
                if (modal) {
                    modal.classList.add('show');
                }
            });
        });
    }

    initTabs() {
        const tabTriggers = document.querySelectorAll('[data-tab]');
        tabTriggers.forEach(trigger => {
            trigger.addEventListener('click', function() {
                const tabId = this.dataset.tab;
                const tabContent = document.getElementById(tabId);
                
                if (tabContent) {
                    // Remove active class from all tabs
                    document.querySelectorAll('.tab-pane').forEach(pane => {
                        pane.classList.remove('active');
                    });
                    document.querySelectorAll('[data-tab]').forEach(tab => {
                        tab.classList.remove('active');
                    });
                    
                    // Add active class to current tab
                    tabContent.classList.add('active');
                    this.classList.add('active');
                }
            });
        });
    }

    initAccordions() {
        const accordionToggles = document.querySelectorAll('[data-accordion]');
        accordionToggles.forEach(toggle => {
            toggle.addEventListener('click', function() {
                const accordionId = this.dataset.accordion;
                const content = document.getElementById(accordionId);
                
                if (content) {
                    const isOpen = content.classList.contains('show');
                    
                    // Close all accordions in the same group
                    const group = this.closest('.accordion');
                    if (group) {
                        group.querySelectorAll('.accordion-content').forEach(item => {
                            item.classList.remove('show');
                        });
                    }
                    
                    // Toggle current accordion
                    if (!isOpen) {
                        content.classList.add('show');
                    }
                }
            });
        });
    }

    initTooltips() {
        const tooltipElements = document.querySelectorAll('[data-tooltip]');
        tooltipElements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                const text = this.dataset.tooltip;
                const tooltip = document.createElement('div');
                tooltip.className = 'tooltip';
                tooltip.textContent = text;
                tooltip.id = 'active-tooltip';
                document.body.appendChild(tooltip);
                
                const rect = this.getBoundingClientRect();
                tooltip.style.top = `${rect.top - tooltip.offsetHeight - 5}px`;
                tooltip.style.left = `${rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2)}px`;
                
                setTimeout(() => tooltip.classList.add('show'), 10);
            });
            
            element.addEventListener('mouseleave', function() {
                const tooltip = document.getElementById('active-tooltip');
                if (tooltip) {
                    tooltip.classList.remove('show');
                    setTimeout(() => tooltip.remove(), 200);
                }
            });
        });
    }

    initScrollBehavior() {
        let lastScroll = 0;
        const navbar = document.querySelector('.navbar');
        
        if (navbar) {
            window.addEventListener('scroll', Utils.throttle(() => {
                const currentScroll = window.pageYOffset;
                
                if (currentScroll > lastScroll && currentScroll > 100) {
                    navbar.style.transform = 'translateY(-100%)';
                } else {
                    navbar.style.transform = 'translateY(0)';
                }
                
                lastScroll = currentScroll;
            }, 100));
        }
    }

    handlePageLoad() {
        // Remove loading class
        document.body.classList.add('loaded');
        
        // Animate elements on page load
        const animateElements = document.querySelectorAll('[data-animate]');
        animateElements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('animated');
            }, index * 100);
        });
    }

    // Public API
    getModule(name) {
        return this.modules[name];
    }

    toast(message, type = 'info', duration = 3000) {
        return Utils.toast(message, type, duration);
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});

export default App;
