module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        "auto-fit": "repeat(auto-fit, minmax(250px, 1fr))",
        "auto-fill": "repeat(auto-fill, minmax(250px, 1fr))",
      },
      gridTemplateRows: {
        "auto-fit": "repeat(auto-fit, minmax(250px, 1fr))",
        "auto-fill": "repeat(auto-fill, minmax(250px, 1fr))",
      },
    },
  },
  plugins: [],
};
