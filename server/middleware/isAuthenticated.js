import jwt from 'jsonwebtoken';

// Middleware to verify JWT token from Authorization header or cookies
const isAuthenticated = (req, res, next) => {
  // Try to get token from Authorization header (preferred) or cookies
  const authHeader = req.headers['authorization'];
  const token =
    authHeader?.startsWith('Bearer ')
      ? authHeader.split(' ')[1]
      : req.cookies?.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. No token provided.',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = {
      _id: decoded.id || decoded._id, // support either `id` or `_id`
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
