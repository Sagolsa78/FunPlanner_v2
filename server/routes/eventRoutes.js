
import express from 'express';
import { createEvent, getAllEventsOfClient, getAllEventWithStats, getEventDistribution } from '../controllers/event.controller.js';
import isAuthenticated from '../middleware/isAuthenticated.js';

const router = express.Router();

router.post('/create-event/:id', isAuthenticated, createEvent); 
router.get('/clients-event-data/:id',isAuthenticated,getAllEventsOfClient);
router.get('/all-events', isAuthenticated, getAllEventWithStats);
router.get('/events-distribution', isAuthenticated, getEventDistribution);

export default router;
