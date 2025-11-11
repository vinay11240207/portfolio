// Main Application Controller
class PortfolioApp {
    constructor() {
        this.currentSection = 'home';
        this.theme = 'dark';
        this.isMenuOpen = false;
        this.projectData = this.getProjectData();
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.initCustomCursor();
        this.initNavigation();
        this.initBackToTop();
        this.initProjectModal();
        this.initProjectFilters();
        this.initThemeToggle();
        this.initContactForm();
        this.handleScrollEffects();
    }

    bindEvents() {
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    this.scrollToSection(target);
                }
            });
        });

        // Window resize handler
        window.addEventListener('resize', () => {
            this.handleResize();
        });

        // Scroll handler
        window.addEventListener('scroll', () => {
            this.handleScroll();
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            this.handleKeyboard(e);
        });
    }

    initCustomCursor() {
        const cursor = document.querySelector('.cursor');
        const follower = document.querySelector('.cursor-follower');
        
        if (!cursor || !follower) return;

        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
        });

        // Smooth follower animation
        const animateFollower = () => {
            const speed = 0.15;
            followerX += (mouseX - followerX) * speed;
            followerY += (mouseY - followerY) * speed;
            
            follower.style.transform = `translate(${followerX}px, ${followerY}px)`;
            requestAnimationFrame(animateFollower);
        };
        animateFollower();

        // Cursor hover effects
        const hoverElements = document.querySelectorAll('a, button, .project-card, .interest-card, .nav-link');
        
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.style.transform += ' scale(1.5)';
                follower.style.transform += ' scale(1.2)';
                cursor.style.backgroundColor = '#b967db';
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.style.transform = cursor.style.transform.replace(' scale(1.5)', '');
                follower.style.transform = follower.style.transform.replace(' scale(1.2)', '');
                cursor.style.backgroundColor = '#00d4ff';
            });
        });
    }

    initNavigation() {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        // Mobile menu toggle
        hamburger.addEventListener('click', () => {
            this.isMenuOpen = !this.isMenuOpen;
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (this.isMenuOpen) {
                    this.isMenuOpen = false;
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
                
                // Update active link
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });

        // Update active nav link on scroll
        this.updateActiveNavLink();
    }

    initBackToTop() {
        const backToTopBtn = document.getElementById('back-to-top');
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    initProjectModal() {
        const modal = document.getElementById('project-modal');
        const closeBtn = modal.querySelector('.modal-close');
        const viewProjectBtns = document.querySelectorAll('.view-project');

        // Open modal
        viewProjectBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const projectId = btn.getAttribute('data-project');
                this.openProjectModal(projectId);
            });
        });

        // Close modal
        closeBtn.addEventListener('click', () => {
            this.closeProjectModal();
        });

        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeProjectModal();
            }
        });
    }

    initProjectFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.getAttribute('data-filter');
                
                // Update active filter button
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Filter projects
                this.filterProjects(filter, projectCards);
            });
        });
    }

    initThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        const icon = themeToggle.querySelector('i');
        
        themeToggle.addEventListener('click', () => {
            this.theme = this.theme === 'dark' ? 'light' : 'dark';
            this.applyTheme();
            
            // Update icon
            icon.className = this.theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        });
    }

    initContactForm() {
        // Contact form functionality
        const contactBtns = document.querySelectorAll('#contact-me');
        
        contactBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.openContactModal();
            });
        });

        // CTA button actions
        const viewResumeBtn = document.getElementById('view-resume');
        const exploreProjectsBtn = document.getElementById('explore-projects');
        const downloadResumeBtn = document.getElementById('download-resume');

        viewResumeBtn.addEventListener('click', () => {
            this.scrollToSection(document.getElementById('resume'));
        });

        exploreProjectsBtn.addEventListener('click', () => {
            this.scrollToSection(document.getElementById('projects'));
        });

        downloadResumeBtn.addEventListener('click', () => {
            this.downloadResume();
        });
    }

    scrollToSection(target) {
        const offsetTop = target.offsetTop - 80; // Account for navbar height
        
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }

    handleScroll() {
        const scrollTop = window.pageYOffset;
        const backToTopBtn = document.getElementById('back-to-top');
        
        // Show/hide back to top button
        if (scrollTop > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }

        // Update active navigation link
        this.updateActiveNavLink();
    }

    updateActiveNavLink() {
        const sections = document.querySelectorAll('.section');
        const navLinks = document.querySelectorAll('.nav-link');
        const scrollTop = window.pageYOffset + 100;

        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollTop >= sectionTop && scrollTop < sectionBottom) {
                navLinks.forEach(link => link.classList.remove('active'));
                const activeLink = document.querySelector(`[data-section="${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
                this.currentSection = sectionId;
            }
        });
    }

    handleScrollEffects() {
        // Parallax effects for floating elements
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.floating-icon');
            
            parallaxElements.forEach((element, index) => {
                const speed = 0.5 + (index * 0.1);
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.1}deg)`;
            });
        });
    }

    handleResize() {
        // Update particle system
        if (window.particleSystem) {
            window.particleSystem.resize();
            window.particleSystem.createParticles();
        }
        
        // Refresh ScrollTrigger
        if (window.animationController) {
            window.animationController.refresh();
        }
    }

    handleKeyboard(e) {
        // Escape key to close modal
        if (e.key === 'Escape') {
            this.closeProjectModal();
        }
        
        // Arrow keys for navigation
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
            this.navigateSections(e.key === 'ArrowDown' ? 1 : -1);
        }
    }

    navigateSections(direction) {
        const sections = ['home', 'about', 'resume', 'experience', 'projects'];
        const currentIndex = sections.indexOf(this.currentSection);
        const nextIndex = Math.max(0, Math.min(sections.length - 1, currentIndex + direction));
        
        if (nextIndex !== currentIndex) {
            const targetSection = document.getElementById(sections[nextIndex]);
            this.scrollToSection(targetSection);
        }
    }

    openProjectModal(projectId) {
        const modal = document.getElementById('project-modal');
        const project = this.projectData[projectId - 1];
        
        if (!project) return;

        // Populate modal content
        this.populateModalContent(project);
        
        // Show modal with animation
        modal.classList.add('active');
        modal.style.display = 'flex';
        
        if (window.animationController) {
            window.animationController.animateModalEntry(modal);
        }
    }

    closeProjectModal() {
        const modal = document.getElementById('project-modal');
        
        if (window.animationController) {
            window.animationController.animateModalExit(modal).then(() => {
                modal.classList.remove('active');
                modal.style.display = 'none';
            });
        } else {
            modal.classList.remove('active');
            modal.style.display = 'none';
        }
    }

    populateModalContent(project) {
        const modal = document.getElementById('project-modal');
        
        modal.querySelector('#modal-title').textContent = project.title;
        modal.querySelector('#modal-desc').textContent = project.description;
        modal.querySelector('#modal-img').src = project.image;
        modal.querySelector('#modal-github').href = project.github;
        modal.querySelector('#modal-demo').href = project.demo;
        
        // Populate features
        const featuresList = modal.querySelector('#modal-features-list');
        featuresList.innerHTML = project.features.map(feature => `<li>${feature}</li>`).join('');
        
        // Populate tech tags
        const techContainer = modal.querySelector('#modal-tech-tags');
        techContainer.innerHTML = project.tech.map(tech => 
            `<span class="tech-tag">${tech}</span>`
        ).join('');
    }

    filterProjects(filter, projectCards) {
        const hideElements = [];
        const showElements = [];

        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                showElements.push(card);
                card.style.display = 'block';
            } else {
                hideElements.push(card);
                card.style.display = 'none';
            }
        });

        // Animate filter transition
        if (window.animationController) {
            window.animationController.animateProjectFilter(hideElements, showElements);
        }
    }

    applyTheme() {
        const root = document.documentElement;
        
        if (this.theme === 'light') {
            root.style.setProperty('--bg-primary', '#ffffff');
            root.style.setProperty('--bg-secondary', '#f8f9fa');
            root.style.setProperty('--text-primary', '#1a1a2e');
            root.style.setProperty('--text-secondary', '#6c757d');
        } else {
            root.style.setProperty('--bg-primary', '#0a0a0f');
            root.style.setProperty('--bg-secondary', '#1a1a2e');
            root.style.setProperty('--text-primary', '#ffffff');
            root.style.setProperty('--text-secondary', '#b8c5d6');
        }
        
        document.body.classList.add('theme-transition');
        setTimeout(() => {
            document.body.classList.remove('theme-transition');
        }, 300);
    }

    openContactModal() {
        // Create contact modal dynamically
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="modal-close">&times;</span>
                <h3>Get In Touch</h3>
                <p>Let's work together! Feel free to reach out.</p>
                <div class="contact-links">
                    <a href="mailto:your.email@example.com" class="contact-link">
                        <i class="fas fa-envelope"></i>
                        Email Me
                    </a>
                    <a href="https://linkedin.com/in/yourprofile" class="contact-link" target="_blank">
                        <i class="fab fa-linkedin"></i>
                        LinkedIn
                    </a>
                    <a href="https://github.com/yourusername" class="contact-link" target="_blank">
                        <i class="fab fa-github"></i>
                        GitHub
                    </a>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Show modal
        modal.style.display = 'flex';
        modal.classList.add('active');
        
        // Close modal functionality
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => {
            modal.remove();
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    downloadResume() {
        // Create a download link (replace with actual resume file)
        const link = document.createElement('a');
        link.href = '#'; // Replace with actual resume file path
        link.download = 'John_Doe_Resume.pdf';
        
        // Show download animation
        const btn = document.getElementById('download-resume');
        const originalText = btn.innerHTML;
        
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';
        btn.disabled = true;
        
        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-check"></i> Downloaded!';
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.disabled = false;
            }, 2000);
        }, 1500);
        
        // Trigger download (when actual file is available)
        // link.click();
    }

    getProjectData() {
        return [
            {
                title: "E-Commerce Platform",
                description: "A full-stack e-commerce solution built with modern technologies. Features include user authentication, product management, shopping cart functionality, payment integration with Stripe, and an admin dashboard for order management.",
                image: "https://via.placeholder.com/600x400/1a1a2e/00d4ff?text=E-Commerce+Platform",
                github: "https://github.com/yourusername/ecommerce-platform",
                demo: "https://your-ecommerce-demo.com",
                features: [
                    "User registration and authentication",
                    "Product catalog with search and filters",
                    "Shopping cart and wishlist functionality",
                    "Secure payment processing with Stripe",
                    "Order tracking and history",
                    "Admin dashboard for product and order management",
                    "Responsive design for mobile and desktop",
                    "Email notifications for order updates"
                ],
                tech: ["React", "Node.js", "Express", "MongoDB", "Stripe", "JWT", "Socket.io"]
            },
            {
                title: "Task Management App",
                description: "A collaborative task management application with real-time updates and team collaboration features. Built with Vue.js and Socket.io for seamless real-time communication between team members.",
                image: "https://via.placeholder.com/600x400/1a1a2e/00d4ff?text=Task+Management+App",
                github: "https://github.com/yourusername/task-management",
                demo: "https://your-taskapp-demo.com",
                features: [
                    "Create and organize tasks with priorities",
                    "Drag-and-drop task management",
                    "Real-time collaboration with team members",
                    "Project and team management",
                    "Due date reminders and notifications",
                    "Progress tracking and analytics",
                    "File attachments and comments",
                    "Mobile-responsive interface"
                ],
                tech: ["Vue.js", "Vuex", "Socket.io", "Express.js", "PostgreSQL", "JWT"]
            },
            {
                title: "Weather Forecast App",
                description: "A beautiful and intuitive weather application providing accurate forecasts, interactive maps, and personalized weather alerts. Features location-based weather data and detailed meteorological information.",
                image: "https://via.placeholder.com/600x400/1a1a2e/00d4ff?text=Weather+App",
                github: "https://github.com/yourusername/weather-app",
                demo: "https://your-weather-demo.com",
                features: [
                    "Current weather conditions",
                    "7-day weather forecast",
                    "Hourly weather predictions",
                    "Interactive weather maps",
                    "Location-based weather alerts",
                    "Multiple location support",
                    "Weather widgets and themes",
                    "Offline weather data caching"
                ],
                tech: ["React Native", "Redux", "Weather API", "Maps API", "Async Storage"]
            },
            {
                title: "AI-Powered Chatbot",
                description: "An intelligent conversational AI chatbot with natural language processing capabilities. Features sentiment analysis, multi-language support, and integration with various messaging platforms.",
                image: "https://via.placeholder.com/600x400/1a1a2e/00d4ff?text=AI+Chatbot",
                github: "https://github.com/yourusername/ai-chatbot",
                demo: "https://your-chatbot-demo.com",
                features: [
                    "Natural language understanding",
                    "Sentiment analysis and emotion detection",
                    "Multi-language support",
                    "Integration with messaging platforms",
                    "Learning from user interactions",
                    "Contextual conversation memory",
                    "Custom personality configuration",
                    "Analytics and conversation insights"
                ],
                tech: ["Python", "OpenAI API", "Flask", "NLTK", "spaCy", "Redis", "Docker"]
            },
            {
                title: "Social Media Dashboard",
                description: "A comprehensive social media analytics and management dashboard. Features real-time metrics, scheduled posting, engagement tracking, and detailed analytics for multiple social media platforms.",
                image: "https://via.placeholder.com/600x400/1a1a2e/00d4ff?text=Social+Media+Dashboard",
                github: "https://github.com/yourusername/social-dashboard",
                demo: "https://your-dashboard-demo.com",
                features: [
                    "Multi-platform social media integration",
                    "Real-time analytics and metrics",
                    "Scheduled post management",
                    "Engagement tracking and analysis",
                    "Audience demographics insights",
                    "Content performance optimization",
                    "Team collaboration tools",
                    "Custom reporting and exports"
                ],
                tech: ["React", "D3.js", "Node.js", "Social APIs", "Chart.js", "MongoDB"]
            },
            {
                title: "Fitness Tracker App",
                description: "A comprehensive fitness tracking application with workout plans, progress monitoring, and social challenges. Built with Flutter for cross-platform compatibility and Firebase for real-time data synchronization.",
                image: "https://via.placeholder.com/600x400/1a1a2e/00d4ff?text=Fitness+Tracker",
                github: "https://github.com/yourusername/fitness-tracker",
                demo: "https://your-fitness-demo.com",
                features: [
                    "Workout tracking and logging",
                    "Custom workout plan creation",
                    "Progress photos and measurements",
                    "Social challenges and leaderboards",
                    "Nutrition tracking and meal planning",
                    "Integration with health devices",
                    "Achievement badges and rewards",
                    "Personal trainer consultations"
                ],
                tech: ["Flutter", "Dart", "Firebase", "Health APIs", "Charts", "Cloud Functions"]
            }
        ];
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    window.portfolioApp = new PortfolioApp();
    
    // Add some interactive console messages
    console.log(`
    🚀 Welcome to my Portfolio!
    
    This website features:
    ✨ Smooth GSAP animations
    🎨 Custom particle system
    📱 Fully responsive design
    🎯 Interactive elements
    
    Built with: HTML5, CSS3, JavaScript, GSAP, AOS
    
    Feel free to explore and get in touch!
    `);
});