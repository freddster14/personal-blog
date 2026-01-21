import "dotenv/config";
import jwt from 'jsonwebtoken';

export function verifyTokenOptional(req, res, next) {
  const bearerHeader = req.headers['Authorization'];
  if(typeof bearerHeader !== 'undefined') {
    const bearerToken = bearerHeader.split(' ')[1];
    jwt.verify(bearerToken, process.env.SECRET, (err, decoded) => {
      if(err) return res.status(401).json({ message: 'Invalid token' });
      req.user = decoded;
      next();
    });
  } else {
    req.user = null;
    next();
  }
}

export function verifyTokenRequired(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if(typeof bearerHeader !== 'undefined') {
    const bearerToken = bearerHeader.split(' ')[1];
    jwt.verify(bearerToken, process.env.SECRET, (err, decoded) => {
      if(err) return res.status(401).json({ message: 'Invalid token' });
      req.user = decoded;
      next();
    });
  } else {
    return res.status(401).json({ message: 'Not Authorized'})
  }
}


