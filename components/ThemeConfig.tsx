// import { useTheme } from "next-themes";
import useDarkMode from "use-dark-mode";
import { ReactNode } from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";

export interface ThemeProps {
  background: string;
  text: string;
  default: string;
  primary: string;
}

export const lightTheme: ThemeProps = {
  background: "#FFFFFF",
  text: "#121212",
  default: "#121212",
  primary: "#00D4C8 !important",
};

export const darkTheme: ThemeProps = {
  background: "#121212",
  text: "#FFFFFF",
  default: "#FFFFFF",
  primary: "#008078 !important",
};

export const GlobalStyles = createGlobalStyle<{ theme: ThemeProps }>`
  body {
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    font-family: "Work Sans";
    font-weight: 200;
  }
`;
