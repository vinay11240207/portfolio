# 🚀 Stunning Animated Portfolio Website

A modern, fully responsive personal portfolio website featuring smooth animations, particle effects, and interactive elements. Built with vanilla HTML, CSS, and JavaScript using GSAP and AOS animation libraries.

## ✨ Features

### 🏠 Pages & Sections
- **Home Page**: Eye-catching intro with name reveal animation, typewriter effect, particle background, and floating avatar
- **About Me**: Photo animations, interactive timeline, and interest cards with hover effects
- **Resume**: Animated skill progress bars, downloadable resume with glow effects
- **Experience**: Timeline animation with job cards and smooth transitions
- **Projects**: Grid layout with category filters, hover animations, and detailed modal views

### 🎨 Design & Effects
- Dark theme with neon accent colors (cyan/blue/purple gradient)
- Smooth GSAP and AOS scroll animations
- Custom particle system background
- Interactive cursor with trail effects
- Loading screen with letter reveal animation
- Responsive design for all devices
- Theme toggle functionality
- Smooth page transitions

### 🛠️ Technical Features
- **Animations**: GSAP, ScrollTrigger, AOS
- **Particle System**: Custom canvas-based particle animation
- **Interactive Elements**: Custom cursor, hover effects, modal windows
- **Navigation**: Smooth scrolling, mobile hamburger menu, active section tracking
- **Responsive**: Mobile-first design with fluid breakpoints
- **Performance**: Optimized animations and lightweight code

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional but recommended)

### Installation
1. Clone or download this repository
2. Navigate to the project folder
3. Open `index.html` in your browser or serve via local server

### Local Server (Recommended)
```bash
# Using Python (if installed)
python -m http.server 8000

# Using Node.js (if installed)
npx serve .

# Using VS Code Live Server extension
Right-click index.html > Open with Live Server
```

## 🎛️ Customization

### Personal Information
Edit the following sections in `index.html`:

1. **Name & Title**: Update the name in the home section
```html
<span class="name">
    <span class="letter">Y</span>
    <span class="letter">o</span>
    <span class="letter">u</span>
    <span class="letter">r</span>
    <!-- Add more letters for your name -->
</span>
```

2. **Profile Images**: Replace placeholder images
```html
<!-- Home avatar -->
<img src="path/to/your/photo.jpg" alt="Profile" class="avatar-img">

<!-- About section photo -->
<img src="path/to/your/about-photo.jpg" alt="About Me">
```

3. **Skills**: Update skill percentages in `js/app.js`
```javascript
// Find the skill-progress elements and update data-width attributes
<div class="skill-progress" data-width="95"></div> <!-- Update percentage -->
```

4. **Experience**: Modify experience data in HTML
```html
<div class="experience-header">
    <h3>Your Job Title</h3>
    <p class="company">Your Company</p>
    <p class="duration">Your Duration</p>
</div>
```

5. **Projects**: Update project data in `js/app.js`
```javascript
// Find getProjectData() method and update with your projects
{
    title: "Your Project Title",
    description: "Your project description...",
    image: "path/to/project-image.jpg",
    github: "https://github.com/yourname/project",
    // ... more project data
}
```

### Color Customization
Edit CSS variables in `css/style.css`:
```css
:root {
    --accent-primary: #00d4ff;     /* Primary accent color */
    --accent-secondary: #b967db;   /* Secondary accent color */
    --bg-primary: #0a0a0f;         /* Main background */
    --bg-secondary: #1a1a2e;       /* Secondary background */
    /* Update other colors as needed */
}
```

### Animation Customization
Modify animations in `js/animations.js`:
```javascript
// Adjust timing, easing, and effects
gsap.fromTo(element, 
    { /* initial state */ },
    { 
        /* final state */
        duration: 0.8,        // Animation duration
        delay: 0.2,           // Start delay
        ease: "power2.out"    // Easing function
    }
);
```

## 📁 Project Structure

```
portfolio/
├── index.html              # Main HTML file
├── css/
│   └── style.css          # All styles and responsive design
├── js/
│   ├── particles.js       # Particle system and background effects
│   ├── animations.js      # GSAP and AOS animation controls
│   └── app.js            # Main application logic and interactions
├── assets/
│   └── images/           # Your images and media files
└── README.md             # This file
```

## 🎯 Key Components

### Particle System
- Interactive particle background
- Mouse interaction effects
- Smooth particle connections
- Customizable particle count and behavior

### Animation System
- GSAP-powered smooth animations
- Scroll-triggered animations with ScrollTrigger
- AOS (Animate On Scroll) integration
- Custom hover and interaction effects

### Navigation
- Smooth scrolling between sections
- Active section highlighting
- Mobile-responsive hamburger menu
- Keyboard navigation support

### Project Showcase
- Category filtering with smooth transitions
- Modal windows with project details
- Hover effects and 3D transforms
- Responsive grid layout

## 🔧 Browser Support
- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## 📱 Responsive Breakpoints
- Desktop: 1200px+
- Tablet: 768px - 1199px
- Mobile: 320px - 767px

## 🎨 Included Animations
- ✅ Loading screen with letter reveal
- ✅ Typewriter effect for job titles
- ✅ Smooth scroll animations
- ✅ Skill bar progress animations
- ✅ Hover effects on all interactive elements
- ✅ Modal slide-in/out animations
- ✅ Project filter transitions
- ✅ Floating element animations
- ✅ Custom cursor with trail
- ✅ Theme toggle transitions

## 🚀 Performance Tips
1. Optimize images (use WebP format when possible)
2. Enable gzip compression on your server
3. Consider lazy loading for images
4. Minimize and compress CSS/JS for production

## 📄 License
This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing
Feel free to fork this project and customize it for your own use. If you create something cool, I'd love to see it!

## 📞 Contact
- Email: your.email@example.com
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)
- GitHub: [Your GitHub](https://github.com/yourusername)

---

**Built with ❤️ using HTML, CSS, JavaScript, GSAP, and lots of coffee ☕**