import { createContext, useContext, useReducer, useState } from "react";
import { uuid } from "../utils/uuid";

export type Blog = {
    id: string;
    title: string;
    content: string;
}

const BlogContext = createContext<{
    blogs: Blog[];
    deleteBlogPost: (id: string) => void;
    editBlogPost: (updatedBlog: Blog) => void;
    addBlogPost: (newBlog: Omit<Blog, "id">) => void;
}>(null);

const blogReducer = (state: Blog[], action: {
    type: 'add_blog' | 'delete_blog' | 'edit_blog'
    payload: Blog
}) => {
    switch (action.type) {
        case 'add_blog':
            return [...state, action.payload];

        case 'delete_blog':
            return state.filter(eachBlog => { return eachBlog.id !== action.payload.id });

        case 'edit_blog':
            return state.map(eachBlog => {
                if (eachBlog.id === action.payload.id) return action.payload
                return eachBlog
            })

        default:
            return state;
    }
}

export const BlogProvider = ({ children }) => {
    const [blogs, dispatch] = useReducer(blogReducer, [{ id: uuid(), title: 'Sample Title', content: 'Dummy Content' }])

    const addBlogPost = (newBlog: Omit<Blog, 'id'>) => {
        dispatch({ payload: { ...newBlog, id: uuid() }, type: 'add_blog' })
    }

    const deleteBlogPost = (id: string) => {
        dispatch({ payload: { id, content: '', title: '' }, type: 'delete_blog' })
    }

    const editBlogPost = (updatedBlog: Blog) => {
        dispatch({ payload: updatedBlog, type: 'edit_blog' })
    }

    return <BlogContext.Provider value={{
        blogs: blogs,
        addBlogPost: addBlogPost,
        editBlogPost: editBlogPost,
        deleteBlogPost: deleteBlogPost,
    }}>{children}</BlogContext.Provider>
}

export const useBlogContext = () => {
    return useContext(BlogContext);
};