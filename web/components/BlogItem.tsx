import { useEditing } from "@/lib/useEditing";
import { Blog } from "@prisma/client";
import styled from "styled-components";
import { useState } from "react";
import { Button } from "./Button";
import axios from "axios";


export const BlogItem = ({ blog, onDelete }: { blog: Blog, onDelete: (id: string) => void }) => {
  const { editing } = useEditing();
  return (
    <BlogItemContainer>
      <h2>{blog.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: blog.markdown }}></div>
      <ActionContainer>
        <Button href={`/blog/${blog.id}`}>
          {editing ? "Edit" : "View"}
        </Button>
        {editing && <>
          <Button onClick={async () => { await axios.delete(`/api/blog/${blog.id}`); onDelete(blog.id) }}>Delete</Button>
        </>
        }
      </ActionContainer>
    </BlogItemContainer>
  );
};

const BlogItemContainer = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.paper};
  width: 100%;
  border-radius: 0.5rem;
  box-shadow: 0px 0px 10px 0px ${({ theme }) => theme.shadow};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 1rem;
  overflow: hidden;
  > * {
    margin: 1rem;
  }
  > h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 1rem 0rem 1rem 1rem;
  }
  > div {
    max-height: 5em;
    width: 100%;
    font-size: 0.85rem;
    font-weight: 400;
    line-height: 1.5rem;
    > p {
      margin: 0rem;
      font-size: 1rem;
    }
  }

  img {
    max-width: calc(100% - 2rem);
  }
`;

const ActionContainer = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  margin: 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 1rem;
  background: linear-gradient( 0deg, ${({ theme }) => theme.paper} 40%, ${({ theme }) => theme.paper}00 100%);
  > * {
    margin: 0rem;
    z-index: 1;
  }
  > *:last-child {
    border-bottom-right-radius: 0.5rem;
  }
`;
