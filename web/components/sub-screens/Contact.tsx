import FadeIn from "react-fade-in";
import styled from "styled-components";
import { FloatingDiv } from "../FloatingDiv";
import { Text } from "../Text";

export const Contact = () => {
  return (
    <>
      <FloatingDiv location={{ top: "37.5vh", left: "10vw", right: "10vw" }}>
        <FadeIn>
          <Text variant="h2">Soooo... you&apos;d like to get in touch...?</Text>
          <HorizontalDiv>
            <Text variant="p">You could...&nbsp;</Text>
            <Text raise color="primary" variant="p">
              <a href="mailto:mo@mohammad.dev">Email me</a>
            </Text>
          </HorizontalDiv>
          <HorizontalDiv>
            <Text variant="p">or message me on&nbsp;</Text>
            <Text raise color="primary" variant="p">
              <a href="https://linkedin.com/in/mohammadalahdal">Linked In</a>
            </Text>
          </HorizontalDiv>
          <HorizontalDiv>
            <Text variant="p">or perhaps you just want to see what I&apos;ve been up to on&nbsp;</Text>
            <Text raise color="primary" variant="p">
              <a href="https://github.com/hackrmomo">GitHub</a>
            </Text>
          </HorizontalDiv>
          <HorizontalDiv>
            <Text variant="p">regardless of how you&apos;d like to get in touch, I&apos;d love to connect!</Text>
          </HorizontalDiv>
        </FadeIn>
      </FloatingDiv>
    </>
  );
};

const HorizontalDiv = styled.div`
  display: flex;
  flex-direction: row;
`;
