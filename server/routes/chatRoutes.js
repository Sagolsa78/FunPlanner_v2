import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { getMessages, getUsersForSidebar, sendMessage } from "../controllers/chat.controller.js";

const router = express.Router();

router.get('/getUsers',isAuthenticated, getUsersForSidebar);
router.get('/getChats/:id', isAuthenticated, getMessages);
router.post('/sendChat/:id',isAuthenticated,sendMessage);



export default router;