/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'matrix-rain': 'matrixRain 0.1s ease-out',
      },
      keyframes: {
        glow: {
          '0%': { 
            textShadow: '0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor',
          },
          '100%': { 
            textShadow: '0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor',
          },
        },
        matrixRain: {
          '0%': {
            transform: 'translateY(-4px) scale(0.8)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateY(0) scale(1)',
            opacity: '1',
          },
        }
      },
      colors: {
        'matrix-green': '#00ff41',
        'cyber-pink': '#ff006e',
        'neon-blue': '#39ff14',
      },
      fontFamily: {
        'mono': ['Courier New', 'Consolas', 'Monaco', 'monospace'],
      }
    },
  },
  plugins: [],
}