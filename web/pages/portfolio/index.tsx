import { PortfolioItem } from "@/components/PortfolioItem";
import { NextPage } from "next";
import { useData } from "@/lib/useData";
import styled from "styled-components";
import { useEffect } from "react";

const Portfolio: NextPage = () => {
  const {
    portfolio: { items: portfolioItems, get },
  } = useData();

  useEffect(() => {
    get();
  }, []);

  return (
    <>
      <PortfolioContainer>
        {portfolioItems.map((item) => (
          <PortfolioItem key={item.id} portfolioItem={item} />
        ))}
        <PortfolioItem />
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
