// IndusRoboTix - Main JavaScript File
// Version: 1.0
// Author: Furqan Khatti

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modules
    SiteManager.init();
    NavigationManager.init();
    ChatbotManager.init();
    DynamicContentLoader.init();
    FormManager.init();
    
    // Set current year in footer
    setCurrentYear();
    
    // Highlight current page in navigation
    highlightCurrentPage();
    
    // Initialize page-specific functionality
    if (typeof window.pageInit === 'function') {
        window.pageInit();
    }
});

// Site Manager - Core functionality
const SiteManager = {
    init() {
        console.log('IndusRoboTix Site Manager initialized');
        this.loadComponents();
        this.setupEventListeners();
        this.initializeDarkMode();
    },

    async loadComponents() {
        try {
            // Load header, footer, and chatbot if containers exist
            await this.loadComponent('header', '.navbar-container');
            await this.loadComponent('footer', '.footer-container');
            await this.loadComponent('chatbot', '.chatbot-container');
        } catch (error) {
            console.error('Error loading components:', error);
        }
    },

    async loadComponent(componentName, containerSelector) {
        const container = document.querySelector(containerSelector);
        if (!container) return;

        try {
            const response = await fetch(`assets/components/${componentName}.html`);
            if (!response.ok) throw new Error(`Failed to load ${componentName}`);
            
            const html = await response.text();
            container.innerHTML = html;
            
            // Dispatch event for component loaded
            const event = new CustomEvent(`${componentName}Loaded`, { detail: { component: componentName } });
            document.dispatchEvent(event);
        } catch (error) {
            console.error(`Error loading ${componentName}:`, error);
            container.innerHTML = `<p class="error">Failed to load ${componentName}</p>`;
        }
    },

    setupEventListeners() {
        // Scroll to top button
        const scrollToTopBtn = document.getElementById('scroll-to-top');
        if (scrollToTopBtn) {
            scrollToTopBtn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }

        // Newsletter subscription
        const newsletterForm = document.getElementById('newsletter-form');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', this.handleNewsletterSubmit);
        }
    },

    initializeDarkMode() {
        const isDarkMode = localStorage.getItem('darkMode') === 'true' ||
                          (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
        
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
            this.updateDarkModeToggle(true);
        }
    },

    updateDarkModeToggle(isDarkMode) {
        const toggles = document.querySelectorAll('.dark-mode-toggle');
        toggles.forEach(toggle => {
            const icon = toggle.querySelector('i');
            const text = toggle.querySelector('span');
            
            if (isDarkMode) {
                icon.className = 'fas fa-sun';
                if (text) text.textContent = 'Light Mode';
            } else {
                icon.className = 'fas fa-moon';
                if (text) text.textContent = 'Dark Mode';
            }
        });
    },

    handleNewsletterSubmit(e) {
        e.preventDefault();
        const email = e.target.querySelector('input[type="email"]').value;
        
        if (this.validateEmail(email)) {
            // In a real application, you would send this to a server
            alert('Thank you for subscribing to our newsletter!');
            e.target.reset();
        } else {
            alert('Please enter a valid email address.');
        }
    },

    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
};

// Navigation Manager
const NavigationManager = {
    init() {
        document.addEventListener('headerLoaded', () => {
            this.setupMobileMenu();
            this.setupDarkModeToggle();
            this.setupScrollEffects();
        });
    },

    setupMobileMenu() {
        const menuToggle = document.getElementById('menu-toggle');
        const navMenu = document.getElementById('nav-menu');
        
        if (menuToggle && navMenu) {
            menuToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                menuToggle.classList.toggle('active');
                menuToggle.setAttribute('aria-expanded', navMenu.classList.contains('active'));
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                    navMenu.classList.remove('active');
                    menuToggle.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            });
        }
    },

    setupDarkModeToggle() {
        const darkToggles = document.querySelectorAll('.dark-mode-toggle');
        
        darkToggles.forEach(toggle => {
            toggle.addEventListener('click', () => {
                const isDarkMode = document.body.classList.toggle('dark-mode');
                localStorage.setItem('darkMode', isDarkMode);
                SiteManager.updateDarkModeToggle(isDarkMode);
            });
        });
    },

    setupScrollEffects() {
        const navbar = document.getElementById('main-navbar');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
};

// Dynamic Content Loader
const DynamicContentLoader = {
    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.loadFromConfig();
        });
        
        document.addEventListener('footerLoaded', () => {
            this.updateFooterContent();
        });
    },

    loadFromConfig() {
        if (!window.SITE_CONFIG) {
            console.warn('SITE_CONFIG not found');
            return;
        }

        // Update page title if not set
        if (!document.title || document.title === 'Document') {
            document.title = `${SITE_CONFIG.siteName} - ${SITE_CONFIG.tagline}`;
        }

        // Update meta description if not set
        let metaDesc = document.querySelector('meta[name="description"]');
        if (!metaDesc && SITE_CONFIG.meta?.description) {
            metaDesc = document.createElement('meta');
            metaDesc.name = 'description';
            metaDesc.content = SITE_CONFIG.meta.description;
            document.head.appendChild(metaDesc);
        }
    },

    updateFooterContent() {
        if (!window.SITE_CONFIG) return;

        // Update company name
        const companyName = document.getElementById('company-name');
        if (companyName) {
            companyName.textContent = SITE_CONFIG.siteName;
        }

        // Update tagline
        const tagline = document.getElementById('footer-tagline');
        if (tagline && SITE_CONFIG.tagline) {
            tagline.textContent = SITE_CONFIG.tagline;
        }

        // Update social links
        const socialLinks = document.getElementById('social-links');
        if (socialLinks && SITE_CONFIG.socialMedia) {
            const socialIcons = {
                facebook: { icon: 'facebook-f', color: '#1877f2' },
                instagram: { icon: 'instagram', color: '#e4405f' },
                youtube: { icon: 'youtube', color: '#ff0000' },
                linkedin: { icon: 'linkedin-in', color: '#0a66c2' },
                twitter: { icon: 'twitter', color: '#1da1f2' },
                whatsapp: { icon: 'whatsapp', color: '#25d366' }
            };

            socialLinks.innerHTML = Object.entries(SITE_CONFIG.socialMedia)
                .filter(([platform, url]) => url && socialIcons[platform])
                .map(([platform, url]) => {
                    const info = socialIcons[platform];
                    return `
                        <a href="${url}" class="social-icon" target="_blank" rel="noopener noreferrer" 
                           style="background-color: ${info.color}" aria-label="${platform}">
                            <i class="fab fa-${info.icon}"></i>
                        </a>
                    `;
                })
                .join('');
        }

        // Update contact info
        const contactInfo = document.getElementById('contact-info');
        if (contactInfo && SITE_CONFIG.contact) {
            contactInfo.innerHTML = `
                <li><a href="#"><i class="fas fa-map-marker-alt"></i> ${SITE_CONFIG.contact.address}</a></li>
                <li><a href="tel:${SITE_CONFIG.contact.phone}"><i class="fas fa-phone"></i> ${SITE_CONFIG.contact.phone}</a></li>
                <li><a href="mailto:${SITE_CONFIG.contact.email}"><i class="fas fa-envelope"></i> ${SITE_CONFIG.contact.email}</a></li>
                <li><a href="#"><i class="fas fa-clock"></i> ${SITE_CONFIG.contact.businessHours}</a></li>
            `;
        }

        // Update quick links
        const quickLinks = document.getElementById('quick-links');
        if (quickLinks && SITE_CONFIG.navigation) {
            quickLinks.innerHTML = SITE_CONFIG.navigation
                .filter(item => item.name !== 'CONTACT')
                .map(item => `
                    <li><a href="${item.url}"><i class="fas fa-${this.getPageIcon(item.name)}"></i> ${item.name}</a></li>
                `)
                .join('');
        }

        // Update policy links
        const policyLinks = document.getElementById('policy-links');
        if (policyLinks && SITE_CONFIG.footer?.policies) {
            policyLinks.innerHTML = SITE_CONFIG.footer.policies
                .map(policy => `<a href="${policy.url}">${policy.name}</a>`)
                .join('');
        }
    },

    getPageIcon(pageName) {
        const icons = {
            'HOME': 'home',
            'PRODUCTS': 'robot',
            'SERVICES': 'cogs',
            'GALLERY': 'images',
            'ABOUT': 'info-circle',
            'CONTACT': 'envelope'
        };
        return icons[pageName] || 'link';
    }
};

