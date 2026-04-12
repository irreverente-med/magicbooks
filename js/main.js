/**
 * Libros Únicos - JavaScript Logic
 * Handling WhatsApp redirection with pre-filled messages.
 */

const WHATSAPP_CONFIG = {
    phone: '573104613686',
    message: 'Hola, vengo de la página web. Me gustaría información sobre los libros personalizados.'
};

/**
 * Redirects the user to WhatsApp
 */
const redirectToWhatsApp = () => {
    const encodedMessage = encodeURIComponent(WHATSAPP_CONFIG.message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_CONFIG.phone}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
};

/**
 * Initializes the event listeners
 */
const initWhatsAppButtons = () => {
    const whatsappButtons = document.querySelectorAll('.btn-whatsapp');

    whatsappButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            redirectToWhatsApp();
        });
    });
};

/**
 * Initializes the Announcement Bar rotation
 */
const initAnnouncementBar = () => {
    const messages = document.querySelectorAll('.announcement-msg');
    if (messages.length < 2) return;

    let currentIndex = 0;

    setInterval(() => {
        const currentMessage = messages[currentIndex];

        currentIndex = (currentIndex + 1) % messages.length;
        const nextMessage = messages[currentIndex];

        // Assign exit class to current message
        currentMessage.classList.remove('active', 'enter-up');
        currentMessage.classList.add('exit-up');

        // Assign enter class to next message
        nextMessage.classList.remove('exit-up');
        nextMessage.classList.add('active', 'enter-up');

        // Clean up classes after animation finishes (800ms)
        setTimeout(() => {
            currentMessage.classList.remove('exit-up');
            nextMessage.classList.remove('enter-up');
        }, 800);
    }, 4000);
};

/**
 * Initializes the FAQ Accordion
 */
const initFAQ = () => {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');

        questionBtn.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Exclusive Open: Close all items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });

            // Open clicked item if it wasn't already open
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
};

/**
 * Initializes Mobile Navigation Toggle
 */
const initMobileMenu = () => {
    const hamburger = document.querySelector('.hamburger-menu');
    const navList = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!hamburger || !navList) return;

    // Toggle menu
    hamburger.addEventListener('click', () => {
        const isActive = hamburger.classList.contains('active');
        hamburger.classList.toggle('active');
        navList.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', !isActive);

        // Prevent body scrolling when menu is open
        document.body.style.overflowY = isActive ? '' : 'hidden';
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navList.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.style.overflowY = '';
        });
    });
};

/**
 * Initializes Scroll-Triggered Highlighting for the Trust Bar
 */
const initTrustBarScroll = () => {
    const trustItems = document.querySelectorAll('.trust-item');
    if (trustItems.length === 0) return;

    const observerOptions = {
        root: null,
        rootMargin: '-45% 0px -45% 0px',
        threshold: 1.0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-active');
            } else {
                entry.target.classList.remove('is-active');
            }
        });
    }, observerOptions);

    trustItems.forEach(item => {
        observer.observe(item);
    });
};

// Initialize on DOM Content Loaded
document.addEventListener('DOMContentLoaded', () => {
    initWhatsAppButtons();
    initAnnouncementBar();
    initFAQ();
    initMobileMenu();
    initTrustBarScroll();
    console.log('Libros Únicos - Initialized logic.');
});
