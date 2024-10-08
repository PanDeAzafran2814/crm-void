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
        background: "var(--background)",
        foreground: "var(--foreground)",
        "PrimaryBg": "#16171b",
        "PrimaryAct": "#494a4e96",
        "SecondaryBg": "#494a4e",

        "GreenPlusBg": "#9cdbc0",
        "GreenPlusTxt": "#4cb275",

        "RebDangerBg": "#ffd1d7",
        "RebDangerTxt": "#c28992",

        "SalesCardBg": "#fff5e1",
        "SalesCardPrimary": "#ffe4a0",
        "SalesCardTxt": "#d8b970",

        "BillsCardBg": "#efe6f7",
        "BillsCardPrimary": "#d3b5eb",
        "BillsCardTxt": "#a68bbb",

        "StatusCardBg": "#e0f8ea",
        "StatusCardPrimary": "#baf1d0",
        "StatusCardTxt": "#78a994",

        "ClientsCardBg": "#fdeae4",
        "ClientsCardPrimary": "#fac9c1",
        "ClientsCardTxt": "#d7755e",
      },
      backgroundImage: {
        'login': "url('assets/images/login-bg.png')",
      }
    },
  },
  plugins: [],
};
export default config;
