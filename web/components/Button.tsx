import { MouseEventHandler, ReactNode } from "react";
import styled from "styled-components";
import { LoadingIcon } from "./loading/LoadingIcon";

interface ButtonProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  loading?: boolean;
  disabled?: boolean;
}

export const Button = (props: ButtonProps) => {
  return (
    <StyledButton {...props}>
      {props.loading && (
        <LoadingIcon reversed style={{ marginTop: -3, marginBottom: -3 }} size={30} />
      )}
      {!props.loading && props.children}
    </StyledButton>
  );
};

const StyledButton = styled.button<ButtonProps>`
  margin: 15px;
  min-width: 10rem;
  font-size: 1.25rem;
  min-height: calc(1.25rem + 0.65rem + 0.65rem);
  padding: 0.65rem;
  background-color: ${({ theme }) => theme.default};
  border: none;
  color: ${({ theme }) => theme.background};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: transform 300ms, filter 300ms;
  :hover {
    transform: translateY(-10%);
    filter: drop-shadow(0px 5px 10px var(--shadow));
  }
`;
