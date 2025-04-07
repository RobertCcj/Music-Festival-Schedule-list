import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Header({ showMenu = false }) {
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
    <header className="bg-[#EF6D21] w-full p-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="flex items-center cursor-pointer" onClick={handleLogoClick}>
          <img 
            src="/pictures/logo.png" 
            alt="Logo" 
            className="h-12 w-auto"
          />
        </div>
        
        {showMenu && (
          <div className="flex flex-col md:flex-row items-start md:items-center mt-4 md:mt-0 space-y-2 md:space-y-0 md:space-x-6">
            <nav className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6">
              {menuItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`text-black ${
                    location.pathname === item.path
                      ? 'opacity-100 border-b-2 border-black'
                      : 'opacity-37'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </nav>
            <button
              onClick={() => navigate('/login')}
              className="text-black hover:opacity-75 transition-opacity"
            >
              登出
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;