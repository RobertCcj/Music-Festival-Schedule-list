import { createContext, useContext, useEffect, useState } from 'react';

const UserProfileContext = createContext(null);

export const UserProfileProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // 初始化從 localStorage 讀取使用者資料
    const stored = localStorage.getItem('spotify_user_profile');
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem('spotify_user_profile', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('spotify_user_profile');
    setUser(null);
  };

  return (
    <UserProfileContext.Provider value={{ user, login, logout }}>
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUserProfile = () => useContext(UserProfileContext);
