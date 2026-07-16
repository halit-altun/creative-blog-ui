import axios from 'axios';

const API_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

export const apiClient = axios.create({
  baseURL: API_URL,
});

export const getBlogs = () => apiClient.get('/api/blogs');

export const getBlogByCategory = (category) =>
  apiClient.get(`/api/blogs/${encodeURIComponent(category)}`);
