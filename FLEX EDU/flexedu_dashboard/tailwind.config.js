/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                red_error: "#F84141",
                green_v: "#469F78",
                yallow_v: "#F6BC63",
                // green_v: "#1a9068",
                green_b: "#469F78",
                Rose_v: "#EFCFF9",
                Rose_b_v: "#CF74E9",
                blue_v: "#7ea7fb",
                black_text: "#4b4b4b",
                gray_v: "#454545",
                gray_white: "#e6e6e6",
                image_animation_v: "#b6b2b22e",
                perpol_v: "#429661",
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
