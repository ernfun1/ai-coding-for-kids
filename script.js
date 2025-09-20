// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.feature-card, .workshop-card, .about-content > div');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});

// Add loading animation to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        // Don't add loading for demo links or external links
        if (this.href && (this.href.includes('#') || this.href.includes('.html'))) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.height, rect.width);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                background-color: rgba(255, 255, 255, 0.5);
                left: ${x}px;
                top: ${y}px;
                width: ${size}px;
                height: ${size}px;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        }
    });
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-card');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.2 + (index * 0.1);
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// Add typing animation to hero title
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.innerText;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 30);
        }, 1000);
    }
});

// Add hover effect to feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add progressive image loading
function loadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize progressive loading
document.addEventListener('DOMContentLoaded', loadImages);

// Add scroll progress indicator
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / scrollHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Initialize scroll progress
document.addEventListener('DOMContentLoaded', createScrollProgress);

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
    
    // Enter key on focused buttons
    if (e.key === 'Enter' && document.activeElement.classList.contains('btn')) {
        document.activeElement.click();
    }
});

// Add focus indicators for accessibility
document.querySelectorAll('.btn, .nav-link').forEach(element => {
    element.addEventListener('focus', function() {
        this.style.outline = '2px solid var(--primary-color)';
        this.style.outlineOffset = '2px';
    });
    
    element.addEventListener('blur', function() {
        this.style.outline = 'none';
    });
});

// Performance monitoring
function logPerformance() {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page Load Time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
            console.log('DOM Content Loaded:', perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart, 'ms');
        }, 0);
    });
}

// Initialize performance monitoring (only in development)
if (window.location.hostname === 'localhost') {
    logPerformance();
}

// Service Worker registration for PWA capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Tech Modal Functionality
const techData = {
    vibe: {
        icon: 'fas fa-user-graduate',
        title: 'Vibe Coding - Inspired by Andrej Karpathy',
        description: 'Meet the legend who makes AI education cool! Andrej Karpathy is a Slovak-Canadian computer scientist who co-founded OpenAI, directed AI at Tesla, and created Stanford\'s most popular deep learning course. In 2024, he started Eureka Labs to revolutionize AI education with his "Zero to Hero" series. His approach? Make complex AI concepts so clear and engaging that anyone can learn them. He proves that the best way to learn coding is to vibe with it - understanding the joy and creativity behind every line of code!',
        features: [
            'Co-founded OpenAI and directed AI development at Tesla',
            'Created Stanford\'s CS231n - the most popular deep learning course ever',
            'Makes complex AI concepts accessible through engaging teaching',
            'Named one of Time Magazine\'s 100 Most Influential People in AI (2024)',
            'Proves that learning to code should be fun, creative, and inspiring'
        ],
        example: '"The best way to learn deep learning is to get your hands dirty and build things. Don\'t just read about it - code it, break it, fix it, and make it your own!" - Andrej Karpathy Philosophy'
    },
    html: {
        icon: 'fab fa-html5',
        title: 'HTML - The Skeleton',
        description: 'Think of HTML like the skeleton of a house! It creates the basic structure of every webpage you\'ve ever visited. Just like how a house needs walls, rooms, and doors, websites need headings, paragraphs, and buttons. HTML tells the browser "put a title here" and "add a picture there" - it\'s like giving instructions to build your digital creation!',
        features: [
            'Creates the structure and layout of web pages',
            'Works like building blocks - stack elements to create anything',
            'Easy to learn - it reads almost like regular English',
            'Powers every website on the internet, from TikTok to YouTube'
        ],
        example: '&lt;h1&gt;Welcome to My Awesome Website!&lt;/h1&gt;\n&lt;p&gt;This is a paragraph where I can write anything.&lt;/p&gt;\n&lt;button&gt;Click Me!&lt;/button&gt;'
    },
    css: {
        icon: 'fab fa-css3-alt',
        title: 'CSS - The Artist',
        description: 'If HTML is the skeleton, then CSS is the fashion designer! CSS makes websites look amazing with colors, animations, and cool effects. It\'s like having a magic paintbrush that can make text rainbow-colored, add hover effects, or make elements dance across the screen. Every beautiful website you love got its style from CSS!',
        features: [
            'Makes websites beautiful with colors, fonts, and layouts',
            'Creates animations and interactive hover effects',
            'Responsive design - makes sites look great on phones and computers',
            'Turn a boring webpage into something Instagram-worthy'
        ],
        example: '.my-button {\n  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);\n  border-radius: 25px;\n  color: white;\n  transform: scale(1.1) when hovering;\n}'
    },
    javascript: {
        icon: 'fab fa-js-square',
        title: 'JavaScript - The Brain',
        description: 'JavaScript is like the brain that makes websites smart and interactive! While HTML builds and CSS decorates, JavaScript makes things happen. Want a quiz that calculates your results? A button that responds when clicked? JavaScript is your superhero! It\'s the same language used to build apps like Discord, Spotify, and even smartphone apps.',
        features: [
            'Makes websites interactive and responsive to user actions',
            'Powers modern web apps like Netflix, Instagram, and Discord',
            'Can create games, quizzes, and dynamic content',
            'Opens doors to mobile app development and even AI programming'
        ],
        example: 'function calculateQuizResult(answers) {\n  let score = answers.filter(answer => answer === "A").length;\n  if (score > 3) return "You\'re an Organizer!";\n  return "You\'re creative and spontaneous!";\n}'
    },
    ai: {
        icon: 'fas fa-robot',
        title: 'Claude AI - Your Coding Buddy',
        description: 'Meet Claude, your AI coding assistant! Think of Claude like having a super-smart friend who knows everything about programming and never gets tired of helping you. You can ask Claude to write code, explain confusing parts, fix bugs, or even help you brainstorm cool project ideas. It\'s like having a coding mentor available 24/7 who speaks your language!',
        features: [
            'Writes code for you when you describe what you want',
            'Explains complex programming concepts in simple terms',
            'Helps debug and fix problems in your code',
            'Never judges your questions - perfect for learning and experimenting'
        ],
        example: 'You: "Create a button that changes color when clicked"\n\nClaude: "Here\'s the HTML, CSS, and JavaScript code to make that happen, plus an explanation of how it works!"'
    }
};

// Initialize tech modal functionality
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('techModal');
    const closeBtn = document.querySelector('.close-modal');
    const techItems = document.querySelectorAll('.tech-item.clickable');
    
    // Add click event to each tech item
    techItems.forEach(item => {
        item.addEventListener('click', () => {
            const tech = item.getAttribute('data-tech');
            showTechModal(tech);
        });
    });
    
    // Close modal when clicking X
    closeBtn.addEventListener('click', closeTechModal);
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeTechModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeTechModal();
        }
    });
});

function showTechModal(tech) {
    const modal = document.getElementById('techModal');
    const data = techData[tech];
    
    if (!data) return;
    
    // Update modal content
    document.getElementById('modalIcon').className = `modal-icon ${data.icon}`;
    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalDescription').textContent = data.description;
    
    // Update features list
    const featuresList = document.getElementById('modalFeatures');
    featuresList.innerHTML = '';
    data.features.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        featuresList.appendChild(li);
    });
    
    // Update example
    document.getElementById('modalExample').innerHTML = data.example;
    
    // Show modal
    modal.style.display = 'block';
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
}

function closeTechModal() {
    const modal = document.getElementById('techModal');
    modal.style.display = 'none';
    
    // Restore body scroll
    document.body.style.overflow = 'auto';
}
