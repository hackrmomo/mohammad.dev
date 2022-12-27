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
import { setEditing } from "@/lib/useEditing";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faInfoCircle, faEnvelope, faSunAlt, faMoonStars, faPage, faTerminal, faPenNib, faCamera, faRightToBracket, faRightFromBracket, faEdit, faCheck } from "@fortawesome/pro-thin-svg-icons";

export const useActions = (status: "authenticated" | "loading" | "unauthenticated", isEditing: boolean, isDarkMode: boolean, toggle: () => void) => {
  const actions: Action[] = []
  try {
    Router.prefetch("/")
  } catch {
    // Do nothing. Sometimes this fails on page load since the router isn't used as a client-side component.
  }
  actions.push({
    id: "switchTheme",
    name: isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode",
    keywords: "dark light theme mode",
    icon: <FontAwesomeIcon icon={isDarkMode ? faSunAlt : faMoonStars} />,
    perform: () => toggle(),
  });
  actions.push({
    id: "/",
    name: "Home",
    keywords: "home",
    icon: <FontAwesomeIcon icon={faHouse} />,
    perform: () => Router.push("/#~", undefined, { shallow: true, scroll: false }),
  });
  actions.push({
    id: "#about",
    name: "About",
    keywords: "about mohammad hackr momo",
    icon: <FontAwesomeIcon icon={faInfoCircle} />,
    perform: () => Router.push("/#about", undefined, { shallow: true, scroll: false }),
  });
  actions.push({
    id: "#contact",
    name: "Contact",
    keywords: "contact mohammad hackr momo",
    icon: <FontAwesomeIcon icon={faEnvelope} />,
    perform: () => Router.push("/#contact", undefined, { shallow: true, scroll: false }),
  });
  actions.push({
    id: "/resume",
    name: "Resume",
    keywords: "resume work job hire",
    icon: <FontAwesomeIcon icon={faPage} />,
    perform: () => Router.push("/resume", undefined, { shallow: true }),
  });
  actions.push({
    id: "/portfolio",
    name: "Portfolio",
    keywords: "doing things making engineering",
    icon: <FontAwesomeIcon icon={faTerminal} />,
    perform: () => Router.push("/portfolio", undefined, { shallow: true }),
  });
  actions.push({
    id: "/blog",
    name: "Blog",
    keywords: "writing words",
    icon: <FontAwesomeIcon icon={faPenNib} />,
    perform: () => Router.push("/blog", undefined, { shallow: true }),
  });
  actions.push({
    id: "/photography",
    name: "Photography",
    keywords: "photos camera shoot gallery",
    icon: <FontAwesomeIcon icon={faCamera} />,
    perform: () => Router.push("/photography", undefined, { shallow: true }),
  });
  actions.push({
    id: "authenticate",
    name: status === "authenticated" ? "Logout" : status === "unauthenticated" ? "Login" : "Loading...",
    keywords: "photos camera shoot gallery",
    icon: <FontAwesomeIcon icon={status === "authenticated" ? faRightFromBracket : faRightToBracket} />,
    perform: () => status === "authenticated" ? signOut() : status === "unauthenticated" ? signIn() : null,
  });
  if (status === "authenticated") {
    actions.push({
      id: "editing",
      name: isEditing ? "Stop Editing" : "Edit",
      keywords: "edit",
      icon: <FontAwesomeIcon icon={isEditing ? faCheck : faEdit} />,
      perform: () => isEditing ? setEditing(false) : setEditing(true),
    });
  }
  return actions;
}

export const RenderResults = () => {
  const { results } = useMatches();

  return (
    <KbarResultsContainer>
      <KBarResults
        items={results.sort((a, b) => {
          return typeof a === "string" ? 0 : typeof b === "string" ? 0 : a.id.localeCompare(b.id);
        })}
        onRender={({ item, active, }) =>
          typeof item === "string" ? (
            <>{item}</>
          ) : (
            <KbarResultItem id={item.id} selected={active}>
              {item.icon}
              {item.name}
            </KbarResultItem>
          )
        }
      />
    </KbarResultsContainer>
  );
};

export const KbarResultsContainer = styled.div`
  z-index: 150;
  position: relative;
  margin-top: 5rem;
  transform: translateY(-0.3rem);
  background-color: ${({ theme }) => theme.sheet}D0;
  border-radius: 0.3rem;
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
  padding: 1.5rem;
  transition: color 150ms, background-color 150ms;
  color: ${({ theme, selected }) => (selected ? "white" : theme.text)};
  background-color: ${({ theme, selected }) =>
    selected ? `${theme.secondary}30` : "unset"};

  > svg {
    margin-right: 1rem;
  }
`;

export const KbarSkeleton = () => {
  return (
    <KBarPortal>
      <KBarPositioner style={{
        backdropFilter: "blur(10px)",
        zIndex: 100,
      }}>
        <KBarAnimator
          style={{
            filter: "drop-shadow(0px 0px 10px var(--shadow))",
          }}
        >
          <KBarSearch
            defaultPlaceholder="Search"
            style={{
              background: "var(--paper)",
              color: "var(--text)",
              border: "none",
              padding: "1.5rem",
              borderRadius: "0.3rem",
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
