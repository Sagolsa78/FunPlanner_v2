
import express from 'express';
import { createEvent } from '../controllers/event.controller.js';
import isAuthenticated from '../middleware/isAuthenticated.js';

const router = express.Router();

router.post('/create-event', isAuthenticated, createEvent); 

export default router;
