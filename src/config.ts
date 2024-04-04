import Logo from 'assets/logo.png';
import WhiteLogo from 'assets/white-logo.png';

const env = {
    ...process.env,
};

export const socialShareLink = {
    instagram: (url: string): string => `https://www.instagram.com/sharer.php?=${encodeURIComponent(url)}`,
    facebook: (url: string): string => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: (url: string): string => `http://twitter.com/share?url=${encodeURIComponent(url)}`,
    linkedin: (url: string): string => `https://www.linkedin.com/sharing/share-offsite?url=${encodeURIComponent(url)}`,
    telegram: (url: string): string => `https://t.me/share/url?url=${encodeURIComponent(url)}`,
    whatsappWeb: (url: string): string => `https://web.whatsapp.com/send?text=${encodeURIComponent(url)}`,
    whatsappMobile: (url: string): string => `https://wa.me/?text=${encodeURIComponent(url)}`,
};

export const headerHeight = 80;
export const bottombarHeight = 56;
export const mobileHeaderHeight = 72;

export const VERSION = env.REACT_APP_VERSION;
export const ENVIRONMENT = env.REACT_APP_ENV;
export const API_URL = env.REACT_APP_API_URL;

export const imageTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp'];

export const mobileSize = 'md';

export { Logo, WhiteLogo };
