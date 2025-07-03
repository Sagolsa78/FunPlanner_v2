module.exports = {
  theme: {
    extend: {
      colors: {
        'dark-navy': '#090a0a', // You can name it whatever you like
      },
      animation: {
        scroll: 'scroll 40s linear infinite',
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      }
    },
  },
  plugins: [],
}