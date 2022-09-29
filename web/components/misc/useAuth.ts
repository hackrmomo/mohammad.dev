import { AxiosPromise, AxiosRequestConfig } from "axios";
import useAxios, { RefetchOptions } from "axios-hooks";
import Router from "next/router";
import { type } from "os";
import { Dispatch, useEffect, useState } from "react";

const isNullOrWhitespace = (input?: string | null) => {
  return !input || !input.trim();
};

export type UseAuthType = {
  authenticated: boolean;
  loading: boolean;
  authToken?: string;
};

// Login and Register Types

export type LoginType = (
  config?:
    | AxiosRequestConfig<{
        email: string;
        password: string;
      }>
    | undefined,
  options?: RefetchOptions | undefined
) => AxiosPromise<{
  authToken?: string | undefined;
  error?: string | undefined;
}>;

export type RegisterType = (
  config?:
    | AxiosRequestConfig<{
        email: string;
        password: string;
        firstName: string;
        lastName: string;
      }>
    | undefined,
  options?: RefetchOptions | undefined
) => AxiosPromise<{
  authToken?: string | undefined;
  error?: string | undefined;
}>;

export const useAuth: () => [
  UseAuthType,
  { loginLoading: boolean; registerLoading: boolean },
  { login: LoginType; register: RegisterType; logout: () => void }
] = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState<string>();
  const [{ loading, data }, validate] = useAxios<boolean>("/api/auth/validate");

  // Login and Register functions

  const [{ data: loginResult, loading: loginLoading }, login] = useAxios<
    { authToken?: string; error?: string },
    { email: string; password: string }
  >(
    {
      url: "/api/auth/login",
      method: "POST",
    },
    { manual: true }
  );

  const [{ data: registerResult, loading: registerLoading }, register] =
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

  const logout = async () => {
    localStorage.removeItem("authToken");
    setAuthenticated(false);
    setAuthToken(undefined);
  };

  const loginWithExistingAuthToken = async () => {
    const authToken = localStorage.getItem("authToken");
    if (!isNullOrWhitespace(authToken)) {
      validate({
        headers: {
          Authorization: authToken!,
        },
      });
    }
  };

  useEffect(() => {
    if (
      !isNullOrWhitespace(registerResult?.authToken) ||
      !isNullOrWhitespace(loginResult?.authToken)
    ) {
      localStorage.setItem(
        "authToken",
        registerResult?.authToken ?? loginResult?.authToken ?? ""
      );
      setAuthToken(registerResult?.authToken ?? loginResult?.authToken ?? "");
      setAuthenticated(true);
    }
  }, [registerResult, loginResult]);

  useEffect(() => {
    loginWithExistingAuthToken();
  }, [authToken]);

  useEffect(() => {
    if (data) {
      const authToken = localStorage.getItem("authToken");
      setAuthToken(authToken ?? undefined);
      setAuthenticated(true);
      if (Router.pathname === "/login") {
        Router.push("/");
        Router.reload(); // hacky solution for react hook changes not propagating correctly
      }
    }
  }, [data]);

  return [
    { authenticated, loading, authToken },
    { loginLoading, registerLoading },
    { login, register, logout },
  ];
};
