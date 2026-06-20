import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1.25rem', lg: '2rem' },
      screens: { '2xl': '1200px' },
    },
    extend: {
      colors: {
        // RUDN brand blue (taken from the official logo: #417DB7)
        brand: {
          50: '#eef5fb',
          100: '#d6e6f4',
          200: '#aecde9',
          300: '#7fb0db',
          400: '#5b97cd',
          500: '#417db7', // primary accent — matches logo_new.svg
          600: '#356596',
          700: '#2c5078',
          800: '#243f5f',
          900: '#1d3149',
        },
        // Neutral dark-slate scale used for TEXT only. The theme is white +
        // #417DB7; there are no dark-navy backgrounds anymore.
        navy: {
          50: '#f3f5f8',
          500: '#4b5563', // secondary text
          700: '#222831', // primary text / headings
          800: '#1a1e25',
          900: '#14171d',
        },
        accent: {
          500: '#7fb0db',
          600: '#417db7',
        },
        ink: '#262b33', // dark slate body text (readable, not blue)
        muted: '#5b6573',
        line: '#e6ecf3', // light cool hairline
        paper: '#f2f7fc', // very light blue section background (brand-tinted)
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
      },
      borderRadius: {
        xl: '0.875rem',
        '2xl': '1.25rem',
      },
      boxShadow: {
        card: '0 1px 2px rgba(16,24,40,.04), 0 8px 24px rgba(16,24,40,.06)',
        'card-hover': '0 2px 4px rgba(16,24,40,.06), 0 16px 40px rgba(16,24,40,.1)',
      },
      maxWidth: {
        prose: '70ch',
      },
    },
  },
  plugins: [],
};

export default config;
