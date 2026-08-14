import React, { useEffect } from 'react';

export interface MetaTagsProps {
  title: string;
  description: string;
  url?: string;
  image?: string;
  type?: string;
  keywords?: string;
}

export const setMetaTag = (selector: string, attributeName: string, attributeValue: string, content: string) => {
  let element = document.querySelector(selector);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attributeName, attributeValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
};

export const useMetaTags = ({
  title,
  description,
  url,
  image,
  type = 'website',
  keywords,
}: MetaTagsProps) => {
  useEffect(() => {
    // 1. Update Document Title
    const originalTitle = document.title;
    document.title = title;

    // Resolve absolute image URL if relative
    const resolvedImageUrl = image
      ? image.startsWith('http')
        ? image
        : `${window.location.origin}${image.startsWith('/') ? '' : '/'}${image}`
      : `${window.location.origin}/src/assets/images/hero_abacus_banner_1786583611651.jpg`;

    const resolvedUrl = url
      ? url.startsWith('http')
        ? url
        : `${window.location.origin}${url.startsWith('/') ? '' : '/'}${url}`
      : window.location.href;

    // 2. Standard Meta Tags
    setMetaTag('meta[name="description"]', 'name', 'description', description);
    setMetaTag('meta[name="title"]', 'name', 'title', title);
    if (keywords) {
      setMetaTag('meta[name="keywords"]', 'name', 'keywords', keywords);
    }

    // 3. Open Graph Meta Tags
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', title);
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', description);
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', resolvedUrl);
    setMetaTag('meta[property="og:image"]', 'property', 'og:image', resolvedImageUrl);
    setMetaTag('meta[property="og:type"]', 'property', 'og:type', type);
    setMetaTag('meta[property="og:site_name"]', 'property', 'og:site_name', 'SAMATHS SOLUTIONS');

    // 4. Twitter Card Meta Tags (supports both property and name for max compatibility)
    setMetaTag('meta[name="twitter:card"], meta[property="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    setMetaTag('meta[name="twitter:title"], meta[property="twitter:title"]', 'name', 'twitter:title', title);
    setMetaTag('meta[name="twitter:description"], meta[property="twitter:description"]', 'name', 'twitter:description', description);
    setMetaTag('meta[name="twitter:image"], meta[property="twitter:image"]', 'name', 'twitter:image', resolvedImageUrl);
    setMetaTag('meta[name="twitter:url"], meta[property="twitter:url"]', 'name', 'twitter:url', resolvedUrl);

    return () => {
      // Revert title when unmounting if needed
      document.title = originalTitle;
    };
  }, [title, description, url, image, type, keywords]);
};

export const MetaTags: React.FC<MetaTagsProps> = (props) => {
  useMetaTags(props);
  return null;
};
