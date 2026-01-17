import "dotenv/config";
import { prisma } from "../prisma/client.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validateLogin, validateSignUp } from "../middleware/validation.js"
import validate from "../middleware/handleValidation.js";

export const loginUser = [
  validateLogin,
  validate,
  async (req, res, next) => {
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
      return res.status(200).json({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      next(error);
    }
  }
]



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


export const create = [
  validateSignUp,
  validate,
  async (req, res, next) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const existingUser = await prisma.user.findUnique({ where: { email }});
    if(existingUser) return res.status(409).json({ message: 'Email in use already'});

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
    return res.status(201).json({
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
]