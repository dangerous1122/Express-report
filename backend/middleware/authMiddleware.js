// This middleware assumes you're using JSON Web Tokens (JWT) and a library like `jsonwebtoken` to verify the token
import jwt from 'jsonwebtoken'
import User from '../model/userModel.js';

const authenticateToken = async (req, res, next) => {


  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split('Bearer ')[1];


  
  if (!token) return res.status(401).json({ message: 'Access token required' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    const user = await User.findById(decoded.id);

    if (!user) return res.status(404).json({ message: 'User not found' });

    req.user = user;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: 'Token expired' });
    } else {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
  }
};


export default authenticateToken