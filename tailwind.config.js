module.exports = {
  content: [
    "./pages/**/*.js",
    "./components/**/*.js",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'fluid': 'repeat(auto-fit, minmax(20rem, 1fr))',
      },
      backgroundImage: {
        'notebook': "repeating-linear-gradient(white 0px, white 24px, #c0c0c0 25px)",
      },
    },
  },
  plugins: [],
}
