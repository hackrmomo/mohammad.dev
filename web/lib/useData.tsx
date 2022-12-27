// provides a global context for various data such as photos, portfolioItems, and blogPosts

import { Blog, Photograph, Portfolio } from '@prisma/client';
import React, { createContext, ReactNode, useContext, useState } from 'react';
import axios from 'axios';

interface AddPhotoProps {
  fileContent: string;
}


interface DataContextProps {
  photos: {
    items: Photograph[];
    get: () => Promise<void>;
    add: (photo: AddPhotoProps) => Promise<void>;
    delete: (id: string) => Promise<void>;
    modify: (photo: Photograph) => Promise<void>;
  }

  portfolio: {
    items: Portfolio[];
    get: () => Promise<void>;
    add: (portfolioItem: Portfolio) => Promise<void>;
    delete: (id: string) => Promise<void>;
    modify: (portfolioItem: Portfolio) => Promise<void>;
  }

  blog: {
    items: Blog[];
    get: () => Promise<void>;
    add: (blogPost: Blog) => Promise<void>;
    delete: (id: string) => Promise<void>;
    modify: (blogPost: Blog) => Promise<void>;
  }
}

const DataContext = createContext<DataContextProps>({
  photos: {
    items: [],
    get: async () => { },
    add: async () => { },
    delete: async () => { },
    modify: async () => { },
  },
  portfolio: {
    items: [],
    get: async () => { },
    add: async () => { },
    delete: async () => { },
    modify: async () => { },
  },
  blog: {
    items: [],
    get: async () => { },
    add: async () => { },
    delete: async () => { },
    modify: async () => { },
  },
});

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [photos, setPhotos] = useState<Photograph[]>([]);
  const [portfolio, setPortfolio] = useState<Portfolio[]>([]);
  const [blog, setBlog] = useState<Blog[]>([]);

  const getPhotos = async () => {
    const { data } = await axios.get('/api/photography');
    setPhotos(data.photographs);
  };

  const addPhoto = async (photo: AddPhotoProps) => {
    await axios.post('/api/photography', photo);
    await getPhotos();
  };

  const deletePhoto = async (id: string) => {
    await axios.delete(`/api/photography/${id}`);
    await getPhotos();
  };

  const modifyPhoto = async (photo: Photograph) => {
    await axios.put(`/api/photography/${photo.id}`, photo);
    await getPhotos();
  };

  const getPortfolio = async () => {
    const { data } = await axios.get('/api/portfolio');
    setPortfolio(data.portfolio);
  };

  const addPortfolioItem = async (portfolioItem: Portfolio) => {
    await axios.post('/api/portfolio', portfolioItem);
    await getPortfolio();
  };

  const deletePortfolioItem = async (id: string) => {
    await axios.delete(`/api/portfolio/${id}`);
    await getPortfolio();
  };

  const modifyPortfolioItem = async (portfolioItem: Portfolio) => {
    await axios.put(`/api/portfolio/${portfolioItem.id}`, portfolioItem);
    await getPortfolio();
  };

  const getBlog = async () => {
    const { data } = await axios.get('/api/blog');
    setBlog(data.blog);
  };

  const addBlogPost = async (blogPost: Blog) => {
    await axios.post('/api/blog', blogPost);
    await getBlog();
  };

  const deleteBlogPost = async (id: string) => {
    await axios.delete(`/api/blog/${id}`);
    await getBlog();
  };

  const modifyBlogPost = async (blogPost: Blog) => {
    await axios.put(`/api/blog/${blogPost.id}`, blogPost);
    await getBlog();
  };

  return (
    <DataContext.Provider
      value={{
        photos: {
          items: photos,
          get: getPhotos,
          add: addPhoto,
          delete: deletePhoto,
          modify: modifyPhoto,
        },
        portfolio: {
          items: portfolio,
          get: getPortfolio,
          add: addPortfolioItem,
          delete: deletePortfolioItem,
          modify: modifyPortfolioItem,
        },
        blog: {
          items: blog,
          get: getBlog,
          add: addBlogPost,
          delete: deleteBlogPost,
          modify: modifyBlogPost,
        },
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);