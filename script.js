// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Optional: Add a simple animation when products scroll into view
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.product-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(card);
});

// Mobile Hamburger Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Close the mobile menu when a link is clicked
document.querySelectorAll('.nav-links li a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    });
});

// WhatsApp Ordering Logic
const orderModal = document.getElementById('orderModal');
const closeOrderModal = document.querySelector('.close-order-modal');
const orderModalTitle = document.getElementById('orderModalTitle');
const submitOrderBtn = document.getElementById('submitOrderBtn');
const orderGramsInput = document.getElementById('orderGrams');
let currentProduct = '';

// Open modal on Order button click
document.querySelectorAll('.btn-order').forEach(btn => {
    btn.addEventListener('click', function() {
        currentProduct = this.getAttribute('data-product');
        orderModalTitle.textContent = `Order ${currentProduct}`;
        orderGramsInput.value = ''; // Reset input
        orderModal.style.display = 'flex';
    });
});

// Close modal
if(closeOrderModal) {
    closeOrderModal.addEventListener('click', () => {
        orderModal.style.display = 'none';
    });
}

// Close modal if clicked outside
window.addEventListener('click', (e) => {
    if (e.target === orderModal) {
        orderModal.style.display = 'none';
    }
});

// Submit Order to WhatsApp
if(submitOrderBtn) {
    submitOrderBtn.addEventListener('click', () => {
        const grams = orderGramsInput.value;
        
        if(!grams || grams <= 0) {
            alert('Please enter a valid quantity in grams.');
            return;
        }
        
        // Construct WhatsApp Message
        const message = `Hi Sun Rooted! I would like to order ${grams} grams of ${currentProduct}.`;
        const encodedMessage = encodeURIComponent(message);
        const whatsappNumber = '+916300338664'; // From your updated link
        
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
        
        // Open WhatsApp in a new tab
        window.open(whatsappUrl, '_blank');
        
        // Close the modal
        orderModal.style.display = 'none';
    });
}
