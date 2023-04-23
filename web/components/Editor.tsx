import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import styled from "styled-components";

export const Editor = styled(ReactQuill)`
  .ql-editor,
  .ql-container,
  .ql-toolbar {
    border: none;
    background-color: ${({ theme }) => theme.paper};
    color: ${({ theme }) => theme.text};
  }
  .ql-toolbar {
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
    border-bottom: 1px solid ${({ theme }) => theme.shadow};
    * {
      color: ${({ theme }) => theme.text};
      font-weight: 600 !important;
      background-color: ${({ theme }) => theme.paper};
      &:hover {
        color: ${({ theme }) => theme.secondary} !important;
      }
      &:active,
      .ql-selected,
      .ql-active {
        color: ${({ theme }) => theme.primary} !important;
      }
    }
    svg {
      filter: ${({ theme }) => theme.svgFilter};
      background-color: transparent;
    }
  }
  .ql-editor {
    p {
      font-size: 0.85rem;
    }
    &.ql-blank::before {
      color: ${({ theme }) => theme.subduedText};
    }
    max-height: 60vh;
  }

  .ql-container {
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
  }

  display: flex;
  flex-direction: column;

  > :first-child {
    flex-shrink: 1;
  }

  > :last-child {
    flex-grow: 1;
  }

  width: 100%;
  height: 100%;
  min-height: 30vh;
`;
