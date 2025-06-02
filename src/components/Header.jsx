import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Dialog } from '@headlessui/react';
import { cn } from '../utils/cn'; // 需另外建立這個工具函數
import { useUserProfile } from '../contexts/UserProfileContext'; // 新增：導入 context

function Header({ showMenu = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useUserProfile(); // 新增：取得 user 資訊

  const menuItems = [
    { name: '個人行程', path: '/personal-schedule' },
    { name: '團隊行程', path: '/team-schedule' },
    { name: '創建個人歌單', path: '/create-playlist' }
  ];

  const handleLogoClick = () => {
    if (showMenu) {
      navigate('/personal-schedule');
    } else {
      navigate('/login');
    }
  };

  const handleLogout = () => {
    logout(); // 清除 context 與 localStorage
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 w-full z-40">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center cursor-pointer" onClick={handleLogoClick}>
          <img 
            src="/pictures/logo.png" 
            alt="Logo" 
            className="h-10 w-auto"
          />
        </div>

        {/* 桌面版選單 */}
        {showMenu && (
          <nav className="hidden md:flex items-center space-x-6">
            {menuItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={cn(
                  "text-primary-600 hover:text-accent transition-colors",
                  location.pathname === item.path && "text-accent font-medium"
                )}
              >
                {item.name}
              </button>
            ))}
            <div className="flex items-center gap-2 pl-4 border-l border-gray-300">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt="使用者頭像"
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm text-white">
                  ?
                </div>
              )}
              <span className="text-sm text-primary-600">
                {user?.name || '訪客'}
              </span>
              <button
                onClick={handleLogout}
                className="ml-2 text-primary-600 hover:text-accent transition-colors text-sm"
              >
                登出
              </button>
            </div>
          </nav>
        )}

        {/* 手機版漢堡按鈕 */}
        {showMenu && (
          <button className="md:hidden text-primary-600" onClick={() => setIsOpen(true)}>
            ☰
          </button>
        )}

        {/* 手機版選單（Dialog） */}
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50 md:hidden">
          <Dialog.Panel className="fixed right-0 top-0 w-64 h-full bg-white shadow-xl">
            <div className="flex flex-col h-full">
              <div className="flex flex-col flex-grow p-4 space-y-4">
                {menuItems.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => {
                      navigate(item.path);
                      setIsOpen(false);
                    }}
                    className={cn(
                      "text-left text-primary-600 hover:text-accent transition-colors",
                      location.pathname === item.path && "text-accent font-medium"
                    )}
                  >
                    {item.name}
                  </button>
                ))}
              </div>

              <div className="p-4 border-t border-primary-200 space-y-2">
                <div className="flex items-center gap-2">
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt="使用者頭像"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm text-white">
                      ?
                    </div>
                  )}
                  <span className="text-sm text-primary-600">{user?.name || '訪客'}</span>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="text-primary-600 hover:text-accent transition-colors text-sm"
                >
                  登出
                </button>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </div>
    </header>
  );
}

export default Header;
