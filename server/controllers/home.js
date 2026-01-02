import "dotenv/config";
import { prisma } from "../prisma/client.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const home = (req, res) => {
  res.send('home')
}

export const about = (req, res) => {
  res.send('about')
}

export const signup = async (req, res, next) => {
  res.send('signup')
}

export const login = async (req, res) => {

  
  res.send("login")
}

export const loginUser = async (req, res, next) => {
  const { email , password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email }});
    if(!user) return res.status(401).json({ message: 'Invalid credentials'});

    const match = await bcrypt.compare(password, user.password);
    if(!match) return res.status(401).json({ message: 'Invalid credentials'});

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.SECRET,
      { expiresIn: '1h'},
    );
    return res.json({ token });
  } catch (error) {
    next(error);
  }
};
export const logout = async (req, res, next) => {

  res.send('logout')
};


export const getMe = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });
    if(!user) return res.status(404).json({ message: 'User not found' });
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};


export const create = async (req, res, next) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const existingUser = await prisma.user.findUnique({ where: { email }});
    if(existingUser) return res.status(400).json({ message: 'Email in use already'});

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: 'user',
      },
    });
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.SECRET,
      { expiresIn: '1h'},
    );
    return res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token,
    });
  } catch (error) {
    next(error);
  }
}