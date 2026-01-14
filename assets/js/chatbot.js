// Chatbot functionality
class Chatbot {
    constructor() {
        this.isOpen = false;
        this.init();
    }

    init() {
        this.bindEvents();
        this.setupQuickResponses();
    }

    bindEvents() {
        const chatToggle = document.getElementById('chat-toggle');
        const chatClose = document.getElementById('chat-close');
        const chatSend = document.getElementById('chat-send');
        const chatInput = document.getElementById('chat-input');
        
        if (chatToggle) chatToggle.addEventListener('click', () => this.toggleChat());
        if (chatClose) chatClose.addEventListener('click', () => this.closeChat());
        if (chatSend) chatSend.addEventListener('click', () => this.sendMessage());
        if (chatInput) chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
        
        // Quick options
        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const option = e.target.getAttribute('data-option');
                this.handleQuickOption(option);
            });
        });
    }

    toggleChat() {
        const chatWindow = document.getElementById('chat-window');
        chatWindow.classList.toggle('active');
        this.isOpen = !this.isOpen;
    }

    closeChat() {
        const chatWindow = document.getElementById('chat-window');
        chatWindow.classList.remove('active');
        this.isOpen = false;
    }

    sendMessage() {
        const input = document.getElementById('chat-input');
        const message = input.value.trim();
        
        if (message) {
            this.addMessage(message, 'user');
            input.value = '';
            this.generateBotResponse(message);
        }
    }

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
    }

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
    }

    generateBotResponse(userMessage) {
        // Simulate bot response
        setTimeout(() => {
            const responses = [
                "Thanks for your message! Our team will get back to you soon.",
                "I can help you with that. Could you provide more details?",
                "For technical support, please visit our services page.",
                "I've noted your inquiry and will direct it to the appropriate team."
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            this.addMessage(randomResponse, 'bot');
        }, 1000);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.chatbot = new Chatbot();
});
