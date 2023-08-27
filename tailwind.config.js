/** @type {import("tailwindcss").Config} */
module.exports = {
    mode: "jit",
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            animation: {
                "fade-in": "fadeIn 250ms ease-in",
                "fade-in-1": "500ms ease-in 500ms fadeIn",
                "fade-in-2": "500ms ease-in 1000ms fadeIn",
                "fade-in-3": "500ms ease-in 1500ms fadeIn",
                "fade-in-4": "500ms ease-in 2000ms fadeIn",
                "fade-in-5": "500ms ease-in 2500ms fadeIn",
                "fade-in-6": "500ms ease-in 3000ms fadeIn",
                "fade-in-7": "500ms ease-in 3500ms fadeIn",
                "fade-in-8": "500ms ease-in 4000ms fadeIn",
                "roll": "roll 250ms ease-in"
            },
            fontFamily: {
                heading: [ "var(--font-montserrat)" ],
                body: [ "var(--font-inter)" ],
            },
            colors: {
                background: "#030712"
            },
            keyframes: {
                fadeIn: {
                    "0%": { opacity: 0 },
                    "100%": { opacity: 1 },
                },
                roll: {
                    "0%": { transform: "rotate(0deg)" },
                    "100%": { transform: "rotate(70deg)" },
                }
            }
        },
    },
    plugins: [],
};
