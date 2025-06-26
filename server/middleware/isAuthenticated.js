import jwt from 'jsonwebtoken';

const isAuthenticated = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Access denied. No token provided.',
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'yourSecretKey');
        req.user = decoded; // attach user info to request
        next();
    } catch (err) {
        return res.status(403).json({
            success: false,
            message: 'Invalid or expired token.',
        });
    }
};

export default isAuthenticated;
