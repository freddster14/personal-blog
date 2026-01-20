import validate from '../middleware/handleValidation.js';
import { validateBlog } from '../middleware/validation.js';
import { prisma } from '../prisma/client.js';
import { slugify } from '../utils/slugify.js';

export const latest = async (req, res, next) => {
  try {
    const blogs = await prisma.blog.findMany({
      take: 6,
      where: {
        published: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        author: {
          select: {
            name: true,
          }
        }
      }
    })
    return res.status(200).json(blogs);
  } catch (error) {
    next(error);
  }
}

export const getAll = async (req, res, next) => {
  let blogs;
  try {
    if(req.user?.role === 'admin') {
      blogs = await prisma.blog.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        author: {
          select: {
            name: true,
          }
        }
      },
    });
    } else {
      blogs = await prisma.blog.findMany({
      where: {
        published: true,
      },
      orderBy: { createdAt: 'desc' },
      include: {
        author: {
          select: {
            name: true,
          }
        }
      },
    });
    }
    return res.status(200).json(blogs)
  } catch (error) {
    next(error)
  }
}

export const getOne = async (req, res, next) => {
  const { slug } = req.params;
  try {
    const blog = await prisma.blog.findUnique({
      where: {
        slug,
      },
      include: {
        author: {
          select: {
            name: true,
            email: true,
          }
        },
        comments: {
          
          include: {
            author: {
              select: {
                name: true,
              },
            },
          },
           orderBy: {
                createdAt: 'desc',
              },
        },
      }
    });
    console.log(req.user, blog) 
    if((req.user?.role === 'admin') || blog.published) {
      return res.status(200).json(blog)
    } else {
      return res.status(404).json({ message: "Blog not found or available" });
    }
  } catch (error) {
    next(error)
  }
}


export const create = [
  validateBlog,
  validate,
  async (req, res, next) => {
    if(req.user?.role !== 'admin') return res.status(403).json({ message: 'No permission' })
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
]

export const deleteBlog = async (req, res, next) => {
  if(req.user?.role !== 'admin') return res.status(403).json({ message: 'No permission' })
  const { slug } = req.params;
  try {
    const blog = await prisma.blog.delete({ where: { slug }});
    res.status(200).json({ message: 'Blog deleted'})
  } catch (error) {
    next(error)
  }
}

export const edit = async (req, res, next) => {
  if(req.user?.role !== 'admin') return res.status(403).json({ message: 'No permission' })
  const { slug } = req.params;
  try {
    const blog = await prisma.blog.findUnique({ where: { slug }});
    if(!blog) return res.status(404).json({ message: "Blog not found" })
    return res.status(200).json(blog)
  } catch (error) {
    next(error)
  }
}


export const update = [
  validateBlog,
  validate,
  async (req, res, next) => {
    if(req.user.role !== 'admin') return res.status(403).json({ message: 'No permission' })
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
]