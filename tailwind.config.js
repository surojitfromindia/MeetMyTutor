const colors = require("tailwindcss/colors");
module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        poppin: ["Poppins", "sans-serif"],
        robotoCondensed: ["Roboto Condensed", "sans-serif"],
      },
      transitionProperty: {
        height: "height",
        width: "width",
        padding: "padding",
      },
      width: {
        "w-25": "9rem",
        "w-22": "5.5rem",
      },
      colors: {
        ...colors,
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["checked"],
      borderColor: ["checked", "hover", "focus"],
      width: ["hover", "focus", "group-hover"],
      padding: ["hover", "focus", "group-hover"],
      height: ["hover", "focus", "group-hover", "group-focus"],
      maxHeight: ["hover", "focus", "group-hover", "group-focus"],
      borderRadius: ["hover", "focus", "group-hover", "group-focus"],
    },
  },
  plugins: [ ],
};
