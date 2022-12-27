import React, { ChangeEventHandler, EventHandler, useEffect } from "react";
import styled from "styled-components";

interface TextFieldProps {
  type?: "text" | "email" | "password";
  placeholder?: string;
  error?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onSubmit?: () => void;
  textLike?: boolean;
}

export const TextField = (props: TextFieldProps) => {
  // create a ref to store the textInput DOM element
  const textInput = React.useRef<HTMLInputElement>(null);
  const spanRef = React.useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (textInput.current && props.textLike && spanRef.current) {
      spanRef.current.innerText = props.value || "";
      textInput.current.style.width = `${spanRef.current.offsetWidth}px`;
    }
  }, [props.value]);

  return (<>
    {props.textLike && <TextLikeHidden
      ref={spanRef}
      contentEditable
      {...props}
    >
      {props.value}
    </TextLikeHidden>}
    <Field
      ref={textInput}
      onKeyUp={(e) => {
        if (e.key === "Enter" && props.onSubmit) {
          props.onSubmit();
        }
      }}
      {...props}
      onChange={(e) => {
        if (props.onChange) {
          props.onChange(e);
        }
        if (props.textLike && spanRef.current) {
          spanRef.current.innerText = e.target.value;
          e.target.style.width = `${spanRef.current.offsetWidth}px`;
        }
      }}
    />
  </>
  );
};

const Field = styled.input<{ error?: string, textLike?: boolean, value?: string }>`
  margin: ${({ textLike }) => textLike ? "0" : "15px"};
  min-width: ${({ textLike }) => textLike ? "0px" : "20rem"};
  font-size: ${({ textLike }) => textLike ? "unset" : "1.25rem"};
  padding: ${({ textLike }) => textLike ? "0" : "0.5rem"};
  background-color: transparent;
  border: none;
  border-radius: 0;
  border-bottom: ${({ textLike, theme }) => textLike ? "none" : `1px solid ${() => theme.text}80`};
  transition: border-bottom 300ms;
  color: ${({ textLike, theme }) => textLike ? theme.primary : theme.text};
  ::placeholder {
    color: ${({ theme }) => theme.text}80;
  }
  :focus {
    border-bottom: ${({ textLike, theme }) => textLike ? "none" : `1px solid ${() => theme.text}`};
  }
`;

const TextLikeHidden = styled.span<{ error?: string, textLike?: boolean, value?: string }>`
  opacity: 0;
  position: absolute;
  pointer-events: none;
  margin: ${({ textLike }) => textLike ? "0" : "15px"};
  min-width: ${({ textLike }) => textLike ? "0px" : "20rem"};
  font-size: ${({ textLike }) => textLike ? "unset" : "1.25rem"};
  padding: ${({ textLike }) => textLike ? "0" : "0.5rem"};
  resize: ${({ textLike }) => textLike ? "horizontal" : "vertical"};
  background-color: transparent;
  border: none;
  border-radius: 0;
  border-bottom: ${({ textLike, theme }) => textLike ? "none" : `1px solid ${() => theme.text}80`};
  transition: border-bottom 300ms;
  color: ${({ theme }) => theme.text};
  ::placeholder {
    color: ${({ theme }) => theme.text}80;
  }
  :focus {
    border-bottom: ${({ textLike, theme }) => textLike ? "none" : `1px solid ${() => theme.text}`};
  }
  :active {
    border: none;
  }
`;