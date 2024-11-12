import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // 텍스트 입력 공간 늘어나지 않는 현상 해결
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "100ch",
          },
        },
      },
      colors: {
        // Theme 색상
        primary: {
          1: "#6B6CED",
          2: "#F6F8FD",
        },

        // Text 색상
        black: "#222222",
        body: "#666666",
        disabled: "#999999",

        // Border 색상
        border: {
          1: "#E1E1E1",
          2: "#CCCCCC",
        },

        // Background 색상
        bg: {
          1: "#F7F7F7",
          2: "#F0F0F0",
          3: "#E0E0E0",
        },

        // System 색상
        red: "#D93438",
        yellow: "#F8D753",
        blue: "#2A54D2",
        green: "#67C451",

        // 3단계 문제 색상
        orange: "#EF8E07",
      },
    },

    // FontSize 기본 설정 디자인에 맞게 변경
    fontSize: {
      "2xs": ["10px", "140%"],
      xs: ["12px", "140%"],
      sm: ["14px", "140%"],
      base: ["16px", "140%"],
      lg: ["18px", "140%"],
      xl: ["24px", "130%"],
      "2xl": ["36px", "130%"],
      "3xl": ["48px", "130%"],
    },
  },
  // 텍스트 에디터 내 폰트 크기 변화를 위한 plugin
  plugins: [require("@tailwindcss/typography")],
};
export default config;
