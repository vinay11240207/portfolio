// Portfolio Configuration File
// Edit this file to customize your portfolio without touching the main code

window.portfolioConfig = {
    // Personal Information
    personal: {
        name: "Lakshya Vashistha",
        title: "Web Developer & Tech Enthusiast",
        email: "lakshyavashistha20@gmail.com",
        phone: "+91 8769719602",
        location: "Rajasthan, India",
        
        // Social Links
        social: {
            github: "https://github.com/vinay11240207",
            linkedin: "https://www.linkedin.com/in/lakshya-vashistha-12b851297",
            twitter: "https://twitter.com/lakshyavashistha",
            instagram: "https://instagram.com/vinay11240207",
            website: "https://lakshyavashistha.dev"
        },
        
        // Resume file path
        resumeFile: "assets/Lakshya_Vashistha_Resume.pdf"
    },

    // Typewriter effect texts
    typewriterTexts: [
        'Web Developer',
        'Tech Enthusiast', 
        'Creative Learner',
        'Digital Innovator',
        'Problem Solver'
    ],

    // About section content
    about: {
        description: `I'm a tech enthusiast, web developer, and creative learner passionate about transforming ideas into digital experiences. I enjoy working on interactive websites, applications, and platforms that blend creativity, design, and smart functionality. My goal is to continue exploring new technologies and contribute to meaningful digital innovations.`,
        
        interests: [
            {
                icon: "fas fa-laptop-code",
                title: "Web Development",
                description: "Creating responsive and interactive web applications"
            },
            {
                icon: "fas fa-mobile-alt", 
                title: "Mobile Apps",
                description: "Building Android applications with real-time features"
            },
            {
                icon: "fas fa-chart-line",
                title: "Data Management",
                description: "Experienced in data analysis, surveys, and digital documentation"
            },
            {
                icon: "fas fa-gamepad",
                title: "Game Development", 
                description: "Creating engaging online gaming platforms and interactive experiences"
            }
        ],

        education: [
            {
                icon: "fas fa-graduation-cap",
                title: "Bachelor of Computer Applications (BCA)",
                date: "2024 - Present",
                description: "Currently in 1st Year at Poddar International College"
            },
            {
                icon: "fas fa-school",
                title: "12th Pass - Science (Maths)",
                date: "2023", 
                description: "Completed from Alpha Beta School with Science stream"
            },
            {
                icon: "fas fa-code",
                title: "Self-Taught Developer",
                date: "2022 - Present",
                description: "Continuously learning web development and building projects"
            }
        ]
    },

    // Skills configuration
    skills: {
        frontend: [
            { name: "HTML/CSS", level: 90 },
            { name: "JavaScript", level: 85 },
            { name: "Responsive Design", level: 88 },
            { name: "Bootstrap", level: 82 }
        ],
        backend: [
            { name: "PHP", level: 75 },
            { name: "MySQL", level: 80 },
            { name: "Android Development", level: 70 },
            { name: "API Integration", level: 75 }
        ],
        tools: [
            { name: "Git/GitHub", level: 85 },
            { name: "VS Code", level: 90 },
            { name: "Data Analysis", level: 78 },
            { name: "MS Office Suite", level: 88 }
        ]
    },

    // Experience data
    experience: [
        {
            title: "Computer Operator",
            company: "Rajasthan University of Health Sciences (RUHS)",
            duration: "6 Months Experience",
            description: [
                "Worked in work management and account section as Computer Operator",
                "Handled data entries and digital documentation efficiently",
                "Managed account management systems and financial records",
                "Ensured accuracy in data processing and system maintenance"
            ],
            technologies: ["MS Office", "Data Management", "Digital Documentation", "Account Systems"]
        },
        {
            title: "Survey Data Analyst", 
            company: "QDegrees Company",
            duration: "3 Months Experience",
            description: [
                "Conducted surveys and data analysis for Bank BM Survey Project",
                "Maintained accurate reports and digital records",
                "Gained corporate experience in communication and data handling",
                "Organized workflow and improved data collection processes"
            ],
            technologies: ["Data Analysis", "Survey Management", "Report Generation", "Communication"]
        },
        {
            title: "Freelance Web Developer",
            company: "Self-Employed", 
            duration: "2022 - Present",
            description: [
                "Developed various websites including cafes, portfolios, and e-commerce platforms",
                "Created interactive gaming websites and birthday wishing pages",
                "Built Android applications with real-time notifications",
                "Worked on QR code generation tools and business websites"
            ],
            technologies: ["HTML", "CSS", "JavaScript", "PHP", "Android Development"]
        }
    ],

    // Projects data
    projects: [
        {
            id: 1,
            title: "Stock Notifier App",
            category: "mobile",
            description: "Android application for real-time stock alerts and notifications. Keeps users updated with live stock market data and price changes.",
            image: "https://via.placeholder.com/400x300/1a1a2e/00d4ff?text=Stock+Notifier+App",
            technologies: ["Android", "Java", "API Integration", "Real-time Notifications"],
            github: "https://github.com/vinay11240207/stock-notifier",
            demo: "https://play.google.com/store/apps/details?id=com.lakshya.stocknotifier",
            features: [
                "Real-time stock price monitoring",
                "Custom price alerts and notifications", 
                "Portfolio tracking and management",
                "Market news and updates",
                "User-friendly interface design",
                "Offline data caching",
                "Multiple stock exchanges support",
                "Watchlist management"
            ]
        },
        {
            id: 2,
            title: "QR Code Maker Website",
            category: "web",
            description: "Custom tool to generate QR codes for links, text, images, and videos. Easy-to-use interface with multiple format support.",
            image: "https://via.placeholder.com/400x300/1a1a2e/00d4ff?text=QR+Code+Maker",
            technologies: ["HTML", "CSS", "JavaScript", "QR Code API"],
            github: "https://github.com/vinay11240207/qr-code-generator",
            demo: "https://lakshya-qr-maker.netlify.app",
            features: [
                "Generate QR codes for text, URLs, images",
                "Support for videos and contact information",
                "Customizable QR code colors and sizes",
                "Download QR codes in multiple formats",
                "Bulk QR code generation",
                "Real-time preview",
                "Mobile-responsive design",
                "No registration required"
            ]
        },
        {
            id: 3,
            title: "Cafe Website",
            category: "web",
            description: "Responsive and stylish website for cafes and restaurants. Features menu display, online ordering, and contact information.",
            image: "https://via.placeholder.com/400x300/1a1a2e/00d4ff?text=Cafe+Website",
            technologies: ["HTML", "CSS", "JavaScript", "Bootstrap"],
            github: "https://github.com/vinay11240207/cafe-website",
            demo: "https://lakshya-cafe-website.netlify.app",
            features: [
                "Beautiful menu display with images",
                "Online table reservation system",
                "Contact form and location map",
                "Gallery showcase",
                "Mobile-friendly responsive design",
                "Social media integration",
                "About us and chef profiles",
                "Customer testimonials section"
            ]
        },
        {
            id: 4,
            title: "Web Developer Portfolio",
            category: "web",
            description: "Interactive personal portfolio website with smooth animations and transitions. Showcases projects and skills professionally.",
            image: "https://via.placeholder.com/400x300/1a1a2e/00d4ff?text=Portfolio+Website",
            technologies: ["HTML", "CSS", "JavaScript", "GSAP"],
            github: "https://github.com/vinay11240207/portfolio",
            demo: "https://lakshyavashistha.netlify.app",
            features: [
                "Smooth scroll animations",
                "Interactive project showcase",
                "Skills and experience timeline",
                "Contact form integration",
                "Responsive design for all devices",
                "Dark/Light theme toggle",
                "SEO optimized structure",
                "Fast loading performance"
            ]
        },
        {
            id: 5,
            title: "E-commerce Website",
            category: "web",
            description: "Multi-store shopping platform with login system, product catalog, and secure checkout process.",
            image: "https://via.placeholder.com/400x300/1a1a2e/00d4ff?text=E-Commerce+Platform",
            technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
            github: "https://github.com/vinay11240207/ecommerce-platform",
            demo: "https://lakshya-shop.000webhostapp.com",
            features: [
                "User registration and authentication",
                "Product catalog with search filters",
                "Shopping cart and wishlist",
                "Multi-store vendor system",
                "Secure payment integration",
                "Order tracking and history",
                "Admin dashboard for management",
                "Customer reviews and ratings"
            ]
        },
        {
            id: 6,
            title: "Game Websites Collection",
            category: "web",
            description: "Online gaming platform with playable games like Snake, Tic Tac Toe, and more. Interactive and engaging user experience.",
            image: "https://via.placeholder.com/400x300/1a1a2e/00d4ff?text=Gaming+Platform",
            technologies: ["HTML", "CSS", "JavaScript", "Game Logic"],
            github: "https://github.com/vinay11240207/game-collection",
            demo: "https://lakshya-games.netlify.app",
            features: [
                "Multiple classic games collection",
                "Snake game with high score tracking",
                "Tic Tac Toe with AI opponent",
                "Memory card matching game",
                "Responsive game controls",
                "Leaderboard system",
                "Sound effects and animations",
                "Social sharing features"
            ]
        }
    ],

    // Theme configuration
    theme: {
        colors: {
            primary: "#00d4ff",
            secondary: "#b967db", 
            background: "#0a0a0f",
            surface: "#1a1a2e",
            text: "#ffffff",
            textSecondary: "#b8c5d6"
        },
        
        fonts: {
            primary: "'Inter', sans-serif",
            mono: "'JetBrains Mono', monospace"
        }
    },

    // Animation settings
    animations: {
        enableAnimations: true,
        enableParticles: true,
        reducedMotion: false, // Will be auto-detected
        
        // Timing settings
        timing: {
            fast: 0.2,
            normal: 0.3,
            slow: 0.5
        }
    },

    // Contact information
    contact: {
        formAction: "mailto:lakshyavashistha20@gmail.com", // Direct email link
        socialLinks: true,
        showContactForm: true
    }
};