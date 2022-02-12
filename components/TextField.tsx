import { ChangeEventHandler, EventHandler } from "react";
import styled from "styled-components";

interface TextFieldProps {
  type?: "text" | "email" | "password";
  placeholder?: string;
  error?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onSubmit?: () => void;
}

export const TextField = (props: TextFieldProps) => {
  return (
    <Field
      onKeyUp={(e) => {
        if (e.key === "Enter" && props.onSubmit) {
          props.onSubmit();
        }
      }}
      {...props}
    />
  );
};

const Field = styled.input<{ error?: string }>`
  margin: 15px;
  min-width: 20rem;
  font-size: 1.25rem;
  padding: 0.5rem;
  background-color: transparent;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid ${({ theme }) => theme.text}80;
  transition: border-bottom 300ms;
  color: ${({ theme }) => theme.text};
  ::placeholder {
    color: ${({ theme }) => theme.text}80;
  }
  :focus {
    border-bottom: 1px solid ${({ theme }) => theme.text};
  }
`;
