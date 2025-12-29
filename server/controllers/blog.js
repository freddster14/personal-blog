import { prisma } from '../prisma/client.js';

export const latest = async (req, res, next) => {
  try {
    const blogs = await prisma.blog.findMany({
      take: 6,
      orderBy: {
        createdAt: 'desc',
      },
    })
    res.json(blogs);
  } catch (error) {
    next(error);
  }
}

export const getAll = async (req, res, next) => {
  try {
    const blogs = prisma.blogs.findMany();

  } catch (error) {
    
  }
  res.send('All blogs')
}

export const getOne = async (req, res, next) => {
  res.send('One blog')
}

export const getUserAll = async (req, res, next) => {
  try {
    const blogs = await prisma.blog.findMany({
      where: {
        authorId: 'idk'
      }
    })
  } catch (error) {
    next(error);
  }
}

export const getForm = (req, res) => {
  res.render('create form')
}


export const create = async (req, res, next) => {
  res.send('created')
}

export const deleteBlog = async (req, res, next) => {
  const { id } = req.params;
  res.send('deleted')
}

export const edit = async (req, res, next) => {
  const { id } = req.params;
  try {
    const blog = prisma.blog.findUnique({ where: { id: Number(id) }})
  } catch (error) {
    next(error)
  }
}

export const update = async (req, res, next) => {
  const { id } = req.params;
  res.send('updated')
}