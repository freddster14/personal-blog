import { prisma } from '../prisma/client.js';

export const getBlogComments = async (req, res, next) => {
  const { slug } = req.params;
  try {
    const comments = await prisma.comment.findMany({ where: { slug }})
    return res.json(comments);
  } catch (error) {
    next(error);
  }
}

export const create = async (req, res, next) => {
  const { slug } = req.params;
  const { content } = req.body;
  try {
    const blog = await prisma.blog.findUnique({ where: { slug }});
    if(!blog) return res.status(400).json({ message: "Blog not found" });
    const comment = await prisma.comment.create({
      data: {
        content,
        blogId: blog.id,
        authorId: req.user.userId,
      }
    })
    return res.status(201).json(comment);
  } catch (error) {
    next(error);
  }
}

export const deleteComment = async (req, res, next) => {
  const { id } = req.params;
  try {
    const comment = await prisma.comment.findUnique({ where: { id: Number(id) }});
    if(comment && (comment.authorId === req.user.userId || req.user.role === 'admin')) {
      await prisma.comment.delete({ where: { id: Number(id) }});
    } else {
      return res.status(400).json({ message: 'Comment cannot be deleted'});
    }
    return res.status(200).send('deleted')
  } catch (error) {
    next(error);
  }
}

