import Image from "next/image";
import styled from "styled-components";
import useDarkMode from "use-dark-mode";
import { NavLink } from "./NavLink";
import Link from "next/link";
import FadeIn from "react-fade-in";
import { useRouter } from "next/router";
import { useState } from "react";

export const NavBar = () => {
  const { value: isDarkMode } = useDarkMode();
  const {} = useRouter();
  const [hasCompletedOnce, setHasCompletedOnce] = useState(false);

  const NavContainer = styled.nav`
    margin-left: 20px;
    margin-top: 20px;
    display: flex;
    flex-direction: row;
  `;
  const LinksContainer = styled.div`
    display: flex;
    flex-direction: row;
  `;
  const SpacerDiv = styled.div`
    display: flex;
    flex-grow: 1;
  `;

  const Logo = [
    <Link href="/">
      <a>
        <Image
          src={`/logo${isDarkMode ? "Dark" : "Light"}.png`}
          width={60}
          height={60}
        />
      </a>
    </Link>,
  ];
  const Links = [
    <NavLink to="/about">About</NavLink>,
    <NavLink to="/contact">Contact</NavLink>,
    <NavLink to="/portfolio">Portfolio</NavLink>,
    <NavLink to="/blog">Blog</NavLink>,
    <NavLink to="/photography">Photography</NavLink>,
    <NavLink to="/login">Login</NavLink>,
  ];
  return (
    <NavContainer>
      {hasCompletedOnce ? Logo : <FadeIn>{Logo}</FadeIn>}
      <SpacerDiv />
      {hasCompletedOnce ? (
        Links
      ) : (
        <FadeIn
          onComplete={() => {
            setHasCompletedOnce(true);
          }}
          wrapperTag={LinksContainer}
        >
          {Links}
        </FadeIn>
      )}
    </NavContainer>
  );
};
