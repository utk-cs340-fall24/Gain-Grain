'use client';


import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import the Calendar CSS
import './custom_calendar.css'; // Importing custom CSS

const Page = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">React Calendar</h1>
      <Calendar
        onChange={setDate}
        value={date}
        className="mx-auto" // Tailwind class to center the calendar
      />
      <p className="mt-4 text-center">
        Selected date: <span className="font-semibold">{date.toDateString()}</span>
      </p>
    </div>
  );
};

export default Page;
