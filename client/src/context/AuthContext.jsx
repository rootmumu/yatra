import React, { createContext, useContext, useState, useEffect } from 'react';
import { adminLogin, getAdminMe } from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [adminUser, setAdminUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('yathra_admin_token');
    if (token) {
      getAdminMe()
        .then(res => {
          if (res.data.success) {
            setAdminUser(res.data.user);
          } else {
            localStorage.removeItem('yathra_admin_token');
          }
        })
        .catch(() => {
          localStorage.removeItem('yathra_admin_token');
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (username, password) => {
    const res = await adminLogin({ username, password });
    if (res.data.success && res.data.token) {
      localStorage.setItem('yathra_admin_token', res.data.token);
      setAdminUser(res.data.user);
      return { success: true };
    }
    return { success: false, message: res.data.message || 'Login failed' };
  };

  const logout = () => {
    localStorage.removeItem('yathra_admin_token');
    setAdminUser(null);
  };

  return (
    <AuthContext.Provider value={{ adminUser, loading, login, logout, isAuthenticated: !!adminUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
