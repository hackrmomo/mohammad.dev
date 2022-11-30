import {
  KBarAnimator,
  KBarPortal,
  KBarPositioner,
  KBarResults,
  KBarSearch,
  useMatches,
  Action
} from "kbar";
import { signIn, signOut } from "next-auth/react";
import Router from "next/router";
import styled from "styled-components";

export const useActions = (status: "authenticated" | "loading" | "unauthenticated", isDarkMode: boolean, toggle: () => void) => {
  return [
    {
      id: "switchTheme",
      name: isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode",
      keywords: "dark light theme mode",
      perform: () => toggle(),
    },
    {
      id: "/",
      name: "Home",
      keywords: "home",
      perform: () => Router.push("/"),
    },
    {
      id: "#about",
      name: "About",
      keywords: "about mohammad hackr momo",
      perform: () => Router.push("/#about"),
    },
    {
      id: "#contact",
      name: "Contact",
      keywords: "contact mohammad hackr momo",
      perform: () => Router.push("/#contact"),
    },
    {
      id: "/portfolio",
      name: "Portfolio",
      keywords: "doing things making engineering",
      perform: () => Router.push("/portfolio"),
    },
    {
      id: "/blog",
      name: "Blog",
      keywords: "writing words",
      perform: () => Router.push("/blog"),
    },
    {
      id: "/photography",
      name: "Photography",
      keywords: "photos camera shoot gallery",
      perform: () => Router.push("/photography"),
    },
    {
      id: status === "authenticated" ? "logout" : status === "unauthenticated" ? "login" : "loading",
      name: status === "authenticated" ? "Logout" : status === "unauthenticated" ? "Login" : "Loading...",
      keywords: "photos camera shoot gallery",
      perform: () => status === "authenticated" ? signOut() : status === "unauthenticated" ? signIn() : null,
    }
  ] as Action[];
};

export const RenderResults = () => {
  const { results } = useMatches();

  return (
    <KbarResultsContainer>
      <KBarResults
        items={results}
        onRender={({ item, active }) =>
          typeof item === "string" ? (
            <>{item}</>
          ) : (
            <KbarResultItem selected={active}>{item.name}</KbarResultItem>
          )
        }
      />
    </KbarResultsContainer>
  );
};

export const KbarResultsContainer = styled.div`
  z-index: 15;
  position: relative;
  padding-top: 0.3rem;
  transform: translateY(-0.3rem);
  background-color: ${({ theme }) => theme.sheet};
  border-bottom-right-radius: 0.3rem;
  border-bottom-left-radius: 0.3rem;
  > * > * > :last-child > * {
    padding-bottom: 1.05rem;
    border-bottom-right-radius: 0.3rem;
    border-bottom-left-radius: 0.3rem;
  }
  > * > * > :first-child > * {
    position: relative;
    padding-top: 1.05rem;
  }
`;

export const KbarResultItem = styled.div<{ selected: boolean }>`
  font-size: 1.25rem;
  padding: 0.75rem;
  transition: color 150ms, background-color 150ms;
  color: ${({ theme, selected }) => (selected ? "white" : theme.text)};
  background-color: ${({ theme, selected }) =>
    selected ? `${theme.secondary}80` : "unset"};
`;

export const KbarSkeleton = () => {
  return (
    <KBarPortal>
      <KBarPositioner>
        <KBarAnimator
          style={{
            filter: "drop-shadow(0px 0px 10px var(--shadow))",
          }}
        >
          <KBarSearch
            defaultPlaceholder=""
            style={{
              background: "var(--paper)",
              color: "var(--text)",
              border: "none",
              padding: "1rem",
              borderRadius: "0.3rem 0.3rem 0rem 0rem",
              minWidth: 500,
              fontSize: "1.25rem",
              zIndex: 20,
              position: "relative",
            }}
          />
          <RenderResults />
        </KBarAnimator>
      </KBarPositioner>
    </KBarPortal>
  );
};
