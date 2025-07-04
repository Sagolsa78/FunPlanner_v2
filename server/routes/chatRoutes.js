import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { getMessages, getUsersforSidebar, sendMessage } from "../controllers/chat.controller.js";
import e from "express";

const router = express.Router();


router.get('/users',isAuthenticated, getUsersforSidebar);
router.get('/:id', isAuthenticated, getMessages);
router.post('/send',isAuthenticated,sendMessage);

export default router;