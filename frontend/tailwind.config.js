module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  corePlugins: { preflight: true },
  theme: { extend: { colors: { "dark-color": "var(--dark-color)" } } },
  plugins: [],
};
