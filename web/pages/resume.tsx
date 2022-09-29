import { NextPage } from "next";
import styled from "styled-components";
import axios from 'axios'
import fileDownload from 'js-file-download'
import { useEffect } from "react";

const Resume: NextPage = () => {
  const downloadResume = async () => {
    const res = await axios.get("/resume.pdf", {
      responseType: 'blob',
    });
    fileDownload(res.data, "Mohammad Al-Ahdal Resume.pdf");

  }
  useEffect(() => {
    downloadResume()
  }, []);

  return (
    <>
      <ResumeContainer>
        <h2>Under Construction</h2>
        <p style={{ fontSize: 12 }}>(but you can still download it 👾)</p>
      </ResumeContainer>
    </>
  );
};

const ResumeContainer = styled.div`
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

export default Resume;
