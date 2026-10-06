
import React, { useState, useEffect } from 'react'
import EventsAPI from '../services/EventsAPI'
import LocationsAPI from '../services/LocationsAPI'
import dates from '../services/dates.js'
import '../css/Event.css'

const Event = () => {
    const [events, setEvents] = useState([])
    const [locations, setLocations] = useState([])
    const [selectedLocation, setSelectedLocation] = useState('all')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const eventData = await EventsAPI.getAllEvents()
                const locationData = await LocationsAPI.getAllLocations()

                setEvents(eventData)
                setLocations(locationData)
            } 
            catch (error) {
                console.error(
                    'Error fetching events or locations:',
                    error
                )
            }
        }

        fetchData()
    }, [])

    const filteredEvents = selectedLocation === 'all' ? events
            : events.filter(
                  event =>
                      event.location_id === Number(selectedLocation)
              )

    return (
        <div className="all-events-page">
            <div className="events-header">
                <h2>All Scheduled Events</h2>

                <div className="filter-container">
                    <label htmlFor="location-filter">
                        Filter by Location:
                    </label>

                    <select
                        id="location-filter"
                        value={selectedLocation}
                        onChange={(e) =>
                            setSelectedLocation(e.target.value)
                        }
                    >
                        <option value="all">
                            All Locations
                        </option>

                        {locations.map((location) => (
                            <option
                                key={location.id}
                                value={location.id}
                            >
                                {location.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="events-grid">
                {filteredEvents.length > 0 ? (
                    filteredEvents.map((event) => (
                        <SingleEventCard
                            key={event.id}
                            event={event}
                        />
                    ))
                ) : (
                    <p className="no-events">
                        No events found for this location.
                    </p>
                )}
            </div>
        </div>
    )
}

const SingleEventCard = ({ event }) => {
    const [time, setTime] = useState('')
    const [remaining, setRemaining] = useState('')
    const [passed, setPassed] = useState(false)

    useEffect(() => {
        if (!event?.time) return

        const formatEventTime = async () => {
            try {
                const result = await dates.formatTime(event.time)
                setTime(result)
            } catch (error) {
                console.error(
                    'Error formatting time:',
                    error
                )
            }
        }

        formatEventTime()
    }, [event])

    useEffect(() => {
        if (!event?.date || !event?.time) return

        const updateCountdown = () => {
            try {
                const eventDateTime = new Date(
                    `${event.date}T${event.time}`
                )

                const now = new Date()
                const difference = eventDateTime - now

                if (difference <= 0) {
                    setPassed(true)
                    setRemaining('Event has passed')
                    return
                }
                setPassed(false)
                const totalSeconds = Math.floor(difference / 1000)
                const days = Math.floor(totalSeconds / 86400)
                const hours = Math.floor((totalSeconds % 86400) / 3600)
                const minutes = Math.floor((totalSeconds % 3600) / 60)
                const seconds = totalSeconds % 60
                let countdown = ''
                if (days > 0) {
                    countdown += `${days}d `
                }
                countdown += `${hours}h ${minutes}m ${seconds}s`
                setRemaining(countdown)
            } 
            catch (error) {
                console.error('Error calculating countdown:',error
                )
            }
        }

        updateCountdown()

        const interval = setInterval(updateCountdown,1000)
        return () => clearInterval(interval)
    }, [event])

    return (
        <article
            className={`event-information ${
                passed ? 'passed-event' : ''
            }`}
        >
            <img
                src={event.image}
                alt={event.title || 'Event'}
            />

            <div className="event-information-overlay">
                <div className="text">
                    <h3>{event.title}</h3>

                    <p>
                        <i className="fa-regular fa-calendar" />
                        {' '}
                        {event.date}
                        <br />
                        {time}
                    </p>

                    <p
                        className={
                            passed
                                ? 'event-passed'
                                : 'event-countdown'
                        }
                    >
                        {remaining}
                    </p>
                </div>
            </div>
        </article>
    )
}
export default Event
