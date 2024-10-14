"use client";

import React, { useEffect, useState} from "react"; 
import styles from './profile.module.css'
import { useSearchParams } from 'next/navigation';
import Navbar from "@/components/Navbar";
import Link from "next/link";


export default function profile() {
  const [user, setUser] = useState('');
  const [error, setError] = useState(null);
  const [validId, setValidId] = useState(false);

  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');

  useEffect(() => {
    const fetchUserData = async () => {

      if (!userId) {
        setError('No User ID provided');
        return;
      }
      
      try {
        const response = await fetch('/api/profile/get-user-by-id', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId }),
        });

        if (!response.ok) throw new Error('Failed to fetch user data');

        const data = await response.json();

        if (data.success) {
          setUser(data.user);
          setValidId(true);
        } else {
          setError(data.message || 'Failed to fetch user data');
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUserData();
  }, [userId]);

  return (
    <div className={styles.wrapper}>
      <Navbar />
      {validId ? (
        <>
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24">
              {user.profilePic ? (
                <img src={user.profilePicture} alt="Profile" className="rounded-full w-full h-full object-cover"/>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" viewBox="0 0 16 16">
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                </svg>
              )}
            </div>
            <div>
              
              <h1 className="text-2xl font-bold">{user.username} </h1>
              <ul>
                <p>Followers: {user.numFollowers}</p>
                <p>Following: {user.numFollowing}</p>
              </ul>
              <p className="text-white-600">User's Bio:
                <p>{user.bio}</p>
              </p>
              <Link href="/EditProfile">

              <button>Edit profile</button>
              </Link>


            </div>

          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Saved Workouts</h2>
          </div>
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Saved Meals</h2>
          </div>
        </>
      ) : (
        <div className={styles.wrapper}>
          <p className={styles.errorMessage}>{error}</p>
          <Link href="/login">
            <button className="w-full bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-orange-600 transition-all">
            Login/Register
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};
