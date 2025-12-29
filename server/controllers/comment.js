import { prisma } from '../prisma/client.js';

export const getBlogComments = async (req, res, next) => {
  const { id } = req.params;
  try {
    const comments = await prisma.comment.findMany({ where: { blogId: Number(id) }})
    res.json(comments);
  } catch (error) {
    next(error);
  }
}

export const create = async (req, res, next) => {
  try {
    const comment = await prisma.comment.create({
      data: {

      }
    })
    res.send('created')
  } catch (error) {
    next(error);
  }
}

export const deleteComment = async (req, res, next) => {
  const { id } = req.params;
  try {
    const comment = await prisma.comment.delete({ where: { id: Number(id) }})
    res.send('deleted')
  } catch (error) {
    next(error);
  }
}

