/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js}"],
    theme: {
        extend: {
            fontFamily: {
                poppins: ["Poppins", "sans-serif"],
            },
            colors: {
                "shujia-gray": "#43484C",
                "shujia-graylight": "#E4E5E9",
                "shujia-orange": "#D04B1E",
                "shujia-black": "#030504",
            },
        },
    },
    plugins: [],
};
