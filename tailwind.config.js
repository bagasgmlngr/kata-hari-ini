/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
      './pages/**/*.{js,ts,jsx,tsx,mdx}',
      './component/**/*.{js,ts,jsx,tsx,mdx}',
      './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {
        fontFamily: {
          sans: ['var(--font-nunito)'],
          serif: ['var(--font-playfair)'],
        },
        colors: {
          background: 'rgb(var(--background) / <alpha-value>)',
          foreground: 'rgb(var(--foreground) / <alpha-value>)',
        },
        typography: (theme) => ({
          DEFAULT: {
            css: {
              color: 'rgb(var(--foreground) / 1)',
              a: {
                color: 'rgb(var(--primary) / 1)',
                '&:hover': {
                  color: theme('colors.indigo.600'),
                },
              },
              h1: {
                color: 'rgb(var(--foreground) / 1)',
              },
              h2: {
                color: 'rgb(var(--foreground) / 1)',
              },
              h3: {
                color: 'rgb(var(--foreground) / 1)',
              },
              blockquote: {
                borderLeftColor: theme('colors.indigo.300'),
                color: theme('colors.indigo.800'),
              },
            },
          },
          dark: {
            css: {
              color: 'rgb(var(--foreground) / 1)',
              a: {
                color: 'rgb(var(--primary) / 1)',
                '&:hover': {
                  color: theme('colors.indigo.400'),
                },
              },
              h1: {
                color: 'rgb(var(--foreground) / 1)',
              },
              h2: {
                color: 'rgb(var(--foreground) / 1)',
              },
              h3: {
                color: 'rgb(var(--foreground) / 1)',
              },
              blockquote: {
                borderLeftColor: theme('colors.indigo.700'),
                color: theme('colors.indigo.400'),
              },
            },
          },
        }),
      },
    },
    plugins: [
      require('@tailwindcss/typography'),
    ],
  }