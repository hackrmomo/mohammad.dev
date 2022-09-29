import { NextPage } from "next";
import styled from "styled-components";

const Photography: NextPage = () => {
  return (
    <>
      <PhotographyContainer>
        <h2>Under Construction</h2>
      </PhotographyContainer>
    </>
  );
};

const PhotographyContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  top: 0px;
  left: 0px;
  padding: 0px;
  margin: 0px;
  z-index: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
`;

export default Photography;