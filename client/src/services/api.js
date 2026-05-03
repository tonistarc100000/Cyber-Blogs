// 💡 The interceptor is smart — every single API call automatically includes the token if the user is logged in.You write it once, it works everywhere.No need to manually add headers every time.


import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api',
});

// Automatically attach token to every request if it exists
API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

// Posts
export const getAllPosts = () => API.get('/posts');
export const getPostBySlug = (slug) => API.get(`/posts/${slug}`);
export const getAllPostsAdmin = () => API.get('/posts/admin/all');
export const createPost = (data) => API.post('/posts', data);
export const updatePost = (id, data) => API.put(`/posts/${id}`, data);
export const deletePost = (id) => API.delete(`/posts/${id}`);

// Projects
export const getAllProjects = () => API.get('/projects');
export const createProject = (data) => API.post('/projects', data);
export const updateProject = (id, data) => API.put(`/projects/${id}`, data);
export const deleteProject = (id) => API.delete(`/projects/${id}`);

// Auth
export const login = (data) => API.post('/auth/login', data);