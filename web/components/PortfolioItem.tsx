import { useData } from "@/lib/useData";
import { useEditing } from "@/lib/useEditing";
import { Portfolio } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { TextField as TextFieldBase } from "@/components/TextField";
import {
  faTrash,
  faPlus,
  faCheck,
  faMultiply,
  faArrowRight,
} from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FileUploader } from "react-drag-drop-files";
import { LoadingIcon } from "@/components/loading/LoadingIcon";
import FadeIn from "react-fade-in/lib/FadeIn";

export interface PortfolioItemProps {
  portfolioItem?: Portfolio;
}

export const PortfolioItem = (props: PortfolioItemProps) => {
  const url = props.portfolioItem?.imageSrc;
  const { replace } = useRouter();
  const { editing } = useEditing();
  const [image, setImage] = useState<File | null>(null);
  const {
    portfolio: { delete: remove, add, modify },
  } = useData();
  const [showUploader, setShowUploader] = useState(false);
  const [dirty, setDirty] = useState(false);

  const [title, setTitle] = useState(props.portfolioItem?.title || "");
  const [description, setDescription] = useState(
    props.portfolioItem?.description || ""
  );
  const [link, setLink] = useState(props.portfolioItem?.link || "");

  const addNewPortfolioItem = async () => {
    setShowUploader(true);
    let arrText: string | undefined = undefined;
    if (image) {
      arrText = Buffer.from(await image.arrayBuffer()).toString("base64");
    }
    await add({
      ...props.portfolioItem,
      title,
      description,
      link,
      imageContent: arrText,
    });
    setShowUploader(false);
    reset();
  };

  useEffect(() => {
    if (
      props.portfolioItem &&
      (props.portfolioItem.title !== title ||
        props.portfolioItem.description !== description ||
        props.portfolioItem.link !== link ||
        image)
    ) {
      setDirty(true);
    }
    if (!props.portfolioItem && (title || description || link || image)) {
      setDirty(true);
    }
  }, [title, description, link, image]);

  const reset = () => {
    setTitle(props.portfolioItem?.title || "");
    setDescription(props.portfolioItem?.description || "");
    setLink(props.portfolioItem?.link || "");
    setImage(null);
    setDirty(false);
  };

  return (
    <>
      {(props.portfolioItem || editing) && (
        <PortfolioItemContainer
          editing={editing}
          imgUrl={
            (url ?? undefined) ||
            (image ? URL.createObjectURL(image) : undefined)
          }
          skeleton={!props.portfolioItem}
        >
          {showUploader && (
            <LoadingIconContainer>
              <FadeIn>
                <LoadingIcon />
              </FadeIn>
            </LoadingIconContainer>
          )}
          <TextField
            editable={editing}
            variant="h2"
            textLike
            value={title}
            onChange={(e) => {
              editing && setTitle(e.target.value);
            }}
            placeholder="Title"
          />
          {editing && (
            <TextField
              editable={editing}
              variant="h4"
              textLike
              value={link}
              onChange={(e) => {
                editing && setLink(e.target.value);
              }}
              placeholder="Link"
            />
          )}
          <TextField
            editable={editing}
            variant="p"
            textLike
            value={description}
            onChange={(e) => {
              editing && setDescription(e.target.value);
            }}
            placeholder="Description"
          />
          <ActionsContainer>
            {!editing && props.portfolioItem && props.portfolioItem.link && (
              <Button
                buttonType="link"
                onClick={() => {
                  replace(props.portfolioItem!.link!);
                }}
              >
                <FontAwesomeIcon icon={faArrowRight} />
              </Button>
            )}
            {editing && (
              <>
                {!props.portfolioItem && dirty && (
                  <Button buttonType="add" onClick={addNewPortfolioItem}>
                    <FontAwesomeIcon icon={faPlus} />
                  </Button>
                )}
                {props.portfolioItem && dirty && (
                  <Button
                    buttonType="save"
                    onClick={async () => {
                      let arrText: string | undefined = undefined;
                      if (image) {
                        arrText = Buffer.from(
                          await image.arrayBuffer()
                        ).toString("base64");
                      }
                      await modify({
                        ...props.portfolioItem,
                        title,
                        description,
                        link,
                        imageContent: arrText,
                      });
                      reset();
                    }}
                  >
                    <FontAwesomeIcon icon={faCheck} />
                  </Button>
                )}
                {dirty && (
                  <Button
                    buttonType="cancel"
                    onClick={() => {
                      reset();
                    }}
                  >
                    <FontAwesomeIcon icon={faMultiply} />
                  </Button>
                )}
                {props.portfolioItem && (
                  <Button
                    buttonType="delete"
                    onClick={() => {
                      remove(props.portfolioItem!.id);
                    }}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                )}
              </>
            )}
          </ActionsContainer>
          {editing && (
            <FileUploader
              type={["JPG", "JPEG"]}
              handleChange={(file: File) => {
                setImage(file);
              }}
            >
              <PortfolioDropZone />
            </FileUploader>
          )}
        </PortfolioItemContainer>
      )}
    </>
  );
};

const LoadingIconContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(1rem);
  z-index: 3;
`;

const PortfolioItemContainer = styled.div<{
  skeleton?: boolean;
  imgUrl?: string;
  editing?: boolean;
}>`
  width: 80vw;
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 1rem;
  background-color: transparent;
  box-shadow: 0 0 1rem var(--shadow);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 1rem;
  position: relative;
  overflow: hidden;
  transition: all 0.2s ease-in-out;
  border: ${(props) =>
    props.skeleton ? "1px dashed var(--secondary)" : "none"};
  > label {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  ::before {
    content: "";
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background: var(--paper);
    background-image: url(${(props) => props.imgUrl});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    opacity: 0.2;
    transition: all 0.2s ease-in-out;
    filter: blur(${(props) => (props.editing ? "0.5rem" : "1px")});
  }
`;

const Button = styled.button<{
  buttonType: "save" | "add" | "delete" | "cancel" | "link";
}>`
  z-index: 2;
  background: none;
  border: none;
  cursor: pointer;
  height: 100%;
  padding: 0 1rem;

  transition: all 0.2s ease-in-out;

  > svg {
    font-size: 2rem;
    color: var(--text);
    transition: all 0.2s ease-in-out;
  }

  &:hover {
    background-color: ${(props) =>
      ["delete", "cancel"].includes(props.buttonType)
        ? props.theme.error
        : props.theme.primary}40;
    backdrop-filter: blur(20px);
  }
`;

const ActionsContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-start;
  align-items: center;
`;

const PortfolioDropZone = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  bottom: 0;

  cursor: pointer;

  transition: all 0.2s ease-in-out;
  border-radius: 1rem;

  :hover {
    background-color: ${({ theme }) => theme.background}C0;
    backdrop-filter: blur(5px);
  }
`;

const TextField = styled(TextFieldBase)`
  z-index: 2;
`;
