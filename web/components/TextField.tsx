import React, { ChangeEventHandler, EventHandler, useEffect } from "react";
import styled from "styled-components";

type VariantType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";

interface TextFieldProps {
  type?: "text" | "email" | "password";
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  placeholder?: string;
  error?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  onSubmit?: () => void;
  textLike?: boolean;
  editable?: boolean;
  fullWidth?: boolean;
}

export const TextField = (props: TextFieldProps) => {
  // create a ref to store the textInput DOM element
  const textArea = React.useRef<HTMLTextAreaElement>(null);
  const spanRef = React.useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (textArea.current && props.textLike && spanRef.current) {
      spanRef.current.innerText = props.value || props.placeholder || "";
      textArea.current.style.width = `calc(${
        spanRef.current.scrollWidth
      }px + ${textSizeFromVariant(props.variant || "p")})`;
    }
  });

  return (
    <>
      {props.textLike && (
        <TextLikeHidden
          ref={spanRef}
          contentEditable={props.editable !== false}
          {...props}
        >
          {props.value}
        </TextLikeHidden>
      )}
      <Field
        ref={textArea}
        spellCheck={props.editable !== false}
        onFocus={(e) => {
          if (props.editable === false) {
            e.target.blur();
          }
        }}
        onKeyUp={(e) => {
          if (e.key === "Enter" && props.onSubmit) {
            props.onSubmit();
          }
        }}
        {...props}
        rows={1}
        editable={props.editable !== false}
        onChange={(e) => {
          if (props.onChange) {
            props.onChange(e);
          }
        }}
      />
    </>
  );
};

const textSizeFromVariant = (variant: VariantType) => {
  switch (variant) {
    case "h1":
      return "2.5rem";
    case "h2":
      return "2rem";
    case "h3":
      return "1.75rem";
    case "h4":
      return "1.5rem";
    case "h5":
      return "1.25rem";
    case "h6":
      return "1rem";
    case "p":
      return "1rem";
    case "span":
      return "1rem";
  }
};

const Field = styled.textarea<{
  error?: string;
  textLike?: boolean;
  value?: string;
  variant?: VariantType;
  editable?: boolean;
  fullWidth?: boolean;
}>`
  margin: ${({ textLike }) => (textLike ? "0" : "15px")};
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "auto")};
  min-width: ${({ textLike }) => (textLike ? "0px" : "20rem")};
  font-size: ${({ textLike, variant }) =>
    variant ? textSizeFromVariant(variant) : textLike ? "unset" : "1.25rem"};
  padding: ${({ textLike }) => (textLike ? "0" : "0.5rem")};
  background-color: transparent;
  border: none;
  border-radius: 0;
  border-bottom: ${({ textLike, theme }) =>
    textLike ? "none" : `1px solid ${() => theme.text}80`};
  transition: border-bottom 300ms;
  resize: none;
  color: ${({ textLike, theme, editable }) =>
    textLike && editable ? theme.primary : theme.text};
  ::placeholder {
    color: ${({ theme }) => theme.text}80;
  }
  :focus {
    border-bottom: ${({ textLike, theme }) =>
      textLike ? "none" : `1px solid ${() => theme.text}`};
  }
`;

const TextLikeHidden = styled.span<{
  error?: string;
  textLike?: boolean;
  value?: string;
  variant?: VariantType;
}>`
  opacity: 0;
  position: absolute;
  pointer-events: none;
  margin: ${({ textLike }) => (textLike ? "0" : "15px")};
  min-width: ${({ textLike }) => (textLike ? "0px" : "20rem")};
  font-size: ${({ textLike, variant }) =>
    variant ? textSizeFromVariant(variant) : textLike ? "unset" : "1.25rem"};
  padding: ${({ textLike }) => (textLike ? "0" : "0.5rem")};
  resize: ${({ textLike }) => (textLike ? "horizontal" : "vertical")};
  background-color: transparent;
  border: none;
  border-radius: 0;
  border-bottom: ${({ textLike, theme }) =>
    textLike ? "none" : `1px solid ${() => theme.text}80`};
  transition: border-bottom 300ms;
  color: ${({ theme }) => theme.text};
  ::placeholder {
    color: ${({ theme }) => theme.text}80;
  }
  :focus {
    border-bottom: ${({ textLike, theme }) =>
      textLike ? "none" : `1px solid ${() => theme.text}`};
  }
  :active {
    border: none;
  }
`;
