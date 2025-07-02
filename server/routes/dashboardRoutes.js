import express from 'express';
import { getAllEventWithStats, getDashboardStats, getEventDistribution } from '../controllers/dashboard.controller.js';
import isAuthenticated from '../middleware/isAuthenticated.js';

const router = express.Router();

router.get('/stats', isAuthenticated, getDashboardStats);
router.get('/all-events', isAuthenticated, getAllEventWithStats);
router.get('/events-distribution', isAuthenticated, getEventDistribution);

export default router;