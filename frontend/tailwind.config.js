import typography from '@tailwindcss/typography';
import containerQueries from '@tailwindcss/container-queries';
import animate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: ['index.html', 'src/**/*.{js,ts,jsx,tsx,html,css}'],
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px'
            }
        },
        extend: {
            colors: {
                border: 'oklch(var(--border))',
                input: 'oklch(var(--input))',
                ring: 'oklch(var(--ring) / <alpha-value>)',
                background: 'oklch(var(--background))',
                foreground: 'oklch(var(--foreground))',
                primary: {
                    DEFAULT: 'oklch(var(--primary) / <alpha-value>)',
                    foreground: 'oklch(var(--primary-foreground))'
                },
                secondary: {
                    DEFAULT: 'oklch(var(--secondary) / <alpha-value>)',
                    foreground: 'oklch(var(--secondary-foreground))'
                },
                destructive: {
                    DEFAULT: 'oklch(var(--destructive) / <alpha-value>)',
                    foreground: 'oklch(var(--destructive-foreground))'
                },
                muted: {
                    DEFAULT: 'oklch(var(--muted) / <alpha-value>)',
                    foreground: 'oklch(var(--muted-foreground) / <alpha-value>)'
                },
                accent: {
                    DEFAULT: 'oklch(var(--accent) / <alpha-value>)',
                    foreground: 'oklch(var(--accent-foreground))'
                },
                popover: {
                    DEFAULT: 'oklch(var(--popover))',
                    foreground: 'oklch(var(--popover-foreground))'
                },
                card: {
                    DEFAULT: 'oklch(var(--card))',
                    foreground: 'oklch(var(--card-foreground))'
                },
                chart: {
                    1: 'oklch(var(--chart-1))',
                    2: 'oklch(var(--chart-2))',
                    3: 'oklch(var(--chart-3))',
                    4: 'oklch(var(--chart-4))',
                    5: 'oklch(var(--chart-5))'
                },
                sidebar: {
                    DEFAULT: 'oklch(var(--sidebar))',
                    foreground: 'oklch(var(--sidebar-foreground))',
                    primary: 'oklch(var(--sidebar-primary))',
                    'primary-foreground': 'oklch(var(--sidebar-primary-foreground))',
                    accent: 'oklch(var(--sidebar-accent))',
                    'accent-foreground': 'oklch(var(--sidebar-accent-foreground))',
                    border: 'oklch(var(--sidebar-border))',
                    ring: 'oklch(var(--sidebar-ring))'
                },
                holi: {
                    magenta: 'oklch(var(--holi-magenta))',
                    pink: 'oklch(var(--holi-pink))',
                    yellow: 'oklch(var(--holi-yellow))',
                    blue: 'oklch(var(--holi-blue))',
                    green: 'oklch(var(--holi-green))',
                    orange: 'oklch(var(--holi-orange))'
                }
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            },
            boxShadow: {
                xs: '0 1px 2px 0 rgba(0,0,0,0.05)',
                'holi-splash': '0 4px 20px rgba(236, 72, 153, 0.3), 0 2px 10px rgba(250, 204, 21, 0.2), 0 1px 5px rgba(59, 130, 246, 0.2)',
                'holi-glow': '0 0 30px rgba(236, 72, 153, 0.4), 0 0 15px rgba(250, 204, 21, 0.3)'
            },
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' }
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' }
                },
                'color-splash': {
                    '0%': { transform: 'scale(0) rotate(0deg)', opacity: '0' },
                    '50%': { transform: 'scale(1.2) rotate(180deg)', opacity: '1' },
                    '100%': { transform: 'scale(1) rotate(360deg)', opacity: '0.8' }
                },
                'powder-burst': {
                    '0%': { transform: 'scale(0.8) translateY(0)', opacity: '1' },
                    '50%': { transform: 'scale(1.5) translateY(-20px)', opacity: '0.6' },
                    '100%': { transform: 'scale(2) translateY(-40px)', opacity: '0' }
                },
                'color-float': {
                    '0%, 100%': { transform: 'translateY(0px) rotate(0deg)', opacity: '0.8' },
                    '50%': { transform: 'translateY(-15px) rotate(180deg)', opacity: '1' }
                },
                'splash-wave': {
                    '0%, 100%': { transform: 'scale(1) rotate(0deg)' },
                    '50%': { transform: 'scale(1.1) rotate(5deg)' }
                }
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                'color-splash': 'color-splash 3s ease-in-out infinite',
                'powder-burst': 'powder-burst 2s ease-out infinite',
                'color-float': 'color-float 4s ease-in-out infinite',
                'splash-wave': 'splash-wave 3s ease-in-out infinite'
            }
        }
    },
    plugins: [typography, containerQueries, animate]
};
