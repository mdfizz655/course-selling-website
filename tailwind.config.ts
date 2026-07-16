import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // এখানে আপনার প্রজেক্টের মেইন কালার সেট করুন
        primary: "#2563eb",   // এটিই সেই নীল রঙ যা বাটন এবং লোগোতে আসবে
        secondary: "#f59e0b",
      },
    },
  },
  plugins: [],
};
export default config;