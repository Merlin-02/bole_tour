//middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'Access denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

// Middleware para verificar si el usuario es administrador
exports.isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access forbidden: Admins only' });
  }
  next();
};
