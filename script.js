/**
 * JR Dream - Main Website Functionality
 * Handles layout injection, navigation interactions, mobile menu, and form submissions.
 */

document.addEventListener('DOMContentLoaded', () => {

    // 0. Inject Layout (Header & Footer)
    injectLayout();

    // 1. Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 2. Sticky Navbar Transition
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 10) {
                navbar.classList.add('shadow-md');
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

        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // 4. Contact Form Handling
    // Attach event listener to forms with specific handling if needed
    // (Note: register.html forms handle their own submission via inline onclick for now, 
    // but we can target the main contact form here)
    const contactForm = document.querySelector('section#contact form');
    const successMsg = document.getElementById('success-msg');

    if (contactForm && successMsg) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            successMsg.classList.remove('hidden');
            contactForm.reset();
            setTimeout(() => {
                successMsg.classList.add('hidden');
            }, 5000);
        });
    }

    // 5. Back to Top Button Logic
    const backToTopBtn = document.getElementById('back-to-top');

    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.remove('opacity-0', 'invisible', 'translate-y-4');
                backToTopBtn.classList.add('opacity-100', 'visible', 'translate-y-0');
            } else {
                backToTopBtn.classList.add('opacity-0', 'invisible', 'translate-y-4');
                backToTopBtn.classList.remove('opacity-100', 'visible', 'translate-y-0');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

/**
 * Injects the Navigation Bar and Footer into the DOM.
 */
function injectLayout() {
    const path = globalThis.location.pathname;
    const isMainPage = path.endsWith('main.html') || path.endsWith('/') || path.endsWith('index.html');
    const isAdminPage = path.includes('admin-login.html');
    const isLoginPage = path.includes('login.html') && !isAdminPage;

    // Helper to get correct link path
    const getLink = (hash) => isMainPage ? hash : `main.html${hash}`;

    // Login/Admin Link Logic
    let desktopAuthHTML = `<a href="login.html" class="hidden md:block text-sm font-medium text-brand-navy hover:text-brand-gold">Login</a>`;
    let mobileAuthHTML = `<a href="login.html" class="block w-full text-center px-4 py-3 text-slate-500 text-sm mt-2">Login</a>`;

    if (isLoginPage) {
        desktopAuthHTML = `<span class="hidden md:block text-sm font-bold text-brand-navy border-b-2 border-brand-gold">Login</span>`;
        mobileAuthHTML = `<span class="block w-full text-center px-4 py-3 text-brand-navy font-bold text-sm mt-2 bg-slate-50">Login</span>`;
    } else if (isAdminPage) {
        desktopAuthHTML = `<span class="hidden md:block text-sm font-bold text-brand-navy border-b-2 border-brand-gold">Admin Portal</span>`;
        mobileAuthHTML = `<span class="block w-full text-center px-4 py-3 text-brand-navy font-bold text-sm mt-2 bg-slate-50">Admin Portal</span>`;
    }

    // --- Navbar Template ---
    const navbarHTML = `
    <nav class="fixed w-full z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all duration-300" id="navbar">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-20">
                <!-- Brand Logo -->
                <a href="main.html" class="flex-shrink-0 flex items-center gap-2">
                    <div class="w-[72px] h-[72px] rounded-sm flex items-center justify-center text-brand-gold font-serif font-bold text-xl">
                        <img src="logo.png" alt="logo">
                    </div>
                </a>

                <!-- Desktop Links -->
                <div class="hidden md:flex items-center space-x-8">
                    <a href="${getLink('#about')}" class="text-sm font-medium text-slate-600 hover:text-brand-navy hover:font-bold transition-all">About Us</a>
                    <a href="${getLink('#services')}" class="text-sm font-medium text-slate-600 hover:text-brand-navy hover:font-bold transition-all">Services</a>
                    <a href="${getLink('#team')}" class="text-sm font-medium text-slate-600 hover:text-brand-navy hover:font-bold transition-all">Our Team</a>
                    <a href="${getLink('#contact')}" class="text-sm font-medium text-slate-600 hover:text-brand-navy hover:font-bold transition-all">Contact</a>
                </div>

                <!-- Right Side Actions -->
                <div class="flex items-center gap-4">
                    ${desktopAuthHTML}
                    <a href="${getLink('#contact')}" class="hidden md:inline-flex items-center justify-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-sm text-white bg-brand-navy hover:bg-brand-accent transition-all shadow-lg shadow-brand-navy/20">
                        Get a Consultation
                    </a>
                    <!-- Mobile Menu Button -->
                    <button id="mobile-menu-btn" class="md:hidden text-slate-600 hover:text-brand-navy p-2">
                        <i data-lucide="menu" class="w-6 h-6"></i>
                    </button>
                </div>
            </div>
        </div>

        <!-- Mobile Menu Dropdown -->
        <div id="mobile-menu" class="hidden md:hidden bg-white border-t border-slate-100">
            <div class="px-4 pt-2 pb-6 space-y-1">
                <a href="${getLink('#about')}" class="block px-3 py-3 text-base font-medium text-slate-600 hover:text-brand-navy hover:font-bold hover:bg-slate-50 rounded-md">About Us</a>
                <a href="${getLink('#services')}" class="block px-3 py-3 text-base font-medium text-slate-600 hover:text-brand-navy hover:font-bold hover:bg-slate-50 rounded-md">Services</a>
                <a href="${getLink('#team')}" class="block px-3 py-3 text-base font-medium text-slate-600 hover:text-brand-navy hover:font-bold hover:bg-slate-50 rounded-md">Our Team</a>
                <a href="${getLink('#contact')}" class="block px-3 py-3 text-base font-medium text-slate-600 hover:text-brand-navy hover:font-bold hover:bg-slate-50 rounded-md">Contact</a>
                <div class="pt-4 border-t border-slate-100 mt-2">
                    <a href="${getLink('#contact')}" class="block w-full text-center px-4 py-3 bg-brand-navy text-white rounded-sm font-medium">Get a Consultation</a>
                    ${mobileAuthHTML}
                </div>
            </div>
        </div>
    </nav>
    `;

    // --- Footer Template ---
    const footerHTML = `
    <footer class="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid md:grid-cols-4 gap-8 mb-8">
                <div class="col-span-1 md:col-span-2">
                    <div class="flex items-center gap-2 mb-4">
                        <div class="w-8 h-8 bg-slate-800 rounded-sm flex items-center justify-center text-brand-gold font-serif font-bold text-lg border border-slate-700">
                            <img src="logo.png" style="background-color: white;" alt="Logo" class="w-full h-full object-contain">
                        </div>
                        <span class="text-xl font-bold text-white">JRDream</span>
                    </div>
                    <p class="text-sm max-w-xs mb-4">
                        Redefining property and facilities management consulting in the modern UAE business landscape.
                    </p>
                </div>
                <div class="md:col-start-4">
                    <h5 class="text-white font-semibold mb-4">Quick Links</h5>
                    <ul class="space-y-2 text-sm">
                        <li><a href="${getLink('#about')}" class="hover:text-brand-gold transition-colors">About Us</a></li>
                        <li><a href="${getLink('#services')}" class="hover:text-brand-gold transition-colors">Services</a></li>
                        <li><a href="${getLink('#team')}" class="hover:text-brand-gold transition-colors">Leadership</a></li>
                    </ul>
                </div>
            </div>
            <div class="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                <p class="text-xs">&copy; 2024 JR Dream Property & Asset Management Consultancy. All Rights Reserved.</p>
                <div class="flex gap-4">
                    <a href="https://www.linkedin.com/company/jr-dream/" target="_blank" class="text-slate-400 hover:text-white transition-colors"><i data-lucide="linkedin" class="w-5 h-5"></i></a>
                </div>
            </div>
        </div>
    </footer>
    `;

    // --- Back to Top Template ---
    const backToTopHTML = `
    <button id="back-to-top" class="fixed bottom-8 right-8 bg-brand-gold text-white p-3 rounded-full shadow-lg hover:bg-orange-600 transition-all opacity-0 invisible translate-y-4 z-50 group">
        <i data-lucide="arrow-up" class="w-6 h-6 group-hover:-translate-y-1 transition-transform"></i>
    </button>
    `;

    // Inject into placeholders
    const navbarContainer = document.getElementById('app-navbar');
    if (navbarContainer) navbarContainer.innerHTML = navbarHTML;

    const footerContainer = document.getElementById('app-footer');
    if (footerContainer) footerContainer.innerHTML = footerHTML;

    // Inject Back to Top at end of body if not present
    if (!document.getElementById('back-to-top')) {
        document.body.insertAdjacentHTML('beforeend', backToTopHTML);
    }
}
