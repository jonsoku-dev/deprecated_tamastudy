const expressAsyncHandler = require('express-async-handler');
const { User, Comment } = require('../models');

const findCommentListWithUser = async (postId) => {
  return await Comment.findAll({
    where: {
      PostId: parseInt(postId, 10),
    },
    include: [
      {
        model: User,
        attributes: ['id', 'username'],
      },
    ],
    order: [
      ['id', 'DESC'],
      ['updatedAt', 'DESC'],
    ],
  });
};

const findCommentWithUser = async (commentId) => {
  return await Comment.findOne({
    where: {
      id: commentId,
    },
    include: [
      {
        model: User,
        attributes: ['id', 'username'],
      },
    ],
  });
};

exports.createComment = expressAsyncHandler(async (req, res, next) => {
  const newComment = await Comment.create({
    ...req.body,
    UserId: req.user.id,
    PostId: req.post.id,
  });
  const result = await findCommentWithUser(newComment.id);
  req.post = null;
  res.status(201).json(result);
});
exports.getCommentList = expressAsyncHandler(async (req, res, next) => {
  const result = await findCommentListWithUser(req.params.postId);
  req.post = null;
  res.status(200).json(result || []);
});
exports.editComment = expressAsyncHandler(async (req, res, next) => {
  const comment = req.comment;

  await comment.update(req.body, {
    where: {
      id: req.params.commentId,
    },
    logging: true,
  });

  const result = await findCommentWithUser(req.params.commentId);

  req.post = null;
  req.comment = null;

  res.status(201).json(result);
});
exports.deleteComment = expressAsyncHandler(async (req, res, next) => {
  const comment = req.comment;

  await comment.destroy({
    include: [
      {
        model: User,
        attributes: ['id', 'nickname'],
      },
    ],
  });

  req.post = null;
  req.comment = null;

  res.status(200).json(parseInt(req.params.commentId, 10));
});
