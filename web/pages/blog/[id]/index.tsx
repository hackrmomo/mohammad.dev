import { useEditing } from "@/lib/useEditing";
import { Blog } from "@prisma/client";
import axios from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { TextField } from "@/components/TextField";
import { Editor } from "@/components/Editor";
import { Button } from "@/components/Button";

const BlogPage: NextPage = () => {
  const { query } = useRouter();
  const [blog, setBlog] = useState<Blog | null>(null);
  const { editing } = useEditing();

  const getBlog = async () => {
    const { data } = await axios.get<{blog: Blog}>(`/api/blog/${query.id}`);
    setBlog(data.blog);
  }

  useEffect(() => {
    if (query.id) {
      getBlog();
    } 
  }, [query]);

  return (
    <BlogContainer>
      {!blog && <h1>Loading...</h1>}
      {blog && <>
        {editing && <>
          <TextField variant="h1" value={blog.title} onChange={(e) => { setBlog({ ...blog, title: e.target.value }) }} />
          <Editor value={blog.markdown} onChange={(value) => { setBlog({ ...blog, markdown: value }) }} />
          <div>
            <Button onClick={async () => { const { data } = await axios.put<{ blog: Blog }>(`/api/blog/${blog.id}`, blog); setBlog(data.blog) }}>Save</Button>
          </div>
        </>}
        {!editing && <>
          <h1>{blog.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: blog.markdown }}></div>
        </>}
      </>}
    </BlogContainer>
  );
};

export const getDynamicPaths = async () => {
  const { data } = await axios.get<{ blogs: Blog[] }>(`/api/blog`);
  return data.blogs.map((blog) => ({ params: { id: blog.id.toString() } }));
}

const BlogContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10rem 1rem 2.5rem 1rem;
  gap: 1rem;
  
  p {
    font-size: 0.85rem;
    margin: 0;
  }
  
  > div {
    display: flex;
    flex-direction: column;
  }
  
  > :last-child {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    button {
      margin: 0;
    }
  }
  `

  export default BlogPage;