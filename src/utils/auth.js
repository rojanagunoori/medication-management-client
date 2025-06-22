// utils/auth.js
export function saveToken(token) {
    const expiry = new Date().getTime() + 24 * 60 * 60 * 1000; // 24 hours
    const authData = { token, expiry };
    localStorage.setItem('authToken', JSON.stringify(authData));
  }
  
  export function getValidToken() {
    const data = localStorage.getItem('authToken');
    if (!data) return null;
  
    const { token, expiry } = JSON.parse(data);
    if (new Date().getTime() > expiry) {
      localStorage.removeItem('authToken');
      return null;
    }
  
    return token;
  }
  