import Image from "next/image";
import styled from "styled-components";
import useDarkMode from "use-dark-mode";
import { NavLink } from "./NavLink";
import Link from "next/link";

export const NavBar = () => {
  const { value: isDarkMode } = useDarkMode();

  const NavContainer = styled.nav`
    margin-left: 20px;
    margin-top: 20px;
    display: flex;
    flex-direction: row;
  `;
  const SpacerDiv = styled.div`
    display: flex;
    flex-grow: 1;
  `;
  return (
    <NavContainer>
      <Link href="/">
        <a>
          <Image
            src={`/logo${isDarkMode ? "Dark" : "Light"}.png`}
            width={60}
            height={60}
          />
        </a>
      </Link>
      <SpacerDiv />
      <NavLink to="/about">About</NavLink>
      <NavLink to="/contact">Contact</NavLink>
      <NavLink to="/portfolio">Portfolio</NavLink>
      <NavLink to="/blog">Blog</NavLink>
      <NavLink to="/photography">Photography</NavLink>
      <NavLink special to="/login">
        Login
      </NavLink>
    </NavContainer>
  );
};
