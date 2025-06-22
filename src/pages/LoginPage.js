// client/src/pages/LoginPage.js
import AuthForm from '../components/AuthForm';
import { loginUser } from '../api/api';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function LoginPage({ onAuth }) {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    try {
    const res = await loginUser(data);

    
    toast.success('Login successful!', {
      position: 'top-center',
      autoClose: 2000
    });
    setTimeout(() => navigate('/dashboard'), 2500);
    onAuth(res.data.token);
  } catch (err) {
    console.error(err);
    setError(err.response?.data || 'Login failed. Please try again.');
  }
  };

  return <AuthForm onSubmit={handleLogin} isLogin error={error} />;
}