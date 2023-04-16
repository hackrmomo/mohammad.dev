import { Button } from "@/components/Button";
import { Text } from "@/components/Text";
import { TextField } from "@/components/TextField";
import axios from "axios";
import fileDownload from "js-file-download";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import styled from "styled-components";
import { useEditing } from "@/lib/useEditing";

const Resume: NextPage = () => {
  const { editing } = useEditing();
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [domain, setDomain] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const { status } = useSession();

  const addNewResume = async () => {
    if (!file) {
      return;
    }
    // add to body
    const arrText = Buffer.from(await file.arrayBuffer()).toString("base64");

    const result = await axios.post("/api/resume", {
      domain,
      resume: arrText,
    });

    if (result.data) {
      setFile(null);
      setDomain("");
    }
  }

  useEffect(() => {
    const emailRegex = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/);
    if (emailRegex.test(email)) {
      setIsValidEmail(true)
    } else {
      setIsValidEmail(false)
    }
  })

  const getResumeFromEmail = async () => {
    const result = await axios.get(`/api/resume/${email}`, {
      responseType: "blob",
    });
    fileDownload(result.data, `Mohammad Al-Ahdal ${email.split("@")[1].split(".")[0]}.pdf`, "application/pdf");
  }

  return (
    <>
      <ResumeContainer>
        {!editing && <>
          <Text variant="h3">To download my resume, please provide your email address</Text>
          <TextField placeholder="Email Address" onSubmit={getResumeFromEmail} value={email} onChange={(e) => { setEmail(e.target.value) }} />
          <Button disabled={!isValidEmail} onClick={getResumeFromEmail}>Download</Button>
        </>}
        {editing && <>
          {file && <>
            <TextField onSubmit={addNewResume} placeholder="Provide domain" value={domain} onChange={(e) => { setDomain(e.target.value) }} />
            <Button onClick={addNewResume}>Add</Button>
          </>}
          {!file && <>
            <FileUploader types={["PDF"]} handleChange={(file: File) => { setFile(file) }}>
              <DropZone>
                <Text variant="h3">Drop your resume here</Text>
              </DropZone>
            </FileUploader>
          </>}
        </>}
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

const DropZone = styled.div`
  position: fixed;
  top: 15%;
  left: 15%;
  right: 15%;
  bottom: 15%;
  border: 2px dashed ${props => props.theme.primary};
  border-radius: 20px;
  background: transparent;
  padding: 20px;
  margin: 100px;
  filter: blur(1px);
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  :hover {
    border: 2px dashed ${props => props.theme.secondary};
    filter: blur(0px);
  }
`;

export default Resume;
