/**
 * Libros Únicos - JavaScript Logic
 * Handling WhatsApp redirection with pre-filled messages.
 */

const WHATSAPP_CONFIG = {
    phone: '573000000000',
    message: 'Hola, vengo de la página web. Me gustaría información sobre los libros personalizados y el pago contraentrega.'
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
        messages[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % messages.length;
        messages[currentIndex].classList.add('active');
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

// Initialize on DOM Content Loaded
document.addEventListener('DOMContentLoaded', () => {
    initWhatsAppButtons();
    initAnnouncementBar();
    initFAQ();
    console.log('Libros Únicos - Initialized logic.');
});
