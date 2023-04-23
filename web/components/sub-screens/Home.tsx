import { FloatingDiv } from "../FloatingDiv";
import { Text } from "../Text";
import FadeIn from "react-fade-in";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCodeBranch } from "@fortawesome/pro-light-svg-icons";
import {
  faLinkedinIn,
  faTwitch,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";

export const Home = () => {
  return (
    <>
      <FloatingDiv location={{ top: "37.5vh", left: "10vw", right: "10vw" }}>
        <FadeIn>
          <Text variant="h1">
            {"Hey, I'm "}
            <Text raise variant="span" color="primary">
              <Link href="#about" scroll={false}>
                Mohammad
              </Link>
            </Text>
            .
          </Text>
          <Text variant="h2">
            I&apos;m a Software Developer from Calgary, AB, Canada. <br /> I
            love building apps of all kinds, playing video games, <br /> taking
            photos, and travelling!
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
            <Text raise variant="h3" color="#6340a4">
              <a href="https://twitch.tv/hackrmomo">
                <FontAwesomeIcon icon={faTwitch} />
              </a>
            </Text>
          </FadeIn>
        </FadeIn>
      </FloatingDiv>
    </>
  );
};

const HorizontalWrapper = styled.div`
  display: flex;
  flex-direction: row;
  > * {
    margin-right: 0.75rem;
  }
`;
