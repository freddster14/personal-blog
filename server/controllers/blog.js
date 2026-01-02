import { prisma } from '../prisma/client.js';
import { slugify } from '../utils/slugify.js';

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
    const blogs = await prisma.blogs.findMany({ orderBy: { createdAt: 'desc' }});
    res.json(blogs)
  } catch (error) {
    next(error)
  }
}

export const getOne = async (req, res, next) => {
  const { slug } = req.params;
  try {
    const blog = await prisma.blog.findUnique({
      where: { slug },
      include: {
        author: {
          select: {
            name: true,
            email: true,
          }
        },
        comments: true,
      }
    });
    res.json(blog)
  } catch (error) {
    next(error)
  }
}

export const getForm = (req, res) => {
  res.render('create form')
}


export const create = async (req, res, next) => {

  if(req.user.role !== 'admin') return res.status(401).json({ message: 'No permission' })
  const { title, content, published } = req.body;
  const slug = slugify(title);
  try {
    const blog = await prisma.blog.create({
      data: {
        title,
        content,
        published,
        slug,
        authorId: req.user.userId,
      }
    });
    res.status(201).json(blog);
  } catch (error) {
    next(error)
  }
}

export const deleteBlog = async (req, res, next) => {
  const { slug } = req.params;
  try {
    const blog = await prisma.blog.delete({ where: { slug }})
    res.status(204).send()
  } catch (error) {
    next(error)
  }
  res.send('deleted')
}

export const edit = async (req, res, next) => {
  const { slug } = req.params;
  try {
    const blog = await prisma.blog.findUnique({ where: { slug }});
    res.json(blog)
  } catch (error) {
    next(error)
  }
}

export const update = async (req, res, next) => {
  const { slug } = req.params;
  const { title, content, published } = req.body;
  try {
    const blog = await prisma.blog.update({
      where: { slug },
      data: {
        title,
        content,
        published,
      }
    });
    res.status(200).json(blog)
  } catch (error) {
    next(error)
  }
}