import axios from 'axios';

const rawApiUrl = import.meta.env.VITE_API_URL;
const API_URL =
  typeof rawApiUrl === 'string' &&
  rawApiUrl.trim() &&
  rawApiUrl !== 'undefined' &&
  rawApiUrl !== 'null'
    ? rawApiUrl.trim().replace(/\/$/, '')
    : '';

if (!API_URL) {
  console.error(
    '[api] VITE_API_URL is missing. Set it to your Render backend URL (e.g. https://your-api.onrender.com).',
  );
}

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getBlogs = () => apiClient.get('/api/blogs');

export const getBlogByCategory = (category) =>
  apiClient.get(`/api/blogs/${encodeURIComponent(category)}`);

export const sendContactMail = (payload) => apiClient.post('/api/mail/send', payload);
