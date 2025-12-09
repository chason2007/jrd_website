/**
 * JR Dream - Main Website Functionality
 * Handles navigation interactions, mobile menu, and form submissions.
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Initialize Lucide Icons
    // Checks if the lucide library is loaded before running
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 2. Sticky Navbar Transition
    // Adds a shadow and compresses the padding when scrolling down
    const navbar = document.getElementById('navbar');

    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 10) {
                navbar.classList.add('shadow-md');
                // Optional: Adjust padding if classes exist (Tailwind specific)
                if (navbar.classList.contains('py-4')) {
                    navbar.classList.replace('py-4', 'py-2');
                }
            } else {
                navbar.classList.remove('shadow-md');
                if (navbar.classList.contains('py-2')) {
                    navbar.classList.replace('py-2', 'py-4');
                }
            }
        });
    }

    // 3. Mobile Menu Toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Close mobile menu when clicking any link inside it
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // 4. Contact Form Handling
    // Replaces the inline onsubmit attribute for cleaner separation of concerns
    const contactForm = document.querySelector('form');
    const successMsg = document.getElementById('success-msg');

    if (contactForm && successMsg) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Simulate form submission success
            successMsg.classList.remove('hidden');
            contactForm.reset();

            // Optional: Hide message after 5 seconds
            setTimeout(() => {
                successMsg.classList.add('hidden');
            }, 5000);
        });
    }

    // 5. Back to Top Button Logic
    const backToTopBtn = document.getElementById('back-to-top');

    if (backToTopBtn) {
        // Show/Hide button on scroll
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.remove('opacity-0', 'invisible', 'translate-y-4');
                backToTopBtn.classList.add('opacity-100', 'visible', 'translate-y-0');
            } else {
                backToTopBtn.classList.add('opacity-0', 'invisible', 'translate-y-4');
                backToTopBtn.classList.remove('opacity-100', 'visible', 'translate-y-0');
            }
        });

        // Scroll to top on click
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});