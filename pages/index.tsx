import type { NextPage } from "next";
import Head from "next/head";
import { FloatingDiv } from "../components/FloatingDiv";
import { Text } from "../components/Text";
import FadeIn from "react-fade-in";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCodeBranch } from "@fortawesome/pro-light-svg-icons";
import { faLinkedinIn, faTwitter } from "@fortawesome/free-brands-svg-icons";
import styled from "styled-components";

const Home: NextPage = () => {
  const HorizontalWrapper = styled.div`
    display: flex;
    flex-direction: row;
    > * {
      margin-right: 0.75rem;
    }
  `;
  return (
    <div>
      <Head>
        <title>Mohammad Al-Ahdal | Home</title>
      </Head>
      <FloatingDiv location={{ top: "45%", left: "10%", right: "10%" }}>
        <FadeIn>
          <Text variant="h1">
            {"Hey, I'm "}
            <Text variant="span" color="primary">
              Mohammad
            </Text>
            .
          </Text>
          <Text variant="h2">
            I&apos;m a Software Developer from Ottawa, Canada. <br /> I love
            building apps of all kinds, playing video games, <br /> taking
            photos, and travelling!
          </Text>
          <Text color="#808080">
            (we're still under construction but my family really wanted to see
            this + I needed to work on deployment anyways)
          </Text>
          <FadeIn wrapperTag={HorizontalWrapper}>
            <Text raise variant="h3" color="var(--text)">
              <a href="https://github.com/hackrmomo">
                <FontAwesomeIcon icon={faCodeBranch} />
              </a>
            </Text>
            <Text raise variant="h3" color="#1ca1f3">
              <a href="https://twitter.com/hackrmomo">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
            </Text>
            <Text raise variant="h3" color="#0c66c3">
              <a href="https://linkedin.com/in/mohammadalahdal">
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
            </Text>
          </FadeIn>
        </FadeIn>
      </FloatingDiv>
    </div>
  );
};

export default Home;
