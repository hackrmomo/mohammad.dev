import { ReactNode } from "react";
import styled from "styled-components";

export interface FloatingDivProps {
  position?: "absolute" | "fixed";
  location?: {
    top?: string | number;
    right?: string | number;
    bottom?: string | number;
    left?: string | number;
  };
  margin?: {
    top?: string | number;
    right?: string | number;
    bottom?: string | number;
    left?: string | number;
  };
  children?: ReactNode;
}

export const FloatingDiv = ({
  children,
  position,
  location,
  margin,
}: FloatingDivProps) => {
  const Div = styled.div`
    position: ${position ?? "absolute"};

    top: ${location?.top ?? 0};
    right: ${location?.right ?? "unset"};
    bottom: ${location?.bottom ?? "unset"};
    left: ${location?.left ?? 0};

    margin-top: ${margin?.top ?? "unset"};
    margin-right: ${margin?.right ?? "unset"};
    margin-bottom: ${margin?.bottom ?? "unset"};
    margin-left: ${margin?.left ?? "unset"};
  `;
  return <Div>{children}</Div>;
};
