// client/src/pages/SignupPage.js
import AuthForm from '../components/AuthForm';
import { signupUser } from '../api/api';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function SignupPage({ onAuth }) {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (data) => {
    try {
    const res = await signupUser(data);
    //onAuth(res.data.token);
    toast.success('Signup successful! Redirecting to login...', {
      position: 'top-center',
      autoClose: 2000
    });
    setTimeout(() => navigate('/login'), 2500);
  } catch (err) {
    console.error(err);
    setError(err.response?.data?.message || 'Signup failed. Please try again.');
  }
  };

  return <AuthForm onSubmit={handleSignup}  error={error}/>;
}