const formatTime = (time) => {
    if (!time) return ''
    try {
        const [hours, minutes] = time.split(':')
        const h = parseInt(hours, 10)
        const ampm = h >= 12 ? 'PM' : 'AM'
        const formattedHours = h % 12 || 12
        return `${formattedHours}:${minutes} ${ampm}`
    } catch (err) {
        return time
    }
}

const formatRemainingTime = (remaining) => {
    return remaining || ''
}

const formatNegativeTimeRemaining = (remaining, eventId) => {
    const element = document.getElementById(`remaining-${eventId}`)
    if (element && remaining && remaining.includes('-')) {
        element.style.color = '#ff6b6b'
    }
}

const dates = {
    formatTime,
    formatRemainingTime,
    formatNegativeTimeRemaining
}

export default dates