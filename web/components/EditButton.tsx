// creates a floating edit button that can be used to edit a page in the bottom left corner

import { faPencil } from "@fortawesome/pro-light-svg-icons";
import { faEdit } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import styled from "styled-components";
import { Text } from "./Text";

interface EditButtonProps {
  onClick: () => void;
  isActive: boolean;
}

export const EditButton: React.FC<EditButtonProps> = ({ onClick, isActive }) => {

  return (
    <EditButtonContainer isActive={isActive} onClick={onClick}>
      <FontAwesomeIcon icon={faPencil} />
      <EditTextContainer>
        <Text variant="h5" color="var(--text)">Edit</Text>
      </EditTextContainer>
    </EditButtonContainer>
  );
};

const EditButtonContainer = styled.button<{ isActive: boolean }>`
  background: transparent;
  border: none;
  font-size: 25px;
  position: fixed;
  bottom: 0px;
  left: 0px;
  margin: 40px;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  transition: all 0.2s ease-in-out;
  filter: ${props => props.isActive ? "drop-shadow(0px 0px 2px var(--shadow))" : "none"};
  cursor: pointer;
  color: ${props => props.isActive ? props.theme.primary : props.theme.text};

  &:hover {
    color: ${props => props.isActive ? props.theme.text : props.theme.primary};
  }

  &:active {
    opacity: 0.7;
  }
`;

const EditTextContainer = styled.div`
  margin-left: 10px;
`;