import Link from 'next/link';
import styles from './login.module.css'
export const metadata = {
  title: 'Gain and Grain Login',
  charset: 'UTF-8',
  name: 'viewport',
  content: 'width=device-width, initial-scale=1.0',
}

export default function Login() {
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