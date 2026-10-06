import express from 'express'
import EventController from '../controllers/events.js'
const router = express.Router()
router.get('/', EventController.getEvents)
router.get('/:eventId', EventController.getEventsById)
export default router