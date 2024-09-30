import Link from 'next/link';
import React from 'react';
import styles from './forgot.module.css'
import { LockClosedIcon } from '@heroicons/react/solid';
export const metadata = {
    title: "G&G Forgot Password",
    description: "Recover your Gain & Grain account password",
};

export default function ForgotPassword() {
    return(
        <div className={styles.body}>
            <div className={styles.wrapper}>
                <form action="">
                <div className={styles['icon-circle']}>
                    <LockClosedIcon className="w-6 h-6" />
                </div>
                <div className={styles['forgot']}>
                    <p className={styles['forgot-title']}>Having trouble logging in?</p>
                    <p className={styles['forgot-message']}>Enter your email and we'll send you a link
                        to get back into your account.
                    </p>
                </div>
                <div className={styles['input-box']}>
                    <input type="text" placeholder="Email" required />
                </div>
                <button type="submit" className={styles.btn}>Reset Password</button>
                <div className={styles['register-link']}>
                    <p>Don't have an account? <a href="/register">Register</a></p>
                </div>
                </form>
            </div>
        </div>
    );
}