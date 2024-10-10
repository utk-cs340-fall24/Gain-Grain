"use client";
import { useState, useEffect } from 'react';
import styles from './login.module.css'
import { LockClosedIcon, UserIcon } from '@heroicons/react/solid';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      showAlert('Username and password are both required.');
      return;
    }
    
    if(rememberMe) {
      localStorage.setItem('username', username)
      localStorage.setItem('password', password)
    } else {
      localStorage.removeItem('username', username)
      localStorage.removeItem('password', password)
    }

    try {
      const res = await fetch('/api/login/find-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        window.location.href = '/';
      } else {
        showAlert(data.message);
      }
    } catch (error) {
      console.error('Error: ', error);
      showAlert('An error occurred. Please try again.');
    }
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');
    if(storedUsername && storedPassword) {
      setUsername(storedUsername);
      setPassword(storedPassword);
      setRememberMe(true);
    }
  }, []);

  const showAlert = (message) => {
    const alertContainer = document.getElementById('alert-container');
    const alertMessage = document.getElementById('alert-message');

    alertMessage.textContent = message;
    alertContainer.classList.remove('hidden');

    setTimeout(() => {
      alertContainer.classList.add('hidden');
    }, 10000);

    document.getElementById('alert-close').addEventListener('click', () => {
      alertContainer.classList.add('hidden');
    });
  };

  return (
    <div className={styles.body}>
      <div id="alert-container" className={`${styles.alert} hidden`}>
        <span id="alert-message"></span>
        <button id="alert-close">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button> {}
      </div>
      <div className={styles.wrapper}>
        <form onSubmit={handleLogin}>
          <h1 className={styles['login-title']}>Login</h1>
          <div className={styles['input-box']}>
            <input 
              type="text" 
              placeholder="Username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <i className='bx bxs-user'>
              <UserIcon className="w-6 h-6" />
            </i>
          </div>
          <div className={styles['input-box']}>
            <input 
              type={showPassword ? 'text' : 'password'} 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />  
            <i className='bx bxs-lock-alt'>
              <LockClosedIcon className="w-6 h-6" />
            </i>
          </div>
          <div className={styles.togglePasswordContainer}>
            <button 
              className={styles.togglePassword}
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? 'Hide Password' : 'Show Password'}  
            </button>
          </div>
          <div className={styles['remember-forget']}>
            <label>
              <input 
                type="checkbox" 
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                />
              Remember me
            </label>
            <a href="/login/forgot-password"> Forgot password?</a>
          </div>
          <button type="submit" className={styles.btn}>Login</button>
          <div className={styles['register-link']}>
            <p>Don't have an account? <a href="/register">Register</a></p>
          </div>
        </form>
      </div>
    </div>
  );
}