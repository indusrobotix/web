// Utility functions for dynamic content loading
class SiteManager {
    constructor() {
        this.config = SITE_CONFIG;
        this.init();
    }

    async init() {
        await this.loadComponents();
        this.updateDynamicContent();
        this.setupEventListeners();
        this.setCurrentYear();
        this.highlightCurrentPage();
    }

    async loadComponents() {
        // Load header, footer, and chatbot components
        await this.loadComponent('header', '.navbar-container');
        await this.loadComponent('footer', '.footer-container');
        await this.loadComponent('chatbot', '.chatbot-container');
    }

    async loadComponent(componentName, containerSelector) {
        try {
            const response = await fetch(`assets/components/${componentName}.html`);
            const html = await response.text();
            const container = document.querySelector(containerSelector);
            if (container) {
                container.innerHTML = html;
            } else {
                // Create container if it doesn't exist
                const div = document.createElement('div');
                div.className = containerSelector.replace('.', '');
                div.innerHTML = html;
                document.body.appendChild(div);
            }
        } catch (error) {
            console.error(`Error loading ${componentName}:`, error);
        }
    }

    updateDynamicContent() {
        // Update contact info
        this.updateContactInfo();
        
        // Update footer
        this.updateFooter();
        
        // Update navigation
        this.updateNavigation();
    }

    updateContactInfo() {
        const contactElements = document.querySelectorAll('#contact-info');
        contactElements.forEach(el => {
            if (el) {
                el.innerHTML = `
                    <li><a href="#"><i class="fas fa-map-marker-alt"></i> ${this.config.contact.address}</a></li>
                    <li><a href="tel:${this.config.contact.phone}"><i class="fas fa-phone"></i> ${this.config.contact.phone}</a></li>
                    <li><a href="mailto:${this.config.contact.email}"><i class="fas fa-envelope"></i> ${this.config.contact.email}</a></li>
                    <li><a href="#"><i class="fas fa-clock"></i> ${this.config.contact.businessHours}</a></li>
                `;
            }
        });
    }

    updateFooter() {
        // Update footer tagline
        const tagline = document.getElementById('footer-tagline');
        if (tagline && this.config.footer) {
            tagline.textContent = this.config.footer.tagline;
        }

        // Update company name
        const companyName = document.getElementById('company-name');
        if (companyName && this.config.siteName) {
            companyName.textContent = this.config.siteName;
        }

        // Update policy links
        const policyLinks = document.getElementById('policy-links');
        if (policyLinks && this.config.footer?.policies) {
            policyLinks.innerHTML = this.config.footer.policies
                .map(policy => `<a href="${policy.url}">${policy.name}</a>`)
                .join('');
        }
    }

    updateNavigation() {
        // Update navigation if needed
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu && this.config.header?.navigation) {
            navMenu.innerHTML = this.config.header.navigation
                .map(item => `<li><a href="${item.url}">${item.name}</a></li>`)
                .join('');
        }
    }

    setCurrentYear() {
        const yearElements = document.querySelectorAll('#current-year');
        yearElements.forEach(el => {
            if (el) el.textContent = new Date().getFullYear();
        });
    }

    highlightCurrentPage() {
        const currentPage = window.location.pathname.split('/').pop();
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    setupEventListeners() {
        // Mobile menu toggle
        const menuToggle = document.querySelector('.menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (menuToggle && navMenu) {
            menuToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                menuToggle.classList.toggle('active');
            });
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.siteManager = new SiteManager();
    
    // Initialize page-specific functionality
    if (typeof window.pageInit === 'function') {
        window.pageInit();
    }
});
