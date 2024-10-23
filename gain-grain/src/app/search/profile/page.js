"use client";

import React, { useEffect, useState} from "react"; 
import styles from './profile.module.css'
import { useSearchParams } from 'next/navigation';
import Navbar from "@/components/Navbar";
import Image from 'next/image';


export default function profile() {
  const [user, setUser] = useState('');
  const [validId, setValidId] = useState(false);

  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');

  useEffect(() => {
    const fetchUserData = async () => {

      if (!userId) {
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
        }
      } catch (error) {

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
                <Image src={user.profilePic} width={150} height={150} className="rounded-full w-full h-full object-cover"/>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" viewBox="0 0 16 16">
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                </svg>
              )}
            </div>
            <div className={styles.profile}>
              <h1 className={styles.username}>{user.username} </h1>
              <ul>
                <p>Followers: {user.numFollowers}</p>
                <p>Following: {user.numFollowing}</p>
              </ul>
              <p className="text-white-600">User's Bio:
                <p>{user.bio}</p>
              </p>
              <button className={styles.followButton}>Follow</button>
            </div>
          </div>
        </>
      ) : (
        <>
        </>
      )}
    </div>
  );
};
