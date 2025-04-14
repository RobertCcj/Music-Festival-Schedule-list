import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Dialog } from '@headlessui/react';
import { cn } from '../utils/cn'; // 需另外建立這個工具函數

function Header({ showMenu = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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
          <nav className="hidden md:flex items-center space-x-8">
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
            <button
              onClick={() => navigate('/login')}
              className="text-primary-600 hover:text-accent transition-colors"
            >
              登出
            </button>
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
              {/* <div className="p-4 border-b border-primary-200">
                <h2 className="text-lg font-medium text-primary-900">メニュー</h2>
              </div> */}
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
              <div className="p-4 border-t border-primary-200">
                <button
                  onClick={() => {
                    navigate('/login');
                    setIsOpen(false);
                  }}
                  className="text-primary-600 hover:text-accent transition-colors"
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
