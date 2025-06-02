import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Music2, User, Lock } from 'lucide-react';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt:', { username, password });

    // 假資料模擬登入狀態
    const guestUser = {
      name: username || '訪客用戶',
      email: 'guest@example.com',
      avatar: null
    };
    localStorage.setItem('spotify_user_profile', JSON.stringify(guestUser));
    navigate('/personal-schedule');
  };

  const base64urlencode = (str) => {
    return btoa(String.fromCharCode.apply(null, new Uint8Array(str)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  };

  const generateCodeVerifier = () => {
    const array = new Uint8Array(64);
    window.crypto.getRandomValues(array);
    return Array.from(array, dec => ('0' + dec.toString(16)).slice(-2)).join('');
  };

  const generateCodeChallenge = async (codeVerifier) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return base64urlencode(digest);
  };

  const handleSpotifyLogin = async () => {
    const clientId = '6fa9ec7028c949dab0487d51a1d38476';
    const redirectUri = 'http://127.0.0.1:5173/callback';
    const scope = 'user-read-email user-read-private';

    const codeVerifier = generateCodeVerifier();
    const codeChallenge = await generateCodeChallenge(codeVerifier);
    localStorage.setItem('pkce_code_verifier', codeVerifier);

    const authUrl = `https://accounts.spotify.com/authorize?` +
      `response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&scope=${encodeURIComponent(scope)}&code_challenge_method=S256&code_challenge=${codeChallenge}`;

    window.location.href = authUrl;
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Orange background with logo */}
      <div className="w-full md:w-1/2 bg-[#EF6D21] flex items-center justify-center py-8 md:py-0">
        <div className="text-white text-center">
          <img 
            src="/pictures/logo.png" 
            alt="Logo" 
            className="w-64 mx-auto mb-4"
          />
        </div>
      </div>

      {/* Login form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">登入</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">名稱</label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10 block w-full rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-[#EF6D21] focus:border-transparent"
                  placeholder="請輸入名稱"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">密碼</label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 block w-full rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-[#EF6D21] focus:border-transparent"
                  placeholder="請輸入密碼"
                />
              </div>
              <div className="flex justify-end mt-1">
                <a href="#" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
                  忘記密碼？
                </a>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#EF6D21] text-white py-2.5 px-4 rounded-lg hover:bg-[#df6319] transition-colors"
            >
              登入
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">或</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSpotifyLogin}
              className="w-full bg-[#1DB954] text-white py-2.5 px-4 rounded-lg hover:bg-[#1aa34a] transition-colors flex items-center justify-center gap-2"
            >
              <Music2 className="w-5 h-5" />
              使用 Spotify 登入
            </button>

            <div className="flex items-center">
              <button
                type="button"
                onClick={() => navigate('/register')}
                className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
              >
                註冊
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
