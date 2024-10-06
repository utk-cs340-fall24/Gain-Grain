"use client";
import React, { useState } from 'react';
import styles from './forgot.module.css'
import { LockClosedIcon } from '@heroicons/react/solid';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');

    const handlePasswordReset = async(e) => {
        e.preventDefault();

        if(!email) {
            showAlert('Please enter your email.');
            return;
        }

        if(!email.includes('@')) {
            showAlert('Please enter a valid email.');
            return;
        }

        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();
            if (response.ok) {
                showAlert('Password reset email sent. If you don\'t see it, check your spam.');
            } else {
                showAlert(data.message || 'Something went wrong');
            }
        } catch (error) {
            showAlert('Failed to send password reset email. Try again.');
            console.error('Error:', error);
        }
    }

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

    return(
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
                <form onSubmit={handlePasswordReset}>
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
                    <input 
                        type="text" 
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />
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