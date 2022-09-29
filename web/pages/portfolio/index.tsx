import { NextPage } from "next";
import styled from "styled-components";

const Portfolio: NextPage = () => {
  return (
    <>
      <PortfolioContainer>
        <h2>Under Construction</h2>
      </PortfolioContainer>
    </>
  );
};

const PortfolioContainer = styled.div`
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

export default Portfolio;
