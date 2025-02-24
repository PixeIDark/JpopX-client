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
