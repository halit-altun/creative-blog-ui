import axios from 'axios';

const DEFAULT_API_URL = 'https://creative-blog-ui-1.onrender.com';

const rawApiUrl = import.meta.env.VITE_API_URL;
const API_URL =
  typeof rawApiUrl === 'string' &&
  rawApiUrl.trim() &&
  rawApiUrl !== 'undefined' &&
  rawApiUrl !== 'null'
    ? rawApiUrl.trim().replace(/\/$/, '')
    : DEFAULT_API_URL;

export const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 25000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getBlogs = () => apiClient.get('/api/blogs');

export const getBlogByCategory = (category) =>
  apiClient.get(`/api/blogs/${encodeURIComponent(category)}`);
