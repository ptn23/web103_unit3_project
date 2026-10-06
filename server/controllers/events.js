import { pool } from '../config/database.js';
const getEvents = async (req, res) => {
    try{
        const results = await pool.query('SELECT * FROM events ORDER BY id ASC')
        res.status(200).json(results.rows)

    }
    catch (error){
        res.status(409).json( { error: error.message } )
    }
} 
const getEventsById = async (req, res) => {
  try {
    const selectQuery = `
      SELECT title, date, time, image, remaining
      FROM events
      WHERE id = $1
    `
    const eventId = req.params.eventId
    const results = await pool.query(selectQuery, [eventId])
    
    if (results.rows.length === 0) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.status(200).json(results.rows[0])

  } catch (error) {
    res.status(409).json({ error: error.message })
  }
}
export default {
    getEvents, getEventsById
}