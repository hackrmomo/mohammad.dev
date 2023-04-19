import { useEffect, useState } from "react";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import styled from "styled-components";
import { useEditing } from "@/lib/useEditing";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { Button } from "@/components/Button";
import axios from "axios";
import { TextField } from "@/components/TextField";
import { Blog } from "@prisma/client";
import { BlogItem } from "@/components/BlogItem";
import { Editor } from "@/components/Editor";

const BlogsPage: NextPage = () => {
  const { editing } = useEditing();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [posts, setPosts] = useState<Blog[]>([]);

  useEffect(() => {
    axios.get("/api/blog").then((res) => {
      setPosts(res.data.blogs);
    });
  }, []);

  return (
    <>
      <BlogsContainer>
        {editing && <>
          <NewBlogFormContainer>
            <TextField placeholder="New Blog Post" value={title} onChange={(e) => setTitle(e.target.value)} />
            <Editor
              value={content}
              onChange={setContent}
              placeholder="Liquify your thoughts..."
              modules={{
                toolbar: [
                  [{ header: [1, 2, 3, 4, 5, 6, false] }],
                  ["bold", "italic", "underline", "strike", "blockquote", "link"],
                  [{ list: "ordered" }, { list: "bullet" }, { align: [] }],
                ],
              }}
            />
            <Button onClick={() => {
              axios.post("/api/blog", { title, content })
            }}>Submit</Button>
          </NewBlogFormContainer>
        </>}
        {posts.length > 0 && <>
          <h3>Posted Blog Items</h3>
          <BlogListContainer>
            {posts.map((post) => (
              <BlogItem blog={post} onDelete={(id) => {
                setPosts(posts.filter((post) => post.id !== id))
              }} />
            ))}
          </BlogListContainer>
        </>}
        {posts.length === 0 && !editing && <h2>No blog posts yet. I should really get writing...</h2>}
      </BlogsContainer>
    </>
  );
};

const BlogsContainer = styled.div`
  width: 100vw;
  padding: 0px;
  margin: 10rem 0px;
  z-index: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  h3 {
    width: 80%;
    margin: 2rem 0px;
  }
`;

const NewBlogFormContainer = styled.div`
  width: 80%;
  min-height: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  position: relative;
  > button {
    position: absolute;
    bottom: 0;
    margin: 0;
    z-index: 1;
    border-bottom-right-radius: 0.5rem;
  }
  > :first-child {
    width: 100%;
    margin: 0rem 0rem 1rem 0rem;
    padding: 1rem 0rem;
  }
`

const BlogListContainer = styled.div`
  width: 80vw ;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 2.5rem;
  margin-bottom: 2.5rem;
`;

export default BlogsPage;
