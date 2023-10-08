/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,}"],
  theme: {
    extend: {
      textColor: {
        lightGray: "#707070",
        primary: "#FAFAFA",
        secColor: "#efefef",
        btnColor: "#77C360",
        darkGray: "#222529",
      },
      backgroundColor: {
        mainColor: "#F6F5FA",
        secondaryColor: "#E8EAEF;",
        blackOverlay: "rgba(0, 0 ,0 ,0.7)",
        headerbg: "#FBFAFF",
        greenbtn: "#77C360;",
        blue: "#19BAD7",
        grayG: "#E9E9E9",
        counter: "#EFEFEF",
      },
      boxShadow: {
        custom: "0px 4px 87px 0px rgba(0, 0, 0, 0.31)", // Define your custom box shadow here
      },
    },
  },
  plugins: [],
};
