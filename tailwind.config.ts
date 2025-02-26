module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/_components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.3s ease-out forwards",
      },
      colors: {
        text: {
          h: "var(--color-text-h)",
          p: "var(--color-text-p)",
          white: "var(--color-text-white)",
        },
        body: {
          default: "var(--color-body-default)",
        },
        input: {
          input: "var(--color-input-input)",
        },
        button: {
          outline: "var(--color-button-outline)",
          link: "var(--color-button-link)",
          ghost: "var(--color-button-ghost)",
          active: "var(--color-button-active)",
          error: "var(--color-button-error)",
        },
        stroke: {
          default: "var(--color-stroke-default)",
        },
        icon: {
          stroke: "var(--color-icon-stroke)",
          bg: "var(--color-icon-bg)",
        },
        solid: {
          default: "var(--color-solid-default)",
        },
      },
    },
  },
  plugins: [],
};
