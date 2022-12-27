import type { AppProps } from "next/app";
import Head from "next/head";
import { ReactNode, useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import useDarkMode, { DarkMode } from "use-dark-mode";
import { NavBar } from "../components/NavBar";
import { darkTheme, useGlobalStyles, lightTheme } from "../components/ThemeConfig";
import { config } from "@fortawesome/fontawesome-svg-core";
import { KBarProvider, useKBar, useRegisterActions } from "kbar";
import { SessionProvider, useSession } from "next-auth/react";
import { useEditing, EditingProvider } from "@/lib/useEditing";

import {
  useActions as kbarActions,
  KbarSkeleton,
} from "../components/kbarUtil";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Session } from "next-auth";
import { DataProvider } from "@/lib/useData";

config.autoAddCss = false;

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps<{ session: Session }>) {
  const darkMode = useDarkMode(false);
  const [mounted, setMounted] = useState(false);
  const GlobalStyles = useGlobalStyles();

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <>
      <SessionProvider session={session}>
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
          <SessionFilledApp mounted={mounted} darkMode={darkMode}>
            <Component {...pageProps} />
          </SessionFilledApp>

        </ThemeProvider>
      </SessionProvider>
    </>
  );
}

function SessionFilledApp(props: { darkMode: DarkMode, mounted: boolean, children: ReactNode }) {
  const { value, toggle } = useDarkMode();
  const { darkMode, mounted, children } = props;
  const { status } = useSession();
  const { editing } = useEditing();

  return <>
    <EditingProvider>
      <DataProvider>
        <KBarProvider actions={kbarActions(status, editing, value, toggle)}>
          <KbarSkeleton />
          {mounted && (
            <InternalKbarUpdater {...props}>
              <NavBar />
              {children}
            </InternalKbarUpdater>
          )}
        </KBarProvider>
      </DataProvider>
    </EditingProvider>
  </>;
}

function InternalKbarUpdater(props: { darkMode: DarkMode, children: ReactNode }) {
  const { status } = useSession();
  const { editing } = useEditing();
  useRegisterActions(kbarActions(status, editing, props.darkMode.value, props.darkMode.toggle), [status, editing, props.darkMode.value, props.darkMode.toggle]);
  return <>
    {props.children}
  </>
}

export default MyApp;
