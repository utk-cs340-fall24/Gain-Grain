"use client";

import Link from 'next/link';
import { useState } from 'react';
import styles from './login.module.css'

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setAlertMessage('Username and password fields are required.');
      return;
    }

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        window.location.href = '/';
      } else {
        setAlertMessage(data.message || 'An error occurred. Please try again.');
      }
    } catch (error) {
      setAlertMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className={styles.body}>
      <div className={styles.wrapper}>
        <form action="">
          <h1 className={styles['login-title']}>Login</h1>
          <div className={styles['input-box']}>
            <input type="text" placeholder="Username" required />
            <i className='bx bxs-user'></i>
          </div>
          <div className={styles['input-box']}>
            <input type="password" placeholder="Password" required />
            <i className='bx bxs-lock-alt'></i>
          </div>
          <div className={styles['remember-forget']}>
            <label>
              <input type="checkbox" />
              Remember me
            </label>
            <a href="/forgot"> Forgot password?</a>
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