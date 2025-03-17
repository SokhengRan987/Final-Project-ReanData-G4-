  module.exports = {
    content: [
      './src/**/*.{js,jsx}', 
    ],
    theme: {
      extend: {
        fontFamily: {
          heading: ['Inter', 'sans-serif'],
          description: ['Roboto', 'sans-serif'],
        },
        fontSize: {
          h1: ['54px', { lineHeight: 'auto' }],
          h2: ['48px', { lineHeight: 'auto' }],
          h3: ['40px', { lineHeight: 'auto' }],
          h4: ['36px', { lineHeight: 'auto' }],
          h5: ['32px', { lineHeight: 'auto' }],
          description: ['24px', { lineHeight: '28px' }],
          'sub-description': ['20px', { lineHeight: '28px' }],
          base: ['18px', { lineHeight: 'auto' }],
          small: ['16px', { lineHeight: 'auto' }],
          'extra-small': ['14px', { lineHeight: 'auto' }],
        },
        colors: {
          primary: {
            DEFAULT: '#3C55A5', // Primary Base First
            100: '#DDE3F5',
            200: '#BBC7EB',
            300: '#99ABE1',
            400: '#778FD7',
            500: '#3C55A5',
            600: '#344A8F',
            700: '#2C3F79',
            800: '#243463',
            900: '#1C294D',
            950: '#141E37',
          },
          secondary: {
            DEFAULT: '#22B04B', // Secondary Base First
            100: '#D7F5DF',
            200: '#B0EBC0',
            300: '#88E1A1',
            400: '#61D782',
            500: '#22B04B',
            600: '#1D9A41',
            700: '#178337',
            800: '#126D2D',
            900: '#0D5723',
            950: '#09311A',
          },
          text: {
            DEFAULT: '#0F172A',
            100: 'rgba(15, 23, 42, 0.1)',
            200: 'rgba(15, 23, 42, 0.2)',
            300: 'rgba(15, 23, 42, 0.3)',
            400: 'rgba(15, 23, 42, 0.4)',
            500: 'rgba(15, 23, 42, 0.5)',
            600: 'rgba(15, 23, 42, 0.6)',
            700: 'rgba(15, 23, 42, 0.7)',
            800: 'rgba(15, 23, 42, 0.8)',
            900: 'rgba(15, 23, 42, 0.9)',
          },
        },
        keyframes: {
          moveLines: {
            '0%': { transform: 'translateY(-100%)' },
            '100%': { transform: 'translateY(100%)' },
          },
          moveParticles: {
            '0%': { transform: 'translateY(0) translateX(0)' },
            '50%': { transform: 'translateY(50px) translateX(50px)' },
            '100%': { transform: 'translateY(0) translateX(0)' },
          },
          gradient: {
            '0%': { backgroundPosition: '0% 50%' },
            '50%': { backgroundPosition: '100% 50%' },
            '100%': { backgroundPosition: '0% 50%' },
          },
        },
        animation: {
          moveLines: 'moveLines 10s linear infinite',
          moveParticles: 'moveParticles 5s ease-in-out infinite',
          gradient: 'gradient 3s ease infinite',
        },
      },
    },
    plugins: [],
  };
