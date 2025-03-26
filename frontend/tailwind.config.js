/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", 
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      colors: {
        'dark-blue': '#003366',  // Replace with your desired dark blue color
        'dark-cyan': '#004d4d',  // Replace with your desired dark cyan color
      },
      backgroundImage: {
        'instagram-gradient': 'linear-gradient(135deg, #f58529, #feda75, #dd2a7b, #8134af)', // Define your gradient
      },
    },
  },
  plugins: [],
}


