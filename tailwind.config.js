/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // "./App.{js,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,ts,tsx}",
  ],

  presets: [require("nativewind/preset")],
  theme: {
    fontFamily: {
      "sans-extralight": ["Manrope-ExtraLight"],
      "sans-light": ["Manrope-Light"],
      "sans-regular": ["Manrope-Regular"],
      "sans-medium": ["Manrope-Medium"],
      "sans-semibold": ["Manrope-SemiBold"],
      "sans-bold": ["Manrope-Bold"],
      "sans-extrabold": ["Manrope-ExtraBold"],
    },
    extend: {
      // fontFamily: {
      //   sans: [
      //     "Manrope-Regular",
      //     "System",
      //   ],
      // },
      // fontWeight: {
      //   extralight: "200",
      //   light: "300",
      //   regular: "400",
      //   medium: "500",
      //   semibold: "600",
      //   bold: "700",
      //   extrabold: "800",
      // },
    },
  },
  plugins: [],
};
