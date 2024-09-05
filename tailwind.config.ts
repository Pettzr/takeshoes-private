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
        'black/3': 'rgba(0, 0, 0, 0.03)',
      },
       margin: {
          '1/10': '10%',
          '1/5': '20%',
          '12/100': '12%',
          '1/4': '25%',
          '1/3': '33.333333%',
          '1/2': '50%',
          '2/3': '66.666667%',
          '3/4': '75%',
        },
      flexBasis: {
        '76/100': '76%',
      },
      width: {
        '75/100': '75%',
        '19/100': '19%'
      },
      maxWidth: {
        '26.6/100': '26.6%'
      },
      gap: {
        '10/100': '10%'
      }
    },
  },
  plugins: [],
}
export default config;
