import "dotenv/config";
import jwt from 'jsonwebtoken';

export function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if(typeof bearerHeader !== 'undefined') {
    const bearerToken = bearerHeader.split(' ')[1];
    jwt.verify(bearerToken, process.env.SECRET, (err, decoded) => {
      if(err) return res.status(403).json({ message: 'Invalid token' });
      req.user = decoded;
      next();
    });
  } else {
    return res.status(401).json({ message: 'No token provided'})
  }
}
