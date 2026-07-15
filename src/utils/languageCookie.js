export const LANGUAGE_COOKIE = 'preferredLanguage';

export const getLanguageCookie = () => {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${LANGUAGE_COOKIE}=([^;]*)`));
  const value = match ? decodeURIComponent(match[1]) : null;
  return value === 'en' || value === 'tr' ? value : null;
};

export const setLanguageCookie = (lang) => {
  if (typeof document === 'undefined') return;
  const maxAge = 365 * 24 * 60 * 60;
  document.cookie = `${LANGUAGE_COOKIE}=${encodeURIComponent(lang)}; path=/; max-age=${maxAge}; SameSite=Lax`;
};

export const hasLanguagePreference = () => Boolean(getLanguageCookie());
