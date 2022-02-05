import { ReactNode } from "react";
import styled, { CSSProperties } from "styled-components";

export interface TextProps {
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  color?: "default" | "primary";
  children: ReactNode;
}

export const Text = (props: TextProps) => {
  const StyledValue = styled[props.variant ?? "p"]`
    color: ${({ theme }) => theme[props.color ?? "default"]};
    font-weight: 300;
  `;
  return <StyledValue>{props.children}</StyledValue>;
};
