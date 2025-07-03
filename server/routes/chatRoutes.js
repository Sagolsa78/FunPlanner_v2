import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { getUsersforSidebar } from "../controllers/chat.controller.js";

const router = express.Router();


router.get('/users',isAuthenticated, getUsersforSidebar);