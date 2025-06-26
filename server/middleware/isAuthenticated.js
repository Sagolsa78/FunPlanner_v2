import jwt from 'jsonwebtoken';

// Authentication middleware to verify JWT and attach user data to req.user
const isAuthenticated = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. No token provided.',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY );
     req.user = {
      _id: decoded.id || decoded._id,
      email: decoded.email,
    }; 
    next();
  } catch (err) {
    return res.status(403).json({
      success: false,
      message: 'Invalid or expired token.',
    });
  }
};

export default isAuthenticated;
