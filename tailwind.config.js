/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  darkMode: ['class', '[data-mode="dark"]'],
  prefix: "nwcb-",
  corePlugins: {
    // preflight: false,
  },
};