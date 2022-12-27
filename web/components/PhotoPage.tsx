import React from "react";
import { useEditing } from "@/lib/useEditing";
import { useData } from "@/lib/useData";
import { useRouter } from "next/router";
import styled from "styled-components";
import { faChevronRight, faChevronLeft, faCheck } from "@fortawesome/pro-thin-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FadeIn from "react-fade-in/lib/FadeIn";
import { TextField } from "./TextField";

export interface PhotoPageProps {
  slug: string;
  next?: string;
  prev?: string;
}

export const PhotoPage = (props: PhotoPageProps) => {
  const { editing } = useEditing();
  const { photos: { items: photos, modify } } = useData();
  const { replace } = useRouter();

  const [imageSize, setImageSize] = React.useState({ width: 0, height: 0 });
  const photo = photos.find((photo) => photo.id === props.slug)!;

  const [aperture, setAperture] = React.useState(photo?.aperture.split("f/")[1].trim() || "");
  const [focal, setFocal] = React.useState(photo?.focal.split("mm")[0].trim() || "");
  const [shutter, setShutter] = React.useState(photo?.shutter.split("sec")[0].trim() || "");
  const [iso, setIso] = React.useState(photo?.iso.split("ISO")[1].trim() || "");
  const [location, setLocation] = React.useState(photo?.location || "");

  // capture left and right arrow keys and escape key
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // make sure we're not in an input
      if (event.target instanceof HTMLInputElement) {
        return;
      }
      if (event.key === "ArrowLeft") {
        if (props.prev) {
          replace(`/photography/${props.prev}`, undefined, { shallow: true });
        }
      } else if (event.key === "ArrowRight") {
        if (props.next) {
          replace(`/photography/${props.next}`, undefined, { shallow: true });
        }
      } else if (event.key === "Escape") {
        replace(`/photography`, undefined, { shallow: true });
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [props.prev, props.next]);

  React.useEffect(() => {
    setAperture(photo?.aperture.split("f/")[1].trim() || "");
    setFocal(photo?.focal.split("mm")[0].trim() || "");
    setShutter(photo?.shutter.split("sec")[0].trim() || "");
    setIso(photo?.iso.split("ISO")[1].trim() || "");
    setLocation(photo?.location || "");
  }, [photo]);

  const getImageSize = (src: string) => {
    const img = new Image();
    img.onload = () => {
      setImageSize({ width: img.width, height: img.height });
    };
    img.src = src;
  };

  React.useEffect(() => {
    if (photo) {
      getImageSize(photo.src)
    }
  }, [photo]);


  return (
    <>
      <PhotoOverlay>
        {photo && !editing &&
          <ExifContainer>
            <FadeIn>
              <span>{photo.aperture}</span>
              <span>{photo.focal}</span>
              <span>{photo.shutter}</span>
              <span>{photo.iso}</span>
              <span>{new Date(photo.takenAt).toDateString()}</span>
              <span>{photo.location}</span>
            </FadeIn>
          </ExifContainer>
        }
        {photo && editing &&
          <ExifContainer editing>
            <FadeIn>
              <span>f/ <TextField textLike value={aperture} onChange={(e) => setAperture(e.target.value)} /></span>
              <span><TextField textLike value={focal} onChange={(e) => setFocal(e.target.value)} /> mm</span>
              <span><TextField textLike value={shutter} onChange={(e) => setShutter(e.target.value)} /> sec</span>
              <span>ISO <TextField textLike value={iso} onChange={(e) => setIso(e.target.value)} /></span>
              <span>{new Date(photo.takenAt).toDateString()}</span>
              <span><TextField textLike value={location} onChange={(e) => setLocation(e.target.value)} /></span>
              <SaveButton onClick={() => {
                modify({
                  ...photo,
                  aperture: `f/${aperture}`,
                  focal: `${focal} mm`,
                  shutter: `${shutter} sec`,
                  iso: `ISO ${iso}`,
                  location,
                })
              }}>
                <FontAwesomeIcon icon={faCheck} />
              </SaveButton>

            </FadeIn>
          </ExifContainer>
        }
        {imageSize.width > 0 && imageSize.height > 0 && <>
          <PhotoImg src={photo?.src} width={imageSize.width} height={imageSize.height} />

        </>}

        <ChevronHolder available={props.prev} onClick={() => { props.prev && replace(`/photography/${props.prev}`, undefined, { shallow: true }) }} side="left">
          <FadeIn visible={props.prev !== undefined}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </FadeIn>
        </ChevronHolder>
        <ChevronHolder available={props.next} onClick={() => { props.next && replace(`/photography/${props.next}`, undefined, { shallow: true }) }} side="right">
          <FadeIn visible={props.next !== undefined}>
            <FontAwesomeIcon icon={faChevronRight} />
          </FadeIn>
        </ChevronHolder>
        <ClickableBackground onClick={() => replace(`/photography`, undefined, { shallow: true })} />
      </PhotoOverlay>
    </>
  );
};

const ExifContainer = styled.div<{ editing?: boolean }>`
  position: absolute;
  top: 0px;
  left: 0px;
  width: ${() => window.innerWidth > 576 ? "unset" : "100%"};
  align-items: center;
  z-index: 25;
  display: flex;
  padding: 1rem;
  color: white;
  background-color: ${({ theme, editing }) => window.innerWidth > 576 ? editing ? theme.background + "CC" : "transparent" : theme.background + "CC"};
  font-size: ${() => window.innerWidth > 576 ? "1.5rem" : "1rem"};
  > * {
    display: flex;
    flex-direction: column;
    > * {
      margin-right: 1rem;
    }
  }
`;

const PhotoOverlay = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.background}CC;
  z-index: 10;
  backdrop-filter: blur(15px);
`;

const PhotoImg = styled.img<{ src: string, width: number, height: number }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: ${props => props.width / window.innerHeight < props.height / window.innerWidth ? "80vw" : "auto"};
  height: ${props => props.width / window.innerHeight < props.height / window.innerWidth ? "auto" : "80vh"};
  z-index: 20;
`;

const ChevronHolder = styled.div<{ side: "left" | "right", available?: string }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${(props) => props.side}: 0px;
  z-index: 20;
  cursor: ${(props) => props.available ? "pointer" : "default"};
  padding: 1rem;
  font-size: 3rem;
`;

const ClickableBackground = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  z-index: 10;
  cursor: pointer;
`;

const SaveButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 2rem;
  color: var(--success);
  cursor: pointer;
`;
