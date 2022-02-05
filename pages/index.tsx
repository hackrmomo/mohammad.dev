import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styled from "styled-components";
import { ThemeProps } from "../components/ThemeConfig";
import useDarkMode from "use-dark-mode";
import { Text } from "../components/Text";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Mohammad Al-Ahdal | Home</title>
        <meta
          name="description"
          content="Personal Portfolio for Mohammad Al-Ahdal"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Text variant="h1">
        {"Hey, I'm "}
        <Text variant="span" color="primary">Mohammad</Text>.
      </Text>
    </div>
  );
};



export default Home;
