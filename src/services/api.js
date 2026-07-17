import axios from 'axios';

const rawApiUrl = import.meta.env.VITE_API_URL;
const API_URL =
  typeof rawApiUrl === 'string' &&
  rawApiUrl.trim() &&
  rawApiUrl !== 'undefined' &&
  rawApiUrl !== 'null'
    ? rawApiUrl.trim().replace(/\/$/, '')
    : '';

export const apiClient = axios.create(API_URL ? { baseURL: API_URL } : {});

export const getBlogs = () => apiClient.get('/api/blogs');

export const getBlogByCategory = (category) =>
  apiClient.get(`/api/blogs/${encodeURIComponent(category)}`);

export const sendContactMail = (payload) => apiClient.post('/api/mail/send', payload);
