import Link from 'next/link';
import { useState } from 'react';
import styles from './login.module.css'
export const metadata = {
  title: 'Gain and Grain Login',
  charset: 'UTF-8',
  name: 'viewport',
  content: 'width=device-width, initial-scale=1.0',
}

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
    <html lang="en">
      <body>
        <div id="alert-container" className={`${styles.alert} ${styles.hidden}`}>
          <span id="alert-message"></span>
          <button id="alert-close">x</button>
        </div>

        <div className={styles.wrapper}>
          <form className={styles.login}>
            <p className={styles.title}>Log in</p>
            <input
              type="text"
              className={styles.username}
              placeholder="Username"
              autoFocus
              required
            />
            <i className="fa fa-user"></i>
            <input
              type="password"
              className={styles.password}
              placeholder="Password"
              required
            />
            <i className="fa fa-key"></i>
            <a className={styles['forgot-password']} href="#">
              Forgot your password?
            </a>
            <button id="login">
              <i className={styles.spinner}></i>
              <span className={styles.state}>Log in</span>
            </button>
          </form>
        </div>

        <script src="./login.js"></script>
      </body>
    </html>
  );
}