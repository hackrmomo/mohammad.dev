import Link from "next/link";
import { ReactNode } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

interface NavLinkProps {
  special?: boolean;
  children: ReactNode;
  to: string;
}

export const NavLink = ({ special, children, to }: NavLinkProps) => {
  const { pathname } = useRouter();
  const selected = pathname === to;
  const BoundingDiv = styled.div`
    margin-top: ${special ? "6px" : "16px"};
    margin-right: ${special ? "26px" : "15px"};
    margin-left: 15px;
    > a {
      color: ${({ theme }) => (selected ? theme.primary : theme.default)};
      text-decoration: none;
      font-size: 1.56rem;
    }
    border: ${({ theme }) =>
      special
        ? `2px solid ${selected ? theme.primary : theme.default}`
        : "unset"};
    padding: ${special ? "9.5px 42.5px" : "unset"};
  `;

  return (
    <BoundingDiv>
      <Link href={to}>{children}</Link>
    </BoundingDiv>
  );
};
