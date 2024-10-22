"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from "@/components/Navbar";

export default function EditProfile() {
  const [user, setUser] = useState('');
  const [username,setUsername] = useState('');
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [error, setError] = useState(null);
  
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/profile/get-user-by-id', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId }),
        });

        if (!response.ok) throw new Error('Failed to fetch user data');
        const data = await response.json();

        if (data.success) {
          setUser(data.user);
          setUsername(data.user.username);
          setName(data.user.name);
          setBio(data.user.bio || '');
          setProfilePic(data.user.profilePic || '');
        } else {
          setError(data.message || 'Failed to fetch user data');
        }
      } catch (err) {
        setError(err.message);
      }
    };

    if (userId) fetchUserData();
  }, [userId]);

  const handleSave = async () => {
    try {
      const response = await fetch('/api/profile/update-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, bio, profilePic: profilePic }),
      });

      if (!response.ok) throw new Error('Failed to update profile');
      alert('Profile updated successfully');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold">Edit Profile</h1>
        {error && <p className="text-red-500">{error}</p>}
        {user && (
          <div className="mt-4">
            <div className="flex flex-col">
            {/* change your username */}
              <label className="text-lg">Update your Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="border p-2 rounded-md"
              />
          </div>
          <div className="mt-4">
            <div className="flex flex-col">
              {/* change your name */}
              <label className="text-lg">Change your name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border p-2 rounded-md"
              />
              </div>
          </div>

          <div className="mt-4">
            {/* change your bio */}
            <div className="flex flex-col">
              <label className="text-lg">Update Bio</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="border p-2 rounded-md"
              />
              </div>
            </div>

            <div className="flex flex-col mt-4">
              {/* add a profile picture */}
              <label className="text-lg">Update Profile Picture: </label>
              <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setProfilePic(e.target.files[0])}
                />
            </div>

            <button onClick={handleSave} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md">
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
