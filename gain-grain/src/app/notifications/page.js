"use client"
import { useState, useEffect } from 'react';
import Navbar from "@/components/Navbar";

export default function NotificationsPage() {
  const [user, setUser] = useState('');
  const [notifications, setNotifications] = useState([]);


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/profile/get-user-from-session', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        if (data.success) {
          setUser(data.user);
          setNotifications(user.notifications);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, []);

  const handleDismiss = (id) => {
    setNotifications(notifications.filter((notif) => notif.id !== id));
  };

  const getNotificationStyle = (type) => {
    switch (type) {
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'info':
        return 'bg-blue-100 text-blue-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <Navbar />
      <div className="notifications-page p-4">
        <h1 className="text-2xl font-bold mb-4">Notifications</h1>
        
        {!notifications ? (
          <p className="text-gray-500">No notifications</p>
        ) : (
          notifications.map((notif) => (
            <div
              key={notif.id}
              className={`notification-item p-4 mb-2 rounded-lg shadow-md ${getNotificationStyle(notif.type)}`}
            >
              <div className="flex justify-between items-center">
                <span>{notif.message}</span>
                <button
                  className="ml-4 text-red-500 font-bold"
                  onClick={() => handleDismiss(notif.id)}
                >
                  Dismiss
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
