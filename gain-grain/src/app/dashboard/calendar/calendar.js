import React, { useState, useEffect } from 'react';
//import './custom_calendar.css'; // Import your CSS for styling
import { FaAngleLeft, FaAngleRight, FaPlus, FaTimes } from 'react-icons/fa'; // Use FontAwesome Icons
import '../style.css'

const CustomCalendar = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [events, setEvents] = useState([]);
    const [showAddEvent, setShowAddEvent] = useState(false);
    const [newEvent, setNewEvent] = useState({ name: '', from: '', to: '' });

    useEffect(() => {
        // Logic to load events, etc.
    }, [currentMonth]);

    const handleNextMonth = () => {
        setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)));
    };

    const handlePrevMonth = () => {
        setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)));
    };

    const handleAddEvent = () => {
        setEvents([...events, newEvent]);
        setNewEvent({ name: '', from: '', to: '' });
        setShowAddEvent(false);
    };

    return (
        <div className="container">
            <div className="left">
                <div className="calendar">
                    <div className="month">
                        <FaAngleLeft className="prev" onClick={handlePrevMonth} />
                        <div className="date">
                            {currentMonth.toLocaleString('default', { month: 'long' })}{' '}
                            {currentMonth.getFullYear()}
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
                        {/* Generate days of the current month here */}
                    </div>
                    <div className="goto-today">
                        <div className="goto">
                            <input type="text" placeholder="mm/yyyy" className="date-input" />
                            <button className="goto-btn">Go</button>
                        </div>
                        <button className="today-btn">Today</button>
                    </div>
                </div>
            </div>
            <div className="right">
                <div className="today-date">
                    <div className="event-day">{currentMonth.toLocaleDateString('default', { weekday: 'long' })}</div>
                    <div className="event-date">{currentMonth.toDateString()}</div>
                </div>
                <div className="events">
                    {events.map((event, index) => (
                        <div key={index} className="event-item">
                            <span>{event.name}</span> from <span>{event.from}</span> to <span>{event.to}</span>
                        </div>
                    ))}
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
