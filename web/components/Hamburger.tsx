import FadeIn from "react-fade-in";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode, useState } from "react";
import styled from "styled-components";
import { faBars } from "@fortawesome/pro-solid-svg-icons";

interface HamburgerProps {
  children: ReactNode;
}

export const HamburgerIcon = (props: HamburgerProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <HamburgerHolder>
      <HamburgerMenuBackdrop
        hidden={!isMenuOpen}
        open={isMenuOpen}
        onClick={() => {
          setIsMenuOpen(false);
        }}
      />
      <FontAwesomeIcon
        onClick={() => {
          setIsMenuOpen(true);
        }}
        style={{ zIndex: 115, cursor: "pointer" }}
        size="lg"
        icon={faBars}
      />
      <HamburgerMenu open={isMenuOpen}>
        {isMenuOpen && <FadeIn>{props.children}</FadeIn>}
      </HamburgerMenu>
    </HamburgerHolder>
  );
};

const HamburgerHolder = styled.div`
  margin-right: 20px;
`;

const HamburgerMenuBackdrop = styled.div<{ open: boolean }>`
  position: fixed;
  height: 100vh;
  transition: opacity 3000ms;
  opacity: ${({ open }) => (open ? 1 : 0)};
  width: 100vw;
  top: 0;
  right: 0;
  background-color: ${({ theme }) => theme.paper}80;
  pointer-events: visiblePainted;
`;
const HamburgerMenu = styled.div<{ open: boolean }>`
  position: fixed;
  height: 100vh;
  transition: width 300ms;
  width: ${({ open }) => (open ? "65vw" : "0vw")};
  top: 0;
  right: 0;
  background-color: ${({ theme }) => theme.background};
  z-index: 110;
`;
