import type { NextPage } from "next";
import Head from "next/head";
import styled from "styled-components";
import { About } from "../components/sub-screens/About";
import { Home } from "../components/sub-screens/Home";
import { Contact } from "../components/sub-screens/Contact";

const index: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Mohammad Al-Ahdal | Home</title>
      </Head>
      <VerticalWrapper>
        <FullPage>
          <Home />
        </FullPage>
        <FullPage id="about">
          <About />
        </FullPage>
        <FullPage id="contact">
          <Contact />
        </FullPage>
      </VerticalWrapper>
    </div>
  );
};

const VerticalWrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 300vh;
  top: 0px;
  left: 0px;
  padding: 0px;
  margin: 0px;
  z-index: 5;
`;

const FullPage = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 0px;
  margin: 0px;
`;

export default index;
