import { ReactNode } from "react";
import styled from "styled-components";

export interface TextProps {
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  color?: "default" | "primary" | "secondary" | string;
  raise?: boolean;
  children: ReactNode;
}

export const Text = (props: TextProps) => {
  const StyledValue = styled[props.variant ?? "p"]`
    color: ${({ theme }) =>
      props.color?.startsWith("#")
        ? props.color
        : theme[props.color ?? "default"]} !important;
    font-weight: 300;
    transition: transform 300ms;
    :hover {
      ${props.raise && "transform: translateY(-25%);"}
    }
    > a {
      text-decoration: none;
      color: unset;
      transition: filter 300ms;
      :hover {
        filter: drop-shadow(0px 0px 2px var(--shadow));
      }
    }
  `;
  return <StyledValue>{props.children}</StyledValue>;
};
