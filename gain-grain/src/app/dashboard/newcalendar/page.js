'use client';

import React, { useState, useEffect } from 'react';
import { FaAngleLeft, FaAngleRight, FaPlus, FaTimes } from 'react-icons/fa';
import './style.css'

const CustomCalendar = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [eventsArr, setEventsArr] = useState([]);
    const [showAddEvent, setShowAddEvent] = useState(false);
    const [newEvent, setNewEvent] = useState({ name: '', from: '', to: '' });
    const [activeDay, setActiveDay] = useState(null);
    const [days, setDays] = useState([]);

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    useEffect(() => {
        initCalendar();
    }, [currentMonth]);

    const handleNextMonth = () => {
        setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)));
    };

    const handlePrevMonth = () => {
        setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)));
    };

    const handleAddEvent = () => {
        if (activeDay) {
            const dayEvents = eventsArr.find(event =>
                event.day === activeDay &&
                event.month === currentMonth.getMonth() + 1 &&
                event.year === currentMonth.getFullYear());

            if (dayEvents) {
                dayEvents.events.push(newEvent);
            } else {
                setEventsArr([...eventsArr, {
                    day: activeDay,
                    month: currentMonth.getMonth() + 1,
                    year: currentMonth.getFullYear(),
                    events: [newEvent],
                }]);
            }

            setNewEvent({ name: '', from: '', to: '' });
            setShowAddEvent(false);
        }
    };

    const initCalendar = () => {
        const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
        const lastDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
        const prevLastDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 0);
        const prevDays = prevLastDay.getDate();
        const lastDate = lastDay.getDate();
        const dayOfWeek = firstDay.getDay();
        const nextDays = 7 - lastDay.getDay() - 1;

        let calendarDays = [];

        for (let x = dayOfWeek; x > 0; x--) {
            calendarDays.push({ day: prevDays - x + 1, isPrevMonth: true });
        }

        for (let i = 1; i <= lastDate; i++) {
            const hasEvent = eventsArr.some(event =>
                event.day === i &&
                event.month === currentMonth.getMonth() + 1 &&
                event.year === currentMonth.getFullYear());
            calendarDays.push({ day: i, isActive: i === activeDay, hasEvent });
        }

        for (let j = 1; j <= nextDays; j++) {
            calendarDays.push({ day: j, isNextMonth: true });
        }

        setDays(calendarDays);
    };

    const handleDayClick = (day, isPrevMonth, isNextMonth) => {
        if (isPrevMonth) {
            handlePrevMonth();
        } else if (isNextMonth) {
            handleNextMonth();
        } else {
            setActiveDay(day);
        }
    };

    const renderDays = () => {
        return days.map((dayObj, index) => (
            <div
                key={index}
                className={`day ${dayObj.isPrevMonth ? 'prev-date' : ''} ${dayObj.isNextMonth ? 'next-date' : ''} ${dayObj.isActive ? 'active' : ''} ${dayObj.hasEvent ? 'event' : ''}`}
                onClick={() => handleDayClick(dayObj.day, dayObj.isPrevMonth, dayObj.isNextMonth)}
            >
                {dayObj.day}
            </div>
        ));
    };

    return (
        <div className="container">
            <div className="left">
                <div className="calendar">
                    <div className="month">
                        <FaAngleLeft className="prev" onClick={handlePrevMonth} />
                        <div className="date">
                            {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                        </div>
                        <FaAngleRight className="next" onClick={handleNextMonth} />
                    </div>
                    <div className="weekdays">
                        <div>Sun</div>
                        <div>Mon</div>
                        <div>Tue</div>
                        <div>Wed</div>
                        <div>Thu</div>
                        <div>Fri</div>
                        <div>Sat</div>
                    </div>
                    <div className="days">
                        {renderDays()}
                    </div>
                    <div className="goto-today">
                        <div className="goto">
                            <input type="text" placeholder="mm/yyyy" className="date-input" />
                            <button className="goto-btn">Go</button>
                        </div>
                        <button className="today-btn" onClick={() => setCurrentMonth(new Date())}>Today</button>
                    </div>
                </div>
            </div>
            <div className="right">
                <div className="today-date">
                    <div className="event-day">{currentMonth.toLocaleDateString('default', { weekday: 'long' })}</div>
                    <div className="event-date">{currentMonth.toDateString()}</div>
                </div>
                <div className="events">
                    {activeDay ? eventsArr.map((event, index) => (
                        <div key={index} className="event-item">
                            <span>{event.name}</span> from <span>{event.from}</span> to <span>{event.to}</span>
                        </div>
                    )) : <div>No events for today</div>}
                </div>
                {showAddEvent && (
                    <div className="add-event-wrapper">
                        <div className="add-event-header">
                            <div className="title">Add Event</div>
                            <FaTimes className="close" onClick={() => setShowAddEvent(false)} />
                        </div>
                        <div className="add-event-body">
                            <div className="add-event-input">
                                <input
                                    type="text"
                                    placeholder="Event Name"
                                    value={newEvent.name}
                                    onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
                                />
                            </div>
                            <div className="add-event-input">
                                <input
                                    type="text"
                                    placeholder="Event Time From"
                                    value={newEvent.from}
                                    onChange={(e) => setNewEvent({ ...newEvent, from: e.target.value })}
                                />
                            </div>
                            <div className="add-event-input">
                                <input
                                    type="text"
                                    placeholder="Event Time To"
                                    value={newEvent.to}
                                    onChange={(e) => setNewEvent({ ...newEvent, to: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="add-event-footer">
                            <button className="add-event-btn" onClick={handleAddEvent}>
                                Add Event
                            </button>
                        </div>
                    </div>
                )}
                <button className="add-event" onClick={() => setShowAddEvent(true)}>
                    <FaPlus />
                </button>
            </div>
        </div>
    );
};

export default CustomCalendar;