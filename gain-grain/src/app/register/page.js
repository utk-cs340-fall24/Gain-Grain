import Link from 'next/link';
import React from 'react';
import styles from './register.module.css'

export default function Register() {
    return(
        <div className={styles.body}>
            <div className={styles.wrapper}>
                <h2>Registration</h2>
                <form action="#">
                    <div className={styles.inputBox}>
                        <input type="text" placeholder="Enter your name" required />
                    </div>
                    <div className={styles.inputBox}>
                        <input type="text" placeholder="Enter your email" required />
                    </div>
                    <div className={styles.inputBox}>
                        <input type="password" placeholder="Create password" required />
                    </div>
                    <div className={styles.inputBox}>
                        <input type="password" placeholder="Confirm password" required />
                    </div>
                    <div className={`${styles.inputBox} ${styles.button}`}>
                        <input type="submit" value="Register Now" />
                    </div>
                    <div className={styles.text}>
                        <h3>Already have an account? <a href="/login">Login now</a></h3>
                    </div>
                </form>
            </div>
            <div className={styles.welcomeText}>
                <h1>Welcome to Gain & Grain!</h1>
            </div>
        </div>
    );
}