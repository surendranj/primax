/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
    content: ["./app/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}"],
    theme: {
        screens: {
            mobile: "280px",
            tablet: "768px",
            laptop: "1024px",
            desktop: "1280px",
        },
        extend: {
            fontFamily: {
                sans: ["Lato", ...defaultTheme.fontFamily.sans],
            },
            colors: {
                black: "#0A0908",
                blue: "#BBE5ED",
                green: "#63D471",
                grey: "#646E78",
                orange: "#FF5E5B",
            },
        },
    },
    plugins: [],
};
