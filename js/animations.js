// Animation Controller
class AnimationController {
    constructor() {
        this.init();
    }

    init() {
        // Initialize GSAP
        gsap.registerPlugin(ScrollTrigger);
        
        // Ensure name visibility fallback
        this.ensureNameVisibility();
        
        // Initialize AOS
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 100,
            delay: 100
        });

        this.setupLoaderAnimation();
        this.setupTypewriterEffect();
        this.setupScrollAnimations();
        this.setupSkillBarAnimations();
        this.setupFloatingElements();
        this.setupParallaxEffects();
        this.setupHoverAnimations();
    }

    ensureNameVisibility() {
        // Fallback to ensure name is always visible
        setTimeout(() => {
            const nameLetters = document.querySelectorAll('.name .letter');
            const nameElement = document.querySelector('.name');
            
            if (nameElement) {
                nameElement.style.opacity = '1';
            }
            
            nameLetters.forEach(letter => {
                letter.style.opacity = '1';
                letter.style.transform = 'translateY(0)';
            });
        }, 100);
    }

    setupLoaderAnimation() {
        const loader = document.getElementById('loader');
        const letters = loader.querySelectorAll('.letter');
        const progressBar = loader.querySelector('.loader-bar');

        // Animate letters appearing
        gsap.fromTo(letters, 
            { opacity: 0, y: 50, rotationX: 90 },
            { 
                opacity: 1, 
                y: 0, 
                rotationX: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: "power2.out"
            }
        );

        // Animate progress bar
        gsap.fromTo(progressBar,
            { width: '0%' },
            { 
                width: '100%',
                duration: 2,
                ease: "power2.inOut",
                delay: 1
            }
        );

        // Hide loader after animation
        setTimeout(() => {
            gsap.to(loader, {
                opacity: 0,
                duration: 0.5,
                onComplete: () => {
                    loader.style.display = 'none';
                    this.setupMainAnimations();
                }
            });
        }, 3000);
    }

    setupMainAnimations() {
        // Animate main content entry
        const homeSection = document.querySelector('.home-section');
        
        gsap.fromTo(homeSection,
            { opacity: 0 },
            { opacity: 1, duration: 1, ease: "power2.out" }
        );

        // Animate name reveal letters
        const nameLetters = document.querySelectorAll('.name .letter');
        
        // Ensure name is visible as fallback
        nameLetters.forEach(letter => letter.style.opacity = '1');
        
        gsap.fromTo(nameLetters,
            { opacity: 0, y: 30, rotationX: 90 },
            { 
                opacity: 1, 
                y: 0, 
                rotationX: 0,
                duration: 0.6,
                stagger: 0.1,
                delay: 0.5,
                ease: "back.out(1.7)",
                onComplete: () => {
                    // Ensure visibility after animation
                    nameLetters.forEach(letter => letter.style.opacity = '1');
                }
            }
        );

        // Animate CTA buttons
        const ctaButtons = document.querySelectorAll('.cta-buttons .btn');
        gsap.fromTo(ctaButtons,
            { opacity: 0, y: 20, scale: 0.8 },
            { 
                opacity: 1, 
                y: 0, 
                scale: 1,
                duration: 0.8,
                stagger: 0.2,
                delay: 1.5,
                ease: "back.out(1.7)"
            }
        );

        // Animate avatar
        const avatar = document.querySelector('.avatar-container');
        gsap.fromTo(avatar,
            { opacity: 0, scale: 0.5, rotation: -10 },
            { 
                opacity: 1, 
                scale: 1, 
                rotation: 0,
                duration: 1,
                delay: 1,
                ease: "elastic.out(1, 0.3)"
            }
        );
    }

    setupTypewriterEffect() {
        const typewriter = document.getElementById('typewriter');
        const texts = [
            'Full-Stack Developer',
            'UI/UX Designer',
            'Problem Solver',
            'Creative Thinker',
            'Tech Enthusiast'
        ];
        
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 150;

        const type = () => {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typewriter.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 75;
            } else {
                typewriter.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 150;
            }

            if (!isDeleting && charIndex === currentText.length) {
                setTimeout(() => { isDeleting = true; }, 1000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
            }

            setTimeout(type, typingSpeed);
        };

        // Start typewriter after loader
        setTimeout(() => {
            type();
        }, 3500);
    }

    setupScrollAnimations() {
        // Section reveal animations
        gsap.utils.toArray('.section').forEach((section, index) => {
            if (index === 0) return; // Skip home section
            
            gsap.fromTo(section,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%",
                        end: "bottom 20%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        // Section titles animation
        gsap.utils.toArray('.section-title').forEach(title => {
            gsap.fromTo(title,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: title,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        // Interest cards stagger animation
        const interestCards = document.querySelectorAll('.interest-card');
        gsap.fromTo(interestCards,
            { opacity: 0, y: 30, scale: 0.9 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.6,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: '.interests-grid',
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            }
        );

        // Timeline items animation
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach(item => {
            gsap.fromTo(item,
                { opacity: 0, x: -50 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: item,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        // Experience cards animation
        const experienceCards = document.querySelectorAll('.experience-card');
        experienceCards.forEach((card, index) => {
            const direction = index % 2 === 0 ? -100 : 100;
            
            gsap.fromTo(card,
                { opacity: 0, x: direction, rotationY: 45 },
                {
                    opacity: 1,
                    x: 0,
                    rotationY: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        // Project cards animation
        const projectCards = document.querySelectorAll('.project-card');
        gsap.fromTo(projectCards,
            { opacity: 0, y: 50, rotationX: 45, scale: 0.8 },
            {
                opacity: 1,
                y: 0,
                rotationX: 0,
                scale: 1,
                duration: 0.8,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: '.projects-grid',
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    }

    setupSkillBarAnimations() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            
            gsap.fromTo(bar,
                { width: '0%' },
                {
                    width: width + '%',
                    duration: 1.5,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: bar,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });
    }

    setupFloatingElements() {
        // Floating icons animation
        const floatingIcons = document.querySelectorAll('.floating-icon');
        
        floatingIcons.forEach((icon, index) => {
            const tl = gsap.timeline({ repeat: -1 });
            
            tl.to(icon, {
                y: -20,
                rotation: 360,
                duration: 3 + index * 0.5,
                ease: "power1.inOut"
            })
            .to(icon, {
                y: 0,
                rotation: 720,
                duration: 3 + index * 0.5,
                ease: "power1.inOut"
            });
        });

        // Avatar floating animation
        const avatar = document.querySelector('.avatar-img');
        if (avatar) {
            gsap.to(avatar, {
                y: -10,
                duration: 3,
                repeat: -1,
                yoyo: true,
                ease: "power1.inOut"
            });
        }

        // Avatar glow animation
        const avatarGlow = document.querySelector('.avatar-glow');
        if (avatarGlow) {
            gsap.to(avatarGlow, {
                scale: 1.1,
                opacity: 0.8,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: "power1.inOut"
            });
        }
    }

    setupParallaxEffects() {
        // Parallax for background elements
        gsap.utils.toArray('.floating-elements').forEach(element => {
            gsap.to(element, {
                y: -50,
                ease: "none",
                scrollTrigger: {
                    trigger: element,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });
        });

        // Navbar background blur on scroll
        ScrollTrigger.create({
            start: "top -80",
            end: 99999,
            toggleClass: { className: "scrolled", targets: ".navbar" }
        });
    }

    setupHoverAnimations() {
        // Button hover animations
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                gsap.to(btn, {
                    scale: 1.05,
                    y: -2,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
            
            btn.addEventListener('mouseleave', () => {
                gsap.to(btn, {
                    scale: 1,
                    y: 0,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        });

        // Project card hover animations
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    y: -10,
                    rotationX: 5,
                    rotationY: 5,
                    scale: 1.02,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
            
            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    y: 0,
                    rotationX: 0,
                    rotationY: 0,
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        });

        // Interest card hover animations
        const interestCards = document.querySelectorAll('.interest-card');
        interestCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    y: -5,
                    scale: 1.03,
                    duration: 0.3,
                    ease: "power2.out"
                });
                
                const icon = card.querySelector('i');
                if (icon) {
                    gsap.to(icon, {
                        scale: 1.2,
                        rotationY: 360,
                        duration: 0.5,
                        ease: "back.out(1.7)"
                    });
                }
            });
            
            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    y: 0,
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
                
                const icon = card.querySelector('i');
                if (icon) {
                    gsap.to(icon, {
                        scale: 1,
                        rotationY: 0,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                }
            });
        });

        // Tech tag hover animations
        const techTags = document.querySelectorAll('.tech-tag');
        techTags.forEach(tag => {
            tag.addEventListener('mouseenter', () => {
                gsap.to(tag, {
                    scale: 1.1,
                    duration: 0.2,
                    ease: "power2.out"
                });
            });
            
            tag.addEventListener('mouseleave', () => {
                gsap.to(tag, {
                    scale: 1,
                    duration: 0.2,
                    ease: "power2.out"
                });
            });
        });
    }

    // Page transition animation
    animatePageTransition(targetSection) {
        const tl = gsap.timeline();
        
        tl.to('.main-content', {
            opacity: 0,
            scale: 0.95,
            duration: 0.3,
            ease: "power2.inOut"
        })
        .to('.main-content', {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "power2.out"
        });
        
        return tl;
    }

    // Animate modal entry
    animateModalEntry(modal) {
        const tl = gsap.timeline();
        
        tl.fromTo(modal, 
            { opacity: 0 },
            { opacity: 1, duration: 0.3, ease: "power2.out" }
        )
        .fromTo(modal.querySelector('.modal-content'),
            { scale: 0.7, y: -50, opacity: 0 },
            { scale: 1, y: 0, opacity: 1, duration: 0.5, ease: "back.out(1.7)" },
            "-=0.1"
        );
        
        return tl;
    }

    // Animate modal exit
    animateModalExit(modal) {
        const tl = gsap.timeline();
        
        tl.to(modal.querySelector('.modal-content'), {
            scale: 0.7,
            y: -50,
            opacity: 0,
            duration: 0.3,
            ease: "power2.in"
        })
        .to(modal, {
            opacity: 0,
            duration: 0.2,
            ease: "power2.inOut"
        }, "-=0.1");
        
        return tl;
    }

    // Filter animation for projects
    animateProjectFilter(hideElements, showElements) {
        const tl = gsap.timeline();
        
        if (hideElements.length > 0) {
            tl.to(hideElements, {
                opacity: 0,
                scale: 0.8,
                y: 20,
                duration: 0.3,
                stagger: 0.05,
                ease: "power2.in"
            });
        }
        
        if (showElements.length > 0) {
            tl.fromTo(showElements,
                { opacity: 0, scale: 0.8, y: 20 },
                { 
                    opacity: 1, 
                    scale: 1, 
                    y: 0,
                    duration: 0.5,
                    stagger: 0.1,
                    ease: "back.out(1.7)"
                }
            );
        }
        
        return tl;
    }

    // Refresh ScrollTrigger
    refresh() {
        ScrollTrigger.refresh();
    }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.animationController = new AnimationController();
});