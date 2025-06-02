import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { UserProfileProvider } from './contexts/UserProfileContext'; // ✅ 引入 Context 提供器
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProfileProvider>
      <App />
    </UserProfileProvider>
  </StrictMode>
);
