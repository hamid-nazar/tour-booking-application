import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import * as api from '../utils/api';

const AuthContext = createContext(null);
const AlertContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);

  const showAlert = useCallback((type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 5000);
  }, []);

  useEffect(() => {
    api
      .getMe()
      .then((data) => setUser(data.data.data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  async function login(email, password) {
    const data = await api.login(email, password);
    setUser(data.data.user);
    showAlert('success', 'Logged in successfully!');
    return data;
  }

  async function logout() {
    await api.logout();
    setUser(null);
    showAlert('success', 'Logged out successfully!');
  }

  return (
    <AlertContext.Provider value={{ alert, showAlert }}>
      <AuthContext.Provider value={{ user, setUser, loading, login, logout }}>
        {children}
      </AuthContext.Provider>
    </AlertContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export function useAlert() {
  return useContext(AlertContext);
}
