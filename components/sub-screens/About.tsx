import Link from "next/link";
import FadeIn from "react-fade-in";
import { FloatingDiv } from "../FloatingDiv";
import { Text } from "../Text";

export const About = () => {
  return (
    <>
      <FloatingDiv location={{ top: "37.5vh", left: "10vw", right: "10vw" }}>
        <FadeIn>
          <Text variant="h2">
            Being a developer means impacting people&apos;s lives.
            <br />
          </Text>
          <Text variant="h3">
            The typing I do on my keyboard day in and day out means something to
            others.
            <br />
          </Text>
          <Text variant="h3">
            Oftentimes the things I create are things that people use every day.
            From small apps and websites that empower small businesses and your
            local mom and pop shop to complex workflows seen and used by
            millions every day - every line of code matters.
            <br />
            <br />
          </Text>
          <Text variant="h3">
            I take my job as a software developer with great responsibility.
            I&apos;m building the tools that keep your business running and
            I&apos;m always ready to put 110% of my effort into the ideas you
            want to see come into fruition.
            <br />
          </Text>
          <Text raise color="primary" variant="h3">
            <Link href="#contact">
              <a>Let&apos;s chat.</a>
            </Link>
          </Text>
        </FadeIn>
      </FloatingDiv>
    </>
  );
};