// Chatbot Manager
const ChatbotManager = {
    init() {
        document.addEventListener('chatbotLoaded', () => {
            this.setupChatbot();
        });
    },

    setupChatbot() {
        const chatToggle = document.getElementById('chat-toggle');
        const chatClose = document.getElementById('chat-close');
        const chatSend = document.getElementById('chat-send');
        const chatInput = document.getElementById('chat-input');
        const chatWindow = document.getElementById('chat-window');
        
        if (!chatToggle || !chatWindow) return;

        // Toggle chat window
        chatToggle.addEventListener('click', () => {
            chatWindow.classList.toggle('active');
            const isOpen = chatWindow.classList.contains('active');
            chatToggle.setAttribute('aria-label', isOpen ? 'Close chat' : 'Open chat');
            chatToggle.setAttribute('aria-expanded', isOpen);
            
            if (isOpen && chatInput) {
                chatInput.focus();
            }
        });

        // Close chat window
        if (chatClose) {
            chatClose.addEventListener('click', () => {
                chatWindow.classList.remove('active');
                chatToggle.setAttribute('aria-label', 'Open chat');
                chatToggle.setAttribute('aria-expanded', 'false');
            });
        }

        // Send message
        if (chatSend && chatInput) {
            const sendMessage = () => {
                const message = chatInput.value.trim();
                if (message) {
                    this.addMessage(message, 'user');
                    chatInput.value = '';
                    this.generateBotResponse(message);
                }
            };

            chatSend.addEventListener('click', sendMessage);
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    sendMessage();
                }
            });
        }

        // Quick option buttons
        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const option = e.target.getAttribute('data-option');
                this.handleQuickOption(option);
            });
        });

        // Close chat when clicking outside
        document.addEventListener('click', (e) => {
            if (!chatWindow.contains(e.target) && !chatToggle.contains(e.target) && chatWindow.classList.contains('active')) {
                chatWindow.classList.remove('active');
                chatToggle.setAttribute('aria-label', 'Open chat');
                chatToggle.setAttribute('aria-expanded', 'false');
            }
        });
    },

    addMessage(text, sender) {
        const chatBody = document.getElementById('chat-body');
        if (!chatBody) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${sender}`;
        
        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${this.escapeHtml(text)}</p>
                <span class="message-time">${timeString}</span>
            </div>
        `;
        
        chatBody.appendChild(messageDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    },

    generateBotResponse(userMessage) {
        // Simulate typing delay
        setTimeout(() => {
            const responses = [
                "Thanks for your message! Our support team will get back to you soon.",
                "I can help you with that. Could you provide more details about your robotics project?",
                "For technical support, please visit our services page or contact us directly.",
                "I've noted your inquiry and will direct it to the appropriate department.",
                "Great question! Let me connect you with our technical specialist."
            ];
            
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            this.addMessage(randomResponse, 'bot');
        }, 1000);
    },

    handleQuickOption(option) {
        let message = '';
        switch(option) {
            case 'product-inquiry':
                message = "I have a question about your robotics kits.";
                break;
            case 'technical-support':
                message = "I need technical support for my robotics project.";
                break;
            case 'order-status':
                message = "I'd like to check the status of my order.";
                break;
        }
        
        if (message) {
            this.addMessage(message, 'user');
            setTimeout(() => {
                this.addMessage("Thanks for your inquiry! I'll connect you with the right department.", 'bot');
            }, 1000);
        }
    },

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
};

// Form Manager
const FormManager = {
    init() {
        this.setupContactForm();
    },

    setupContactForm() {
        const contactForm = document.getElementById('contact-form');
        if (!contactForm) return;

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (this.validateContactForm(contactForm)) {
                // In a real application, you would submit the form data to a server
                this.showFormSuccess(contactForm);
            }
        });

        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
        });
    },

    validateContactForm(form) {
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        return isValid;
    },

    validateField(field) {
        const value = field.value.trim();
        const errorElement = field.nextElementSibling?.classList.contains('error-message') 
            ? field.nextElementSibling 
            : null;
        
        let isValid = true;
        let errorMessage = '';

        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        }
        
        // Email validation
        else if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }
        
        // Phone validation
        else if (field.type === 'tel' && value) {
            const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
            if (!phoneRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number';
            }
        }

        // Update field state
        if (errorElement) {
            if (!isValid) {
                field.classList.add('error');
                errorElement.textContent = errorMessage;
                errorElement.style.display = 'block';
            } else {
                field.classList.remove('error');
                errorElement.style.display = 'none';
            }
        }

        return isValid;
    },

    showFormSuccess(form) {
        // Create success message
        const successMsg = document.createElement('div');
        successMsg.className = 'alert alert-success';
        successMsg.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <div>
                <h4>Message Sent Successfully!</h4>
                <p>Thank you for contacting us. We'll get back to you within 24 hours.</p>
            </div>
        `;
        
        // Insert before form
        form.parentNode.insertBefore(successMsg, form);
        
        // Hide form
        form.style.display = 'none';
        
        // Reset form after 5 seconds
        setTimeout(() => {
            form.reset();
            form.style.display = 'block';
            successMsg.remove();
        }, 5000);
    }
};

// Utility Functions
function setCurrentYear() {
    const yearElements = document.querySelectorAll('#current-year');
    const currentYear = new Date().getFullYear();
    
    yearElements.forEach(element => {
        if (element) {
            element.textContent = currentYear;
        }
    });
}

function highlightCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
}

// Export modules for debugging
window.IndusRoboTix = {
    SiteManager,
    NavigationManager,
    DynamicContentLoader,
    ChatbotManager,
    FormManager
};
