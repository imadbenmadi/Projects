/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                green: "#32DEBF",
                green_b: "#0D8872",
                perpol: "#9747FF",
                perpol_b: "#7C2CBF",
                black_text: "#1E1E1E",
                gray: "#525252",
                gray_white: "#bebebe",
                image_animation: "#b6b2b22e",
            },
        },
    },
    plugins: [
        require("tailwind-scrollbar")({
            nocompatible: true,
            preferredStrategy: "pseudoelements",
        }),
    ],
};
