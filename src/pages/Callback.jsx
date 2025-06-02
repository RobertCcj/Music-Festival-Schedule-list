import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserProfile } from '../contexts/UserProfileContext';

function Callback() {
  const navigate = useNavigate();
  const { login } = useUserProfile();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const codeVerifier = localStorage.getItem('pkce_code_verifier');

    if (!code || !codeVerifier) {
      console.error('❌ 缺少 code 或 code_verifier');
      navigate('/login');
      return;
    }

    const exchangeToken = async () => {
      const clientId = '6fa9ec7028c949dab0487d51a1d38476'; // ← 換成你的 client ID
      const redirectUri = 'http://127.0.0.1:5173/callback';

      const body = new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
        client_id: clientId,
        code_verifier: codeVerifier,
      });

      try {
        const response = await fetch('https://accounts.spotify.com/api/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body,
        });

        const data = await response.json();

        if (data.access_token) {
          localStorage.setItem('spotify_access_token', data.access_token);

          const userResponse = await fetch('https://api.spotify.com/v1/me', {
            headers: {
              Authorization: `Bearer ${data.access_token}`
            }
          });

          const userData = await userResponse.json();
          console.log('🎧 Spotify 使用者資訊:', userData);

          login({
            name: userData.display_name,
            email: userData.email,
            avatar: userData.images?.[0]?.url ?? null
          });

          navigate('/personal-schedule');
        } else {
          console.error('❌ 無法取得 token:', data);
          navigate('/login');
        }
      } catch (err) {
        console.error('❌ 錯誤:', err);
        navigate('/login');
      }
    };

    exchangeToken();
  }, []);

  return <div className="text-center mt-20 text-lg">登入中，請稍候...</div>;
}

export default Callback;
