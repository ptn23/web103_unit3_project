const getAllEvents = async () => {
    try{
        const response = await fetch('/api/events')
        const data = await response.json()
        return data
    }
    catch(error){
        console.error('Error fetching events:', error)
        return []
    }
}
const getEventsById = async(eventId) => {
    try{
        const response = await fetch(`/api/events/${eventId}`)
        const data = await response.json()
        return data
    }
    catch(error){
        console.error(`Error fetching events with ID ${eventId}:`, error)
        return []
    }
}
const EventsAPI = {
    getAllEvents, getEventsById
}
export default EventsAPI