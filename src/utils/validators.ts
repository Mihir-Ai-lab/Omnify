export const isEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const isPhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
};

export const isStrongPassword = (password: string): boolean => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return strongPasswordRegex.test(password);
};

export const validateRequired = (value: string): string | null => {
  return value.trim() === '' ? 'This field is required' : null;
};

export const validateEmail = (email: string): string | null => {
  if (!email.trim()) return 'Email is required';
  if (!isEmail(email)) return 'Please enter a valid email address';
  return null;
};

export const validatePassword = (password: string): string | null => {
  if (!password) return 'Password is required';
  if (password.length < 8) return 'Password must be at least 8 characters';
  if (!isStrongPassword(password)) {
    return 'Password must contain uppercase, lowercase, number, and special character';
  }
  return null;
};

export const validateUrl = (url: string): string | null => {
  if (!url.trim()) return 'URL is required';
  if (!isUrl(url)) return 'Please enter a valid URL';
  return null;
};

export const validatePhoneNumber = (phone: string): string | null => {
  if (!phone.trim()) return 'Phone number is required';
  if (!isPhoneNumber(phone)) return 'Please enter a valid phone number';
  return null;
};