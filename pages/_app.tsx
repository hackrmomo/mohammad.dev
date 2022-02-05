import type { AppProps } from "next/app";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import useDarkMode from "use-dark-mode";
import { darkTheme, GlobalStyles, lightTheme } from "../components/ThemeConfig";

function MyApp({ Component, pageProps }: AppProps) {
  const darkMode = useDarkMode(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@200&display=swap"
          rel="stylesheet"
        />
        <meta
          name="description"
          content="Personal Portfolio for Mohammad Al-Ahdal"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={darkMode.value ? darkTheme : lightTheme}>
        <GlobalStyles />
        {mounted && <Component {...pageProps} />}
      </ThemeProvider>
    </>
  );
}

export default MyApp;
