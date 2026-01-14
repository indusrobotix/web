// IndusRoboTix Website Configuration
// ==================================
// Edit this file to customize your website easily

const SITE_CONFIG = {
    // Site Information
    siteName: "IndusRoboTix",
    tagline: "Pakistan's Premier Robotics Provider",
    foundedYear: "2026",
    owner: "Furqan Khatti",
    location: "Lahore, Pakistan",
    
    // Contact Information
    contact: {
        email: "indusrobotix@gmail.com",
        phone: "+92 312 1179306",
        address: "Saddar, Karachi, Pakistan",
        businessHours: "Mon-Sat: 1:00 PM - 11:00 PM",
        emergencyPhone: "+92 300 1234569"
    },
    
    // Social Media Links
    socialMedia: {
        facebook: "https://facebook.com/indusrobotix",
        instagram: "https://instagram.com/indusrobotix",
        youtube: "https://youtube.com/indusrobotix",
        linkedin: "https://linkedin.com/company/indusrobotix",
        twitter: "https://twitter.com/indusrobotix",
        whatsapp: "https://wa.me/923121179306"
    },
    
    // Business Stats
    stats: {
        kitsDelivered: "500+",
        customDesigns: "50+",
        localSourcing: "100%",
        satisfactionRate: "98%"
    },
    
    // Products
    products: [
        {
            id: "starter-kit",
            name: "Starter Robotics Kit",
            price: "Rs. 8,500",
            description: "Perfect for beginners. Includes Arduino Uno, sensors, motors, and our signature acrylic chassis.",
            features: ["Arduino Uno", "5 Sensors", "4 Motors", "Acrylic Chassis"],
            badge: "Bestseller",
            category: "starter"
        },
        {
            id: "advanced-kit",
            name: "Advanced Robotics Kit",
            price: "Rs. 15,000",
            description: "For experienced builders. Features ESP32, advanced sensors, and modular chassis design.",
            features: ["ESP32", "8 Sensors", "6 Motors", "Modular Chassis"],
            badge: "Advanced",
            category: "advanced"
        },
        {
            id: "line-follower",
            name: "Line Follower Robot",
            price: "Rs. 6,500",
            description: "Ready-to-assemble line following robot with pre-programmed Arduino and IR sensor array.",
            features: ["Arduino Nano", "IR Sensor Array", "2 Motors", "Pre-programmed"],
            badge: "Educational",
            category: "educational"
        }
    ],
    
    // Services
    services: [
        {
            id: "custom-assembly",
            name: "Custom Kit Assembly",
            icon: "fa-tools",
            description: "Pre-assembled and DIY robotic kits tailored for students, hobbyists, and professionals."
        },
        {
            id: "chassis-design",
            name: "Precision Chassis",
            icon: "fa-ruler-combined",
            description: "Custom-designed acrylic chassis with laser-cut precision for your unique projects."
        },
        {
            id: "expert-assembly",
            name: "Expert Assembly",
            icon: "fa-tools",
            description: "Professional component assembly and testing to ensure your robots work flawlessly."
        },
        {
            id: "stem-education",
            name: "STEM Education",
            icon: "fa-graduation-cap",
            description: "Supporting Pakistan's education sector with quality robotics learning materials."
        }
    ],
    
    // Testimonials
    testimonials: [
        {
            name: "Ahmed Hassan",
            role: "Engineering Student, NUST University",
            content: "The starter kit from IndusRoboTix helped me win my first robotics competition. The quality of components and the custom chassis design gave me an edge over competitors.",
            initials: "AH",
            rating: 5
        },
        {
            name: "Dr. Ayesha Khan",
            role: "Professor, FAST University",
            content: "We've been ordering bulk kits for our robotics lab. The quality is consistent and Furqan's team provides excellent support for educational institutions.",
            initials: "AK",
            rating: 4.5
        },
        {
            name: "Bilal Mahmood",
            role: "Robotics Hobbyist",
            content: "Finally, a local supplier who understands robotics! No more waiting for international shipping. The custom chassis service is a game-changer.",
            initials: "BM",
            rating: 5
        }
    ],
    
    // Navigation Menu
    navigation: [
        { name: "HOME", url: "index.html", icon: "fa-home" },
        { name: "PRODUCTS", url: "products.html", icon: "fa-robot" },
        { name: "SERVICES", url: "services.html", icon: "fa-cogs" },
        { name: "GALLERY", url: "gallery.html", icon: "fa-images" },
        { name: "ABOUT", url: "about.html", icon: "fa-info-circle" },
        { name: "CONTACT", url: "contact.html", icon: "fa-envelope" }
    ],
    
    // Color Scheme
    colors: {
        primary: "#2563eb",
        secondary: "#0d9488",
        accent: "#f97316",
        lightBg: "#f8fafc",
        darkBg: "#0f172a"
    },
    
    // SEO Meta Tags
    meta: {
        description: "IndusRoboTix - Custom Robotics Kits in Pakistan. Locally sourced components, custom acrylic chassis design, and STEM education.",
        keywords: "robotics, Pakistan, STEM, custom kits, acrylic chassis, robotic components, Furqan Khatti",
        author: "Furqan Khatti"
    },
    
    // Footer Configuration
    footer: {
        tagline: "Your trusted partner for robotics solutions in Pakistan. Get in touch for custom kits, workshops, and technical support.",
        policies: [
            { name: "Privacy Policy", url: "#" },
            { name: "Terms of Service", url: "#" },
            { name: "Shipping Policy", url: "#" },
            { name: "Returns & Refunds", url: "#" }
        ]
    },
    
    // Chatbot Configuration
    chatbot: {
        enabled: true,
        welcomeMessage: "Hello! I'm Robo, your IndusRoboTix assistant. How can I help you today?",
        quickOptions: [
            { label: "Product Inquiry", value: "product-inquiry" },
            { label: "Technical Support", value: "technical-support" },
            { label: "Order Status", value: "order-status" },
            { label: "Workshop Booking", value: "workshop-booking" }
        ]
    }
};

// Export configuration
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SITE_CONFIG;
}

// Make available globally
window.SITE_CONFIG = SITE_CONFIG;
