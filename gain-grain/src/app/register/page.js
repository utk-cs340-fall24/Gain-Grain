"use client";
import React from 'react';
import { useState } from 'react';
import styles from './register.module.css'
export const metadata = {
    title: "G&G Register",
    description: "Register an account with Gain & Grain",
};

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmedPassword, setShowConfirmedPassword] = useState(false);
    const [confirmedPassword, setConfirmedPassword] = useState('');

    const handleRegistration = async(e) => {
        e.preventDefault();

        if (!name) {
            showAlert('Name is required.');
            return;
        } else if (!email) {
            showAlert('Email is required.');
            return;
        } else if(!email.includes('@')) {
            showAlert('Please enter a valid email.');
            return;
        } else if (!username) {
            showAlert('Username is required.');
            return;
        } else if (!password) {
            showAlert('Password is required.');
            return;
        } else if(password.length < 12) {
            showAlert('Password must be at least 12 characters.');
            return;
        } else if(!(/[a-z]/.test(password) && /[A-Z]/.test(password))) {
            showAlert('Password must contain uppercase and lowercase letters');
            return;
        } else if(!(/\d/.test(password))) {
            showAlert('Password must contain numbers');
            return;
        } else if(!(/[^A-Za-z0-9]/.test(password))) {
            showAlert('Password must contain a special character');
            return;
        } else if(!confirmedPassword) {
            showAlert('Please confirm your password.');
            return;
        }

        if(password !== confirmedPassword) {
            showAlert('Passwords do not match');
            return;
        }

        try {
            const res = await fetch('/api/register/create-user', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, username, password }),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                window.location.href = '/login';
            } else {
                showAlert(data.message);
            }
        } catch (error) {
            console.error('Error: ', error);
            showAlert('An error occurred. Please try again.');
        }
    };

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
                <h2>Registration</h2>
                <form onSubmit={handleRegistration}>
                    <div className={styles.inputBox}>
                        <input 
                            type="text" 
                            placeholder="Enter your full name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                             />
                    </div>
                    <div className={styles.inputBox}>
                        <input 
                            type="text" 
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            />
                    </div>
                    <div className={styles.inputBox}>
                        <input 
                            type="text" 
                            placeholder="Enter your username" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            />
                    </div>
                    <div className={styles.inputBox}>
                        <input 
                            className={styles.passwordInput} 
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Create password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button 
                            className={styles.togglePassword}
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                        >
                            {showPassword ? 'Hide' : 'Show'}  
                        </button>
                    </div>
                    <div className={styles.inputBox}>
                        <input 
                            className={styles.passwordInput}
                            type={showConfirmedPassword ? 'text' : 'password'}
                            placeholder="Confirm password" 
                            value={confirmedPassword}
                            onChange = {(e) => setConfirmedPassword(e.target.value)}
                        />
                        <button 
                            className={styles.togglePassword}
                            type="button"
                            onClick={() => setShowConfirmedPassword((prev) => !prev)}
                        >
                            {showConfirmedPassword ? 'Hide' : 'Show'}  
                        </button>
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