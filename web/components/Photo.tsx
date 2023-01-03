import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Photograph } from "@prisma/client"
import axios from "axios";
import { useEditing } from "@/lib/useEditing";
import { faTrash, faPlus, faCheck, faMultiply } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FileUploader } from "react-drag-drop-files";
import { useData } from "@/lib/useData";
import { useRouter } from "next/router";
import FadeIn from "react-fade-in"
import { LoadingIcon } from "./loading/LoadingIcon";

interface PhotoProps {
  photograph?: Photograph;
}

export const Photo = ({ photograph }: PhotoProps) => {
  const url = photograph?.src;
  const { replace } = useRouter();
  const { editing } = useEditing();
  const [file, setFile] = useState<File | null>(null);
  const { photos: { delete: remove, add } } = useData();
  const [loaded, setLoaded] = useState(false);
  const [showUploader, setShowUploader] = useState(false);

  const checkPhotoLoaded = () => {
    if (!url) {
      return;
    }
    const img = new Image();
    img.onload = () => {
      setLoaded(true);
    };
    img.src = url;
  }

  const addNewPhoto = async () => {
    if (!file) {
      return;
    }
    // add to body
    setShowUploader(true);
    const arrText = Buffer.from(await file.arrayBuffer()).toString("base64");

    await add({ fileContent: arrText });

    setShowUploader(false);
    setFile(null);
  }

  useEffect(() => {

    checkPhotoLoaded();
  }, [url]);


  return (
    <>
      {photograph && <>
        {!loaded && <PhotoSkeleton isLoading>
          <LoadingIcon />
        </PhotoSkeleton>}
        {loaded && <FadeIn transitionDuration={300}>
          <PhotoContainer {...{ url }}>
            <LinkContainer editing={editing} onClick={() => { replace(`/photography/${photograph.id}`, undefined, { shallow: true }) }} />
            <ActionContainer>
              {editing && (
                <DeleteButton onClick={() => remove(photograph.id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </DeleteButton>
              )}
            </ActionContainer>
          </PhotoContainer>
        </FadeIn>}
      </>}
      {!photograph && !file && <>
        <FileUploader type={["JPG", "JPEG"]} handleChange={(file: File) => { setFile(file) }}>
          <PhotoSkeleton>
            <FontAwesomeIcon icon={faPlus} />
          </PhotoSkeleton>
        </FileUploader>
      </>}
      {!photograph && file && <>
        <PhotoSkeleton url={URL.createObjectURL(file)}>
          {showUploader && <LoadingIcon />}
          {!showUploader && <>
            <AddButton onClick={addNewPhoto}>
              <FontAwesomeIcon icon={faCheck} />
            </AddButton>
            <ActionContainer>
              <CancelButton onClick={() => {
                setFile(null);
              }}>
                <FontAwesomeIcon icon={faMultiply} />
              </CancelButton>
            </ActionContainer>
          </>
          }
        </PhotoSkeleton>
      </>}
    </>
  );
};

const PhotoSkeleton = styled.div<{ url?: string, isLoading?: boolean }>`
  position: relative;
  width: ${() => window.innerWidth > 576 ? "30vw" : "90vw"};
  height: ${() => window.innerWidth > 576 ? "30vw" : "90vw"};
  border-radius: 1rem;
  border: ${props => props.isLoading ? "none" : "2px dashed var(--primary)"};
  cursor: pointer;
  transition: all 300ms ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  filter: blur(1px);
  background: ${({ url }) => (url ? `url(${url})` : "none")};
  background-size: cover;
  background-position: center center;
  color: ${({ url }) => (url ? "var(--success)" : "var(--primary)")};

  &:hover {
    border: ${props => props.isLoading ? "none" : "2px dashed var(--secondary)"};
    filter: blur(0px);
  }
`;


const PhotoContainer = styled.div<{ url?: string }>`
  position: relative;
  background: ${({ url }) => (url ? `url(${url})` : "none")};
  background-size: cover;
  background-position: center center;
  width: ${() => window.innerWidth > 576 ? "30vw" : "90vw"};
  height: ${() => window.innerWidth > 576 ? "30vw" : "90vw"};
`;

const LinkContainer = styled.div<{ editing: boolean }>`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-grow: 1;
  background-color: ${({ editing }) => editing ? "rgba(0, 0, 0, 0.5)" : "none"};
  transition: background-color 300ms ease-in-out;
  cursor: pointer;
`;

const ActionContainer = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  padding: 1rem;
`

const DeleteButton = styled.button`
  background: transparent;
  border: none;
  color: white;
  font-size: 2.5rem;
  cursor: pointer;
  transition: transform 300ms, filter 300ms;

  &:hover {
    filter: drop-shadow(0px 0px 2px var(--shadow));
  }

  &:active {
    transform: scale(0.9);
  }
`

const CancelButton = styled.button`
  background: transparent;
  border: none;
  color: #F00;
  font-size: 2.5rem;
  cursor: pointer;
  transition: transform 300ms, filter 300ms;

  &:hover {
    filter: drop-shadow(0px 0px 2px var(--shadow));
  }

  &:active {
    transform: scale(0.9);
  }
`

const AddButton = styled.button`
  background: transparent;
  border: none;
  color: var(--success);
  font-size: 2.5rem;
  cursor: pointer;
  transition: transform 300ms, filter 300ms;
  width: 100%;
  height: 100%;

  &:hover {
    filter: drop-shadow(0px 0px 2px var(--shadow));
  }

  &:active {
    transform: scale(0.9);
  }
`