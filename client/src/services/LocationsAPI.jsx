const getAllLocations = async () => {
    try {
        const response = await fetch('/api/locations')
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error fetching locations:', error)
        return []
    }
}

const getLocationById = async (locationId) => {
    try {
        const response = await fetch(`/api/locations/${locationId}`)
        const data = await response.json()
        return data
    } catch (error) {
        console.error(`Error fetching location with ID ${locationId}:`, error)
        return null
    }
}

const LocationsAPI = {
    getAllLocations,
    getLocationById
}

export default LocationsAPI