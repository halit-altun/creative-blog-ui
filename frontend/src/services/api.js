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
  timeout: 60000, // 60 saniye (Render uyanma + SMTP işlemi)
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for better error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      console.error('Request timeout - Backend might be sleeping on Render');
      return Promise.reject(new Error('İstek zaman aşımına uğradı. Lütfen tekrar deneyin.'));
    }
    
    if (error.response) {
      // Server responded with error
      console.error('Server error:', error.response.data);
      return Promise.reject(
        new Error(error.response.data.message || 'Sunucu hatası oluştu')
      );
    } else if (error.request) {
      // Request made but no response
      console.error('No response from server');
      return Promise.reject(
        new Error('Sunucuya ulaşılamıyor. Lütfen internet bağlantınızı kontrol edin.')
      );
    }
    
    return Promise.reject(error);
  }
);

export const getBlogs = () => apiClient.get('/api/blogs');

export const getBlogByCategory = (category) =>
  apiClient.get(`/api/blogs/${encodeURIComponent(category)}`);

export const sendContactMail = (payload) => apiClient.post('/api/mail/send', payload);

