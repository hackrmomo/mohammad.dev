import React, { useEffect } from "react";
import { NextPage } from "next";
import styled from "styled-components";
import { Photo } from "@/components/Photo";
import { useEditing } from "@/lib/useEditing";
import { useData } from "@/lib/useData";
import { useRouter } from "next/router";
import { PhotoPage } from "@/components/PhotoPage";

const Photography: NextPage = () => {
  const { editing } = useEditing();
  const {
    photos: { get, items: photos },
  } = useData();
  const { query } = useRouter();

  const prev = (slug: string) => {
    const index = photos.findIndex((photo) => photo.id === slug);
    if (index > 0) {
      return photos[index - 1].id;
    }
    return undefined;
  };

  const next = (slug: string) => {
    const index = photos.findIndex((photo) => photo.id === slug);
    if (index < photos.length - 1) {
      return photos[index + 1].id;
    }
    return undefined;
  };

  useEffect(() => {
    get();
  }, []);

  return (
    <>
      <PhotographyContainer>
        <PhotographyInternalContainer>
          {photos.map((photo) => (
            <Photo key={photo.id} photograph={photo} />
          ))}
          {editing && <Photo key="new" />}
        </PhotographyInternalContainer>
        {query.slug && query.slug[0] && (
          <>
            <PhotoPage
              slug={query.slug[0]}
              next={next(query.slug[0])}
              prev={prev(query.slug[0])}
            />
          </>
        )}
      </PhotographyContainer>
    </>
  );
};

const PhotographyContainer = styled.div`
  position: absolute;
  display: flex;
  width: 100vw;
  top: 15vh;
  left: 0px;
  padding-bottom: 10vh;
  justify-content: center;
`;

const PhotographyInternalContainer = styled.div`
  z-index: 0;
  display: ${() => (window.innerWidth > 576 ? "grid" : "flex")};
  flex-direction: column;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-gap: 10px;
  justify-content: space-around;
`;

export default Photography;
