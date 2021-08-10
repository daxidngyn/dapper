module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        "hero-pattern": "url('/heroBg.png')",
      }),
      screens: {
        "3xl": "2000px",
        "4xl": "2256px",
        "5xl": "2512px",
        "6xl": "2768px",
        xxl: "3280px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
