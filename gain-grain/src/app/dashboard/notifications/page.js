"use client"
import { useState } from 'react';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Welcome to Gain-Grain!', type: 'success' },
    { id: 2, message: 'New workout added.', type: 'info' },
    { id: 3, message: 'Error loading nutrition data.', type: 'error' },
  ]);

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
    <div className="notifications-page p-4">
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>
      
      {notifications.length === 0 ? (
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
  );
}
