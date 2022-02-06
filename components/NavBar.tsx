import Image from "next/image";
import styled from "styled-components";
import useDarkMode from "use-dark-mode";
import { NavLink } from "./NavLink";
import Link from "next/link";
import FadeIn from "react-fade-in";
import { useState } from "react";

export const NavBar = () => {
  const { value: isDarkMode } = useDarkMode();
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
    <Link key={0} href="/">
      <a>
        <Image
          src={`/logo${isDarkMode ? "Dark" : "Light"}.png`}
          width={60}
          height={60}
          alt="hackr logo"
        />
      </a>
    </Link>,
  ];
  const Links = [
    <NavLink key={0} to="/about">About</NavLink>,
    <NavLink key={1} to="/contact">Contact</NavLink>,
    <NavLink key={2} to="/portfolio">Portfolio</NavLink>,
    <NavLink key={3} to="/blog">Blog</NavLink>,
    <NavLink key={4} to="/photography">Photography</NavLink>,
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
