import type { NextPage } from "next";
import Head from "next/head";
import { FloatingDiv } from "../components/FloatingDiv";
import { Text } from "../components/Text";
import FadeIn from "react-fade-in"

const Home: NextPage = () => {
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
            I&apos;m a Software Developer from Ottawa, Canada. <br /> I love building
            apps of all kinds, playing video games, <br /> taking photos, and
            travelling!
          </Text>
        </FadeIn>
      </FloatingDiv>
    </div>
  );
};

export default Home;
