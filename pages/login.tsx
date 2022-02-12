import axios from "axios";
import FadeIn from "react-fade-in";
import useAxios from "axios-hooks";
import { NextPage } from "next";
import styled from "styled-components";
import { FloatingDiv } from "../components/FloatingDiv";
import { LoadingIcon } from "../components/loading/LoadingIcon";
import { TextField } from "../components/TextField";
import { Text } from "../components/Text";
import { Button } from "../components/Button";
import { useEffect, useState } from "react";
import Router from "next/router";

const isNullOrWhitespace = (input?: string | null) => {
  return !input || !input.trim();
};

const Login: NextPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [
    { data: canCreateNewUser, loading: initialLoading },
    checkCanCreateAdminAccount,
  ] = useAxios<boolean>("/api/auth/can-create", { manual: true });

  const [{ data: isValid, loading: isValidating }, validate] =
    useAxios<boolean>("/api/auth/validate", { manual: true });

  const [{ data: registerResult, loading: loadingRegister }, executeRegister] =
    useAxios<
      { authToken?: string; error?: string },
      { email: string; password: string; firstName: string; lastName: string }
    >(
      {
        url: "/api/auth/register",
        method: "POST",
      },
      { manual: true }
    );

  const [{ data: loginResult, loading: loadingLogin }, executeLogin] = useAxios<
    { authToken?: string; error?: string },
    { email: string; password: string }
  >(
    {
      url: "/api/auth/login",
      method: "POST",
    },
    { manual: true }
  );

  const login = async () => {
    await executeLogin({
      data: {
        email,
        password,
      },
    });
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
    await checkCanCreateAdminAccount();
  };
  const register = async () => {
    await executeRegister({
      data: {
        email,
        firstName,
        lastName,
        password,
      },
    });
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
    await checkCanCreateAdminAccount();
  };
  useEffect(() => {
    if (
      !isNullOrWhitespace(registerResult?.authToken) ||
      !isNullOrWhitespace(loginResult?.authToken)
    ) {
      sessionStorage.setItem(
        "authToken",
        registerResult?.authToken ?? loginResult?.authToken ?? ""
      );
    }
    if (!isNullOrWhitespace(sessionStorage.getItem("authToken"))) {
      Router.push("/");
    }
  }, [registerResult, loginResult]);

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    if (!isNullOrWhitespace(token)) {
      validate({ headers: { Authorization: token! } });
    }
  }, []);

  useEffect(() => {
    if (isValid) {
      Router.push("/");
    }
  }, [isValid]);

  useEffect(() => {
    checkCanCreateAdminAccount();
  }, []);

  return (
    <>
      <LoginContainer>
        {initialLoading || isValidating ? (
          <LoadingIcon size={300} />
        ) : (
          <>
            {canCreateNewUser && (
              <FadeIn wrapperTag={FieldsContainer}>
                <Text variant="h2">Register Admin Account</Text>
                <TextField
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                  onSubmit={async () => {
                    await login();
                  }}
                  value={firstName}
                  type="text"
                  placeholder="First Name"
                />
                <TextField
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                  onSubmit={async () => {
                    await login();
                  }}
                  value={lastName}
                  type="text"
                  placeholder="Last Name"
                />
                <TextField
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  onSubmit={async () => {
                    await login();
                  }}
                  value={email}
                  type="email"
                  placeholder="Email"
                />
                <TextField
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  onSubmit={async () => {
                    await register();
                  }}
                  value={password}
                  type="password"
                  placeholder="Password"
                />
                <Button
                  onClick={async () => {
                    await register();
                  }}
                  loading={loadingRegister}
                >
                  Register
                </Button>
              </FadeIn>
            )}
            {!canCreateNewUser && (
              <FadeIn wrapperTag={FieldsContainer}>
                <Text variant="h2">Login to Admin Account</Text>
                <TextField
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  onSubmit={async () => {
                    await login();
                  }}
                  value={email}
                  type="email"
                  placeholder="Email"
                />
                <TextField
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  onSubmit={async () => {
                    await login();
                  }}
                  value={password}
                  type="password"
                  placeholder="Password"
                />
                <Button
                  onClick={async () => {
                    await login();
                  }}
                  loading={loadingLogin}
                >
                  Login
                </Button>
              </FadeIn>
            )}
          </>
        )}
      </LoginContainer>
    </>
  );
};

const FieldsContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const LoginContainer = styled.div`
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
`;

export default Login;
