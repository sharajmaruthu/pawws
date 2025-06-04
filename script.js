// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active Navigation Link on Scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Stories Carousel Functionality
const storiesCarousel = document.querySelector('.stories-carousel');
const storyCards = document.querySelectorAll('.story-card');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let currentStoryIndex = 0;

function showStory(index) {
    storyCards.forEach((card, i) => {
        card.classList.toggle('active', i === index);
    });
    
    const cardWidth = storyCards[0].offsetWidth + 30; // Include gap
    storiesCarousel.scrollTo({
        left: cardWidth * index,
        behavior: 'smooth'
    });
}

prevBtn.addEventListener('click', () => {
    currentStoryIndex = (currentStoryIndex - 1 + storyCards.length) % storyCards.length;
    showStory(currentStoryIndex);
});

nextBtn.addEventListener('click', () => {
    currentStoryIndex = (currentStoryIndex + 1) % storyCards.length;
    showStory(currentStoryIndex);
});

// Auto-rotate stories every 5 seconds
setInterval(() => {
    currentStoryIndex = (currentStoryIndex + 1) % storyCards.length;
    showStory(currentStoryIndex);
}, 5000);

// Volunteer Form Handling
const volunteerForm = document.getElementById('volunteerForm');

volunteerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = volunteerForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<span class="loading"></span> Joining...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Show success message
        showSuccessMessage('🎉 Welcome to the Pack! We\'ll contact you soon with volunteer opportunities.');
        
        // Reset form
        volunteerForm.reset();
        
    } catch (error) {
        console.error('Form submission error:', error);
        showSuccessMessage('❌ Something went wrong. Please try again or contact us directly.');
    } finally {
        // Restore button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
});

function showSuccessMessage(message) {
    // Remove existing success message if any
    const existingMessage = document.querySelector('.success-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create and show new success message
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message show';
    successDiv.textContent = message;
    
    volunteerForm.appendChild(successDiv);
    
    // Hide message after 5 seconds
    setTimeout(() => {
        successDiv.classList.remove('show');
        setTimeout(() => successDiv.remove(), 500);
    }, 5000);
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections for animation
document.querySelectorAll('.about-card, .contact-card, .option').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Floating Elements Animation Enhancement
const floatingElements = document.querySelectorAll('.floating-emoji');
floatingElements.forEach((element, index) => {
    element.addEventListener('mouseenter', () => {
        element.style.animation = 'none';
        element.style.transform = 'scale(1.5) rotate(15deg)';
    });
    
    element.addEventListener('mouseleave', () => {
        element.style.animation = `float 3s ease-in-out infinite ${index * 0.5}s`;
        element.style.transform = '';
    });
});

// Add some interactivity to the hero section
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    heroTitle.addEventListener('click', () => {
        // Create heart particles effect
        createHeartParticles(event.clientX, event.clientY);
    });
}

function createHeartParticles(x, y) {
    const hearts = ['❤️', '🐕', '🐾', '💝'];
    
    for (let i = 0; i < 6; i++) {
        const heart = document.createElement('div');
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.position = 'fixed';
        heart.style.left = x + 'px';
        heart.style.top = y + 'px';
        heart.style.fontSize = '1.5rem';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '9999';
        heart.style.animation = `heartFloat 2s ease-out forwards`;
        
        document.body.appendChild(heart);
        
        // Random direction
        const angle = (Math.PI * 2 * i) / 6;
        const distance = 100 + Math.random() * 50;
        const endX = x + Math.cos(angle) * distance;
        const endY = y + Math.sin(angle) * distance - 50;
        
        heart.style.setProperty('--endX', endX + 'px');
        heart.style.setProperty('--endY', endY + 'px');
        
        setTimeout(() => heart.remove(), 2000);
    }
}

// Add CSS for heart particles animation
const heartStyle = document.createElement('style');
heartStyle.textContent = `
    @keyframes heartFloat {
        0% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translate(var(--endX, 0), var(--endY, 0)) scale(0.5);
        }
    }
`;
document.head.appendChild(heartStyle);

// Console message for developers
console.log(`
🐾 Pet-Friendly City Campaign Website
Made with ❤️ for our four-legged friends

This project represents more than just code - it's a platform for real-world impact.
Every feature is designed to help street dogs and build stronger communities.

Developed by Sharaj MM
Ready to make a difference? Join us! 🌟
`);