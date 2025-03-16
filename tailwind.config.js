module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
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