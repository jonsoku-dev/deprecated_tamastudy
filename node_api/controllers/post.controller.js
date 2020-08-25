const expressAsyncHandler = require('express-async-handler');
const { Post, User, Comment, Category } = require('../models');

const findPostListWithUser = async () => {
  return await Post.findAll({
    include: [
      {
        model: User,
        attributes: ['id', 'username'],
      },
      {
        model: User,
        as: 'Likers',
        attributes: ['id'],
      },
      {
        model: Comment,
        attributes: ['id'],
      },
      {
        model: Category,
        attributes: ['id', 'name'],
      },
    ],
    order: [
      ['id', 'DESC'],
      ['updatedAt', 'DESC'],
    ],
  });
};

const findPostWithUser = async (postId) => {
  return await Post.findOne({
    where: {
      id: postId,
    },
    include: [
      {
        model: User,
        attributes: [
          'id',
          'username',
          'email',
          'facebook',
          'twitter',
          'github',
        ],
      },
      {
        model: User,
        as: 'Likers',
        attributes: ['id'],
      },
      {
        model: Category,
        attributes: ['id', 'name'],
      },
    ],
  });
};

exports.createPost = expressAsyncHandler(async (req, res, next) => {
  const newPost = await Post.create({
    UserId: req.user.id,
    ...req.body,
  });
  res.status(201).json(newPost);
});
exports.getPostList = expressAsyncHandler(async (req, res, next) => {
  const postList = await findPostListWithUser();
  res.status(200).json(postList);
});
exports.getPost = expressAsyncHandler(async (req, res, next) => {
  const post = req.post;
  await post.increment('view', { by: 1 });
  const result = await findPostWithUser(req.params.postId);
  req.post = null;

  res.status(200).json(result);
});
exports.editPost = expressAsyncHandler(async (req, res, next) => {
  const post = req.post;

  await post.update(req.body, {
    where: {
      id: req.params.postId,
    },
    logging: true,
  });

  const result = await findPostWithUser(req.params.postId);
  req.post = null;

  res.status(200).json(result);
});
exports.deletePost = expressAsyncHandler(async (req, res, next) => {
  const post = req.post;

  await post.destroy();

  req.post = null;

  res.status(200).json(parseInt(req.params.postId, 10));
});
exports.likePost = expressAsyncHandler(async (req, res, next) => {
  const post = req.post;
  await post.addLikers(req.user.id);
  req.post = null;
  res.status(200).json({ UserId: req.user.id });
});
exports.unLikePost = expressAsyncHandler(async (req, res, next) => {
  const post = req.post;
  await post.removeLikers(req.user.id);
  req.post = null;
  res.status(200).json({ UserId: req.user.id });
});
