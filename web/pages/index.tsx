import type { NextPage } from "next";
import axios from "axios";
import Head from "next/head";
import styled, { useTheme } from "styled-components";
import { About } from "../components/sub-screens/About";
import { Home } from "../components/sub-screens/Home";
import { Contact } from "../components/sub-screens/Contact";
import { Canvas, useFrame } from "@react-three/fiber";
import { AsciiRenderer } from "@react-three/drei";
import { useRef, useState } from "react";
import { Mesh } from "three";
import { ThemeProps } from "@/components/ThemeConfig";

let x = 0;
let y = 0;

const index: NextPage = () => {

  window.addEventListener("mousemove", (e) => {
    x = (e.clientX - window.innerWidth / 2) / window.innerWidth * 2;
    y = (e.clientY - window.innerHeight / 2) / window.innerHeight * 2;
  });

  return (
    <div>
      <Head>
        <title>Mohammad Al-Ahdal | Home</title>
      </Head>
      <VerticalWrapper>
        <Background>
          <Canvas camera={{ position: [0, 0, 3] }}>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <Box />
          </Canvas>
        </Background>
        <FullPage id="~">
          <Home />
        </FullPage>
        <FullPage id="about">
          <About />
        </FullPage>
        <FullPage id="contact">
          <Contact />
        </FullPage>
      </VerticalWrapper>
    </div>
  );
};

const Box = () => {
  const { background } = useTheme() as ThemeProps;
  const meshRef = useRef<Mesh>() as React.MutableRefObject<Mesh>;
  useFrame(() => {
    if (meshRef.current) {
      // get closer to the mouse
      meshRef.current.position.x += (x - meshRef.current.position.x) * 0.03;
      meshRef.current.position.y -= (y - -meshRef.current.position.y) * 0.03;


      // rotate the box
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.z += 0.01;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxBufferGeometry args={[0.3, 0.3, 0.3]} />
      <meshStandardMaterial color={background} />
    </mesh>
  );
};


const VerticalWrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 300vh;
  top: 0px;
  left: 0px;
  padding: 0px;
  margin: 0px;
  z-index: 0;
`;

const FullPage = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 0px;
  margin: 0px;
`;

const Background = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0px;
  left: 0px;
  padding: 0px;
  margin: 0px;
  z-index: -1;
`

export default index;
