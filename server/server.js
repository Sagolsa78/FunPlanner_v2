import express from 'express';
import { config } from 'dotenv';
config();

import { app, server } from './utils/socket.js';
import connectDB from './config/db.js';

import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';

import './config/passport.js';
import authRoutes from './routes/authRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import clientRoutes from './routes/clientRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import vendorRoutes from './routes/vendorRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import todoRoutes from './routes/todoRoutes.js';

const allowedOrigins = [
  "https://fun-planner-v2-agxf80um1-omguptatech-gmailcoms-projects.vercel.app",
  "https://fun-planner-v2-git-master-omguptatech-gmailcoms-projects.vercel.app",
  "http://localhost:5173"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Optional: Explicitly handle preflight (not always needed, but safe)
app.options('*', cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));


app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

// DB connection
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/vendors', vendorRoutes);
app.use('/api/chat', chatRoutes);
app.use("/api/todos", todoRoutes);

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server & Socket.io running on port ${PORT}`);
});
