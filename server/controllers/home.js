import { prisma } from "../prisma/client.js";

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
    const user = await prisma.user.findUnique({
      where: {
        id: 'idk'
      }
    })
  } catch (error) {
    next(error);
  }
}
export const logout = async (req, res, next) => {

  res.send('logout')
}



export const create = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      }
    });
    res.json(user);
  } catch (error) {
    next(error);
  }
}