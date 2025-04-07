import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { User, Lock, Mail } from 'lucide-react';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration logic here
    console.log('Registration attempt:', formData);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">註冊</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">名稱</label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
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
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="pl-10 block w-full rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-[#EF6D21] focus:border-transparent"
                  placeholder="請輸入密碼"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">重新輸入密碼</label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  className="pl-10 block w-full rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-[#EF6D21] focus:border-transparent"
                  placeholder="請重新輸入密碼"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="pl-10 block w-full rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-[#EF6D21] focus:border-transparent"
                  placeholder="請輸入Email"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#EF6D21] text-white py-2.5 px-4 rounded-lg hover:bg-[#df6319] transition-colors"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;