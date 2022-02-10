import { createGlobalStyle } from "styled-components";

export interface ThemeProps {
  background: string;
  paper: string;
  sheet: string; // sheet is a secondary paper like item
  shadow: string;
  text: string;
  default: string;
  primary: string;
  secondary: string;
}

export const lightTheme: ThemeProps = {
  background: "#FFFFFF",
  paper: "#D9D9D9",
  sheet: "#F9F9F9",
  shadow: "#00000030",
  text: "#121212",
  default: "#121212",
  primary: "#00D4C8",
  secondary: "#009990",
};

export const darkTheme: ThemeProps = {
  background: "#121212",
  paper: "#222222",
  sheet: "#333333",
  shadow: "#000000",
  text: "#FFFFFF",
  default: "#FFFFFF",
  primary: "#008078",
  secondary: "#00B2A7",
};

export const GlobalStyles = createGlobalStyle<{ theme: ThemeProps }>`
  html {
    scroll-behavior: smooth;
  }
  body {
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    font-family: "Work Sans";
    font-weight: 200;
    margin: 0px;
  }
  h1 {
    font-size: 3rem;
  }
  h2 {
    font-size: 2.25rem;
  }
  h3 {
    font-size: 1.5rem;
  }
  :root {
    --shadow: ${({ theme }) => theme.shadow};
    --paper: ${({ theme }) => theme.paper};
    --sheet: ${({ theme }) => theme.sheet};
    --text: ${({ theme }) => theme.text};
  }
  textarea:focus, input:focus {
    outline: none
  }
`;
