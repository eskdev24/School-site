/**
 * Form validation utilities for emails and phone numbers.
 */

export const isValidEmail = (email: string): boolean => {
  if (!email || !email.trim()) return false;
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return emailRegex.test(email.trim());
};

export const isValidPhone = (phone: string): boolean => {
  if (!phone || !phone.trim()) return false;
  // Remove spaces, hyphens, parentheses, dots
  const cleaned = phone.trim().replace(/[\s\-().]/g, '');
  // Must be 9 to 15 digits, allowing optional leading +
  const phoneRegex = /^(\+?\d{9,15})$/;
  return phoneRegex.test(cleaned);
};
