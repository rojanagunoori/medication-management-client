// client/src/components/AuthForm.js
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./AuthForm.css"

export default function AuthForm({ onSubmit, isLogin, error }) {
  const [formData, setFormData] = useState({ username: '', password: '', role: '' });
  const navigate = useNavigate(); 

  useEffect(() => {
    const role = localStorage.getItem('selectedRole');
    setFormData(prev => ({ ...prev, role: role || 'patient' }));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const onToggle=()=>{
    navigate(isLogin ? "/signup" : "/login");
  }

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>{isLogin ? 'Login' : 'Signup'}</h2>
      <input name="username" placeholder="Username" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
      {error && <p className="error-message">{error}</p>}
      <button type="submit">{isLogin ? 'Login' : 'Signup'}</button>
      <p className="switch-link">
        {isLogin ? (
          <>Don’t have an account? <span onClick={onToggle}>Sign up</span></>
        ) : (
          <>Already have an account? <span onClick={onToggle}>Login</span></>
        )}
      </p>
    </form>
  );
}
