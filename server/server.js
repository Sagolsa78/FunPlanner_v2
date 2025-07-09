import express from 'express';
import { config } from 'dotenv';
config();

import { app, server } from './utils/socket.js'; // assumes `app` is express instance
import connectDB from './config/db.js';
import MongoStore from 'connect-mongo';

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

// ✅ CORS Allowed Origins (no trailing slashes!)
const allowedOrigins = [
  "https://fun-planner.vercel.app",
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
  credentials: true,
}));

// ✅ Must be added for preflight (OPTIONS) to work:
app.options('*', cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));


// ✅ Core middlewares
app.use(express.json());
app.use(cookieParser());

// ✅ Session + MongoStore + secure cookie settings
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    collectionName: 'sessions',
  }),
  cookie: {
    secure: process.env.NODE_ENV === 'production', // ⚠️ True only in production/https
    sameSite: 'None', // ✅ Required for cross-origin cookies
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  }
}));

// ✅ Passport
app.use(passport.initialize());
app.use(passport.session());

// ✅ Connect to MongoDB
connectDB();

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/vendors', vendorRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/todos', todoRoutes);

// ✅ Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`✅ Server & Socket.io running on port ${PORT}`);
});
