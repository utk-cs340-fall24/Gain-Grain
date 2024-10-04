"use client";
import { useState } from 'react';
import styles from './login.module.css'
import { LockClosedIcon, UserIcon } from '@heroicons/react/solid';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setErrorMessage('Username and password are required.');
      return;
    }

    try {
      const res = await fetch('/api/find-user', {
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
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error('Error: ', error);
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className={styles.body}>
      <div className={styles.wrapper}>
        <form onSubmit={handleLogin}>
          <h1 className={styles['login-title']}>Login</h1>
          <div className={styles['input-box']}>
            <input 
              type="text" 
              placeholder="Username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required 
            />
            <i className='bx bxs-user'>
              <UserIcon className="w-6 h-6" />
            </i>
          </div>
          <div className={styles['input-box']}>
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
            <i className='bx bxs-lock-alt'>
              <LockClosedIcon className="w-6 h-6" />
            </i>
          </div>
          <div className={styles['remember-forget']}>
            <label>
              <input type="checkbox" />
              Remember me
            </label>
            <a href="/login/forgot"> Forgot password?</a>
          </div>
          <button type="submit" className={styles.btn}>Login</button>
          {errorMessage && <div className={styles.error}>{errorMessage}</div>}
          <div className={styles['register-link']}>
            <p>Don't have an account? <a href="/register">Register</a></p>
          </div>
        </form>
      </div>
    </div>
  );
}