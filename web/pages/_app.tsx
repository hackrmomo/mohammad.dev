import type { AppProps } from "next/app";
import Head from "next/head";
import { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import useDarkMode from "use-dark-mode";
import { NavBar } from "../components/NavBar";
import { darkTheme, useGlobalStyles, lightTheme } from "../components/ThemeConfig";
import { config } from "@fortawesome/fontawesome-svg-core";
import { KBarProvider } from "kbar";

import {
  useActions as kbarActions,
  KbarSkeleton,
} from "../components/kbarUtil";
import "@fortawesome/fontawesome-svg-core/styles.css";

config.autoAddCss = false;

function MyApp({ Component, pageProps }: AppProps) {
  const darkMode = useDarkMode(false);
  const [mounted, setMounted] = useState(false);
  const GlobalStyles = useGlobalStyles();

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@200;300&display=swap" rel="stylesheet" />
        <meta
          name="description"
          content="Personal Portfolio for Mohammad Al-Ahdal"
        />
        <link
          rel="icon"
          href={`/favicon${darkMode.value ? "Dark" : "Light"}.ico`}
        />
      </Head>
      <ThemeProvider theme={darkMode.value ? darkTheme : lightTheme}>
        <GlobalStyles />
        <KBarProvider actions={kbarActions()}>
          <KbarSkeleton />
          {mounted && (
            <>
              <NavBar />
              <Component {...pageProps} />
            </>
          )}
        </KBarProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
