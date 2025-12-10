/**
 * JR Dream - Tailwind Configuration
 * Defines the custom color palette, fonts, and animations.
 */
tailwind.config = {
    theme: {
        extend: {
            colors: {
                brand: {
                    navy: '#2a2356',   /* Primary Dark Purple */
                    gold: '#f37840',   /* Accent Sunset Orange */
                    light: '#f8fafc',  /* Light Background */
                    accent: '#4c1d95'  /* Darker Purple Accent */
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                serif: ['Playfair Display', 'serif'],
            },
            animation: {
                'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
            },
            keyframes: {
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                }
            }
        }
    }
};
