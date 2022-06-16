/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            gridTemplateColumns: {
                'auto-fit': 'repeat(auto-fit, 200px)',
                'auto-fill': 'repeat(auto-fill, minmax(200px, 1fr))',
            },
        },
        screens: {
            xs: '500px',
            sm: '800px',
            md: '1000px',
            mxs: {
                max: '500px'
            },
            msm: {
                max: '800px'
            },
            mmd: {
                max: '1000px'
            }
        },
    },
    plugins: [],
}
