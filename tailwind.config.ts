import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/admin/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/ui/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/ui/admin/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        grayNavbar: '#BFC0C0',
      }, 
    },
  },
  plugins: [],
}
export default config;
