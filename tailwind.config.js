/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      // => @media (min-width: 320px) { ... }
      xs: "320px",

      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      colors: {
        transparent: "transparent",
        "total-dark": "#232931",
        "dark-medium": "#393e46",
        "main-green": "#4ecca3",
        "main-grey": "#eeeeee",
        "red-error": "#FF4C29",
        "light-grey": "#E6F5FF",
        "oxford-blue": "hsl(217,54%,11%)",
        "light-oxford-blue": "hsl(216,50%,16%)",
        "indogo-dye": "hsl(215,32%,27%)",
        "blue-yonder": "hsl(216,30%,55%)",
        aqua: "hsl(178,100%,50%)",
        white: "hsl(0,0%,100%)",
        "dark-grey": "#19191c",
      },
    },
  },
  plugins: [],
};
