// Wedding Invitation JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation
    initMobileNav();
    
    // Countdown timer
    initCountdown();
    
    // RSVP form
    initRSVPForm(); 
    
    // Scroll animations
    initScrollAnimations();
    
    // Smooth scrolling for navigation
    initSmoothScrolling();
});

// Mobile Navigation
function initMobileNav() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// Countdown Timer
function initCountdown() {
    // Set your wedding date here (YYYY-MM-DD HH:MM)
    // Change this to your actual wedding date and time
    const weddingDate = new Date('2025-09-20T14:00:00').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const difference = weddingDate - now;
        
        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);
            
            // Update the countdown display
            const daysElement = document.getElementById('days');
            const hoursElement = document.getElementById('hours');
            const minutesElement = document.getElementById('minutes');
            const secondsElement = document.getElementById('seconds');
            
            if (daysElement) daysElement.textContent = days.toString().padStart(2, '0');
            if (hoursElement) hoursElement.textContent = hours.toString().padStart(2, '0');
            if (minutesElement) minutesElement.textContent = minutes.toString().padStart(2, '0');
            if (secondsElement) secondsElement.textContent = seconds.toString().padStart(2, '0');
            
            // Update countdown message based on time remaining
            const countdownMessage = document.querySelector('.countdown-message');
            if (countdownMessage) {
                if (days === 0 && hours < 24) {
                    countdownMessage.textContent = 'Less than 24 hours to go! 💕';
                } else if (days === 1) {
                    countdownMessage.textContent = 'Just one more day! 💕';
                } else {
                    countdownMessage.textContent = 'We can\'t wait to celebrate with you! 💕';
                }
            }
        } else {
            // Wedding day has arrived!
            const daysElement = document.getElementById('days');
            const hoursElement = document.getElementById('hours');
            const minutesElement = document.getElementById('minutes');
            const secondsElement = document.getElementById('seconds');
            
            if (daysElement) daysElement.textContent = '00';
            if (hoursElement) hoursElement.textContent = '00';
            if (minutesElement) minutesElement.textContent = '00';
            if (secondsElement) secondsElement.textContent = '00';
            
            const countdownMessage = document.querySelector('.countdown-message');
            if (countdownMessage) {
                countdownMessage.textContent = 'Today is the big day! 🎉';
            }
        }
    }
    
    // Update immediately and then every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// RSVP Form
function initRSVPForm() {
    const form = document.getElementById('rsvp-form');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            attendance: document.getElementById('attendance').value
        };
        
        // Validate form
        if (!formData.name || !formData.email || !formData.attendance) {
            alert('Please fill in all fields');
            return;
        }
        
        // Submit to Google Form
        submitToGoogleForm(formData);
    });
}

// Submit to Google Form using image method (bypasses CSP restrictions)
function submitToGoogleForm(formData) {
    // Create the form data URL
    const formUrl = 'https://docs.google.com/forms/d/1tajn59wio6e5B59-J4cyuelg_SpxaCGKo8_8F6zl8t4/formResponse';
    const formDataString = `entry.1113962632=${encodeURIComponent(formData.name)}&entry.1257516428=${encodeURIComponent(formData.email)}&entry.1335481464=${encodeURIComponent(formData.attendance)}&submit=Submit`;
    
    // Create a hidden image to submit the form (bypasses CSP)
    const img = document.createElement('img');
    img.style.display = 'none';
    img.onload = function() {
        console.log('Form submitted successfully to Google Forms');
    };
    img.onerror = function() {
        console.log('Form submission completed (Google Forms may not return a response)');
    };
    
    // Submit via image request
    img.src = `${formUrl}?${formDataString}`;
    document.body.appendChild(img);
    
    // Remove the image after submission
    setTimeout(() => {
        if (document.body.contains(img)) document.body.removeChild(img);
    }, 2000);
    
    // Show success message immediately
    showSuccessModal(formData.name);
    
    // Reset form
    document.getElementById('rsvp-form').reset();
    
    // Store locally for backup
    storeLocally(formData);
    
    // Log for debugging
    console.log('Form submitted with data:', formData);
}

// Store RSVP data locally as backup
function storeLocally(formData) {
    let rsvps = JSON.parse(localStorage.getItem('weddingRSVPs') || '[]');
    rsvps.push({
        ...formData,
        timestamp: new Date().toISOString()
    });
    localStorage.setItem('weddingRSVPs', JSON.stringify(rsvps));
    
    // Log for testing
    console.log('RSVP stored locally:', formData);
    console.log('All stored RSVPs:', rsvps);
}

// Function to view stored RSVPs (for testing)
function viewStoredRSVPs() {
    const rsvps = JSON.parse(localStorage.getItem('weddingRSVPs') || '[]');
    console.log('All stored RSVPs:', rsvps);
    alert(`Stored RSVPs: ${rsvps.length}\nCheck console for details.`);
}

// Success Modal
function showSuccessModal(name) {
    const modal = document.getElementById('success-modal');
    const message = document.getElementById('success-message');
    
    message.textContent = `Thank you ${name}! We've received your response.`;
    modal.classList.remove('hidden');
}

function closeModal() {
    const modal = document.getElementById('success-modal');
    modal.classList.add('hidden');
}

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    const modal = document.getElementById('success-modal');
    if (e.target === modal) {
        closeModal();
    }
});

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate
    document.querySelectorAll('.section-header, .gallery-item, .schedule-item, .time-unit').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
}

// Smooth Scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
}

// Utility function for smooth scrolling
function scrollToSection(sectionId) {
    const target = document.getElementById(sectionId);
    if (target) {
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.9)';
        navbar.style.boxShadow = 'none';
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add floating animation to hearts
document.querySelectorAll('.heart').forEach((heart, index) => {
    heart.style.animationDelay = `${index * 0.5}s`;
});

// Gallery image lazy loading
function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
initLazyLoading();