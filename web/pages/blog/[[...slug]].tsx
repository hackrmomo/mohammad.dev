import { useEffect, useState } from "react";
import { NextPage } from "next";
import styled from "styled-components";
import { useEditing } from "@/lib/useEditing";
import { Button } from "@/components/Button";
import axios from "axios";
import { TextField } from "@/components/TextField";
import { Blog } from "@prisma/client";
import { BlogItem } from "@/components/BlogItem";
import { Editor } from "@/components/Editor";
import { useRouter } from "next/router";

const BlogsPage: NextPage = () => {
  const { editing, setEditing } = useEditing();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [posts, setPosts] = useState<Blog[]>([]);
  const { query } = useRouter();
  const [blog, setBlog] = useState<Blog | null>(null);

  const getBlog = async () => {
    if (!query.slug) return;
    if (typeof query.slug === "string") return;
    if (query.slug.length < 1) return;
    const { data } = await axios.get<{ blog: Blog }>(
      `/api/blog/${query.slug[0]}`
    );
    setBlog(data.blog);
  };

  useEffect(() => {
    getBlog();
    console.log("query changed", query.slug);
  }, [query.slug]);

  useEffect(() => {
    axios.get("/api/blog").then((res) => {
      setPosts(res.data.blogs);
    });
  }, []);

  useEffect(() => {
    if (blog) {
      setPosts(
        posts.map((post) => {
          if (post.id === blog.id) {
            return blog;
          }
          return post;
        })
      );
    }
  }, [blog]);

  return (
    <RootContainer>
      {query.slug && query.slug.length > 0 && (
        <>
          <BlogContainer>
            {!blog && <h1>Loading...</h1>}
            {blog && (
              <>
                {editing && (
                  <>
                    <TextField
                      variant="h1"
                      value={blog.title}
                      onChange={(e) => {
                        setBlog({ ...blog, title: e.target.value });
                      }}
                      fullWidth
                    />
                    <Editor
                      value={blog.markdown}
                      onChange={(value) => {
                        setBlog({ ...blog, markdown: value });
                      }}
                      modules={{
                        Clipboard: {
                          matchVisual: false,
                        },
                      }}
                    />
                    <div>
                      <Button
                        onClick={async () => {
                          const { data } = await axios.put<{ blog: Blog }>(
                            `/api/blog/${blog.id}`,
                            blog
                          );
                          setBlog(data.blog);
                          setEditing(false);
                          setTitle("");
                          setContent("");
                        }}
                      >
                        Save
                      </Button>
                    </div>
                  </>
                )}
                {!editing && (
                  <>
                    <h1>{blog.title}</h1>
                    <div
                      dangerouslySetInnerHTML={{ __html: blog.markdown }}
                    ></div>
                  </>
                )}
              </>
            )}
          </BlogContainer>
        </>
      )}
      {(!query.slug || query.slug.length < 1) && (
        <>
          <BlogsContainer>
            {editing && (
              <>
                <NewBlogFormContainer>
                  <TextField
                    placeholder="New Blog Post"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <Editor
                    value={content}
                    onChange={setContent}
                    placeholder="Liquify your thoughts..."
                    modules={{
                      toolbar: [
                        [{ header: [1, 2, 3, 4, 5, 6, false] }],
                        [
                          "bold",
                          "italic",
                          "underline",
                          "strike",
                          "blockquote",
                          "link",
                        ],
                        [
                          { list: "ordered" },
                          { list: "bullet" },
                          { align: [] },
                        ],
                      ],
                      Clipboard: {
                        matchVisual: false,
                      },
                    }}
                  />
                  <Button
                    onClick={async () => {
                      const { data } = await axios.post<{ blog: Blog }>(
                        "/api/blog",
                        { title, content }
                      );
                      setPosts([...posts, data.blog]);
                      setTitle("");
                      setContent("");
                    }}
                  >
                    Submit
                  </Button>
                </NewBlogFormContainer>
              </>
            )}
            {posts.length > 0 && (
              <>
                <h3>Posted Blog Items</h3>
                <BlogListContainer>
                  {posts.map((post) => (
                    <BlogItem
                      key={post.id}
                      blog={post}
                      onDelete={(id) => {
                        setPosts(posts.filter((post) => post.id !== id));
                      }}
                    />
                  ))}
                </BlogListContainer>
              </>
            )}
            {posts.length === 0 && !editing && (
              <h2>No blog posts yet. I should really get writing...</h2>
            )}
          </BlogsContainer>
        </>
      )}
    </RootContainer>
  );
};

const BlogsContainer = styled.div`
  width: 100vw;
  max-height: 100vh;
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

const BlogContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10rem 1rem 2.5rem 1rem;
  max-width: 1200px;
  justify-content: center;
  align-items: center;
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
`;

const RootContainer = styled.div`
  width: 100vw;
  padding: 0px;
  margin: 0px;
  z-index: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
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
`;

const BlogListContainer = styled.div`
  width: 80vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 2.5rem;
  margin-bottom: 2.5rem;
`;

export default BlogsPage;
