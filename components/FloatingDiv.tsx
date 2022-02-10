import { ReactNode } from "react";
import styled from "styled-components";

export interface FloatingDivProps {
  position?: "absolute" | "fixed" | "relative";
  fullscreen?: boolean;
  location?: {
    top?: string | number;
    right?: string | number;
    bottom?: string | number;
    left?: string | number;
  };
  children?: ReactNode;
}

export const FloatingDiv = (props: FloatingDivProps) => {
  return <Div {...props} />;
};
const Div = styled.div<FloatingDivProps>`
  position: relative;

  top: ${({ location }) => location?.top ?? 0};
  margin-right: ${({ location }) => location?.right ?? "unset"};
  margin-bottom: ${({ location }) => location?.bottom ?? "unset"};
  margin-left: ${({ location }) => location?.left ?? 0};
`;
