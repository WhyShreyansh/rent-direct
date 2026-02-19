// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    const icon = mobileMenuBtn.querySelector('i');
    if (mobileMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        mobileMenu.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Search Form Handler
const searchForm = document.querySelector('.search-form');
const searchBtn = document.querySelector('.btn-search');

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const city = document.getElementById('citySelect').value;
    const bhk = document.getElementById('bhkSelect').value;
    const budget = document.getElementById('budgetSelect').value;
    
    console.log('Search Parameters:', { city, bhk, budget });
    
    // Show alert for demo purposes
    alert(`Searching for properties:\nCity: ${city}\nBHK: ${bhk}\nBudget: ${budget}`);
    
    // In a real application, this would make an API call or redirect to search results
});

// Smooth Scroll for Navigation Links
const navLinks = document.querySelectorAll('a[href^="#"]');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            
            // Close mobile menu if open
            mobileMenu.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
});

// Scroll Animation Observer
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

// Observe all property cards and feature cards
document.querySelectorAll('.property-card, .feature-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Sticky Navigation
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
    } else {
        navbar.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Add hover effect to property images
const propertyImages = document.querySelectorAll('.property-image');

propertyImages.forEach(image => {
    image.addEventListener('mouseenter', () => {
        image.style.cursor = 'pointer';
    });
    
    image.addEventListener('click', () => {
        const propertyCard = image.closest('.property-card');
        const propertyTitle = propertyCard.querySelector('.property-title').textContent;
        alert(`Opening details for: ${propertyTitle}`);
    });
});

// Form Select Enhancement
const selects = document.querySelectorAll('select');

selects.forEach(select => {
    select.addEventListener('focus', function() {
        this.style.borderColor = '#3b82f6';
        this.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
    });
    
    select.addEventListener('blur', function() {
        this.style.borderColor = '#e2e8f0';
        this.style.boxShadow = 'none';
    });
});

// Add loading state to search button
searchBtn.addEventListener('click', function() {
    const originalText = this.innerHTML;
    this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Searching...';
    this.disabled = true;
    
    // Simulate search delay
    setTimeout(() => {
        this.innerHTML = originalText;
        this.disabled = false;
    }, 2000);
});

// View All Properties Handler
const viewAllLink = document.querySelector('.view-all');

if (viewAllLink) {
    viewAllLink.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Loading all properties...\n\nIn a real application, this would navigate to the properties listing page.');
    });
}

// Counter Animation for Statistics (if you want to add stats)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start).toLocaleString();
        }
    }, 16);
}

// Add active state to navigation based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add fade-in animation on page load
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});