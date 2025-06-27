import express from 'express';
import {createClient} from '../controllers/client.controller.js';
import isAuthenticated from '../middleware/isAuthenticated.js';

const router = express.Router();

router.post('/create-client', isAuthenticated,createClient);

export default router;