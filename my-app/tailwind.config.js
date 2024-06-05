const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
       scrollbarHide: {
        '-ms-overflow-style': 'none',  // for Internet Explorer and Edge
        'scrollbar-width': 'none',  // for Firefox
        '&::-webkit-scrollbar': {
          display: 'none'  // for Chrome, Safari, and Opera
        }
      }
    },
  },
  plugins: [],
}