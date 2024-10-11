"use client";

import { getUserById } from '../../utils/userModel';
import React, { useEffect, useState} from "react";   
import { getSession } from 'next-auth/react';    

const profile = ({userId}) => {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) {
        setError('No user ID provided');
        setLoading(false);
        return;
      }
      
      try {
        const response = await fetch(`/utils/userModel/${userId}`);
        if (!response.ok) throw new Error('Failed to fetch user data');
        const data = await response.json();
        if (data.success) {
          setUsername(data.user.username);
        } else {
          throw new Error(data.message || 'Failed to fetch user data');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  async function handler(req, res) {
    const { userId } = req.query;
  
    if (req.method !== 'GET') {
      return res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }
  
    try {
      const user = await getUserById(userId);
      
      if (!user.success) {
        return res.status(404).json({ success: false, message: user.message });
      }
  
      return res.status(200).json({ success: true, user: { username: user.user } });
    } catch (error) {
      console.error('Error fetching user data:', error);
      return res.status(500).json({ success: false, message: 'Server error' });
    }
  }  

  return (
    <div>
      <div className="flex items-center space-x-6">
        <div className="w-24 h-24">
            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
        </svg>
        </div>
        <div>
          <ul>
            <p>Followers</p>
            <p>Following</p>
          </ul>
          <h1 className="text-2xl font-bold">{username} </h1>
          <p className="text-gray-600">User's Bio</p>
        </div>
        <button> edit profile </button>

      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Saved Workouts</h2>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Saved Meals</h2>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session || !session.user) {
    return {
      redirect: {
        destination: '../login', 
        permanent: false,
      },
    };
  }

  const userId = session.user.id;
  return {
    props: {
      userId,
    },
  };
}
export default profile;