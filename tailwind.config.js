/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "#fee375",
          secondary: "#c0fe75",
          accent: "#75d5fe",
          neutral: "#775a3f",
          "neutral-content": "#ffc467",
          "bg-base-200": "#f1ecdb",
          "bg-base-300": "#e4dac6",
        },
      },
    ],
  },
}