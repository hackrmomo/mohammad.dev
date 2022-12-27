import Image from "next/image";
import styled from "styled-components";
import useDarkMode from "use-dark-mode";
import { NavLink } from "./NavLink";
import Link from "next/link";
import FadeIn from "react-fade-in";
import { useEffect, useState } from "react";
import { useWindowSize } from "./misc/useWindowSize";
import { HamburgerIcon } from "./Hamburger";
import DarkLogo from "../public/logoDark.png";
import LightLogo from "../public/logoLight.png";
import { useEditing } from "@/lib/useEditing";

export const NavBar = () => {
  const { value: isDarkMode, toggle: toggleDarkMode } = useDarkMode();
  const { editing, setEditing } = useEditing();
  const [hasCompletedOnce, setHasCompletedOnce] = useState(false);
  const { isMobile } = useWindowSize();

  const NavContainer = styled.nav`
    z-index: 5;
    position: fixed;
    top: -5px;
    right: 0;
    left: 0;
    padding-left: 20px;
    padding-top: 25px;
    padding-bottom: 20px;
    display: flex;
    flex-direction: row;
    background-color: ${({ theme }) => theme.background}CC;
    backdrop-filter: blur(15px);
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
    <Link shallow scroll={false} key="logo" href="/#~">
      <a>
        <Image
          src={isDarkMode ? DarkLogo.src : LightLogo.src}
          width={isMobile ? 35 : 60}
          height={isMobile ? 35 : 60}
          alt="hackr logo"
        />
      </a>
    </Link>,
  ];
  const Links: ({ link: string | (() => void), title: string } | null)[] = [
    { link: "/#about", title: "About" },
    { link: "/#contact", title: "Contact" },
    { link: "/resume", title: "Resume" },
    { link: "/portfolio", title: "Portfolio" },
    { link: "/blog", title: "Blog" },
    { link: "/photography", title: "Photography" },
    isMobile ? { link: toggleDarkMode, title: isDarkMode ? "Light Mode" : "Dark Mode" } : null,
    isMobile ? { link: () => setEditing(!editing), title: editing ? "Done Editing" : "Edit" } : null,
  ];

  const LinkElements = Links.filter((l) => l !== null).map((link, index) => (
    <NavLink key={index} to={link!.link}>
      {link!.title}
    </NavLink>
  ));

  return (
    <NavContainer>
      {hasCompletedOnce ? Logo : <FadeIn>{Logo}</FadeIn>}
      <SpacerDiv />
      {hasCompletedOnce ? (
        isMobile ? (
          <HamburgerIcon>{LinkElements}</HamburgerIcon>
        ) : (
          LinkElements
        )
      ) : (
        <FadeIn
          onComplete={() => {
            setHasCompletedOnce(true);
          }}
          wrapperTag={LinksContainer}
        >
          {isMobile ? (
            <HamburgerIcon>{LinkElements}</HamburgerIcon>
          ) : (
            LinkElements
          )}
        </FadeIn>
      )}
    </NavContainer>
  );
};
