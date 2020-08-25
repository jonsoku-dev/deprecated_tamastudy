const expressAsyncHandler = require('express-async-handler');
const { Notice, User } = require('../models');

const findNoticeListWithUser = async (offset, limit) => {
  return await Notice.findAll({
    include: [
      {
        model: User,
        attributes: ['id', 'username', 'email'],
      },
    ],
    offset,
    limit,
    order: [
      ['id', 'DESC'],
      ['updatedAt', 'DESC'],
    ],
  });
};

const findNoticeWithUser = async (noticeId) => {
  return await Notice.findOne({
    where: {
      id: noticeId,
    },
    include: [
      {
        model: User,
        attributes: [
          'id',
          'username',
          'email',
          'github',
          'facebook',
          'twitter',
        ],
      },
    ],
  });
};

module.exports.createNotice = expressAsyncHandler(async (req, res) => {
  const newNotice = await Notice.create({
    UserId: req.user.id,
    ...req.body,
  });
  res.status(201).json(newNotice);
});
module.exports.getNoticeList = expressAsyncHandler(async (req, res) => {
  const offset = req.query.offset ? parseInt(req.query.offset, 10) : 0;
  const limit = req.query.limit ? parseInt(req.query.limit, 10) : null;
  const noticeList = await findNoticeListWithUser(offset, limit);
  res.status(200).json(noticeList);
});
module.exports.getNotice = expressAsyncHandler(async (req, res) => {
  const notice = req.notice;
  await notice.increment('view', { by: 1 });
  const result = await findNoticeWithUser(req.params.noticeId);
  req.notice = null;

  res.status(200).json(result);
});
module.exports.editNotice = expressAsyncHandler(async (req, res) => {
  const notice = req.notice;

  await notice.update(req.body, {
    where: {
      id: req.params.noticeId,
    },
    logging: true,
  });

  const result = await findNoticeWithUser(req.params.noticeId);
  req.notice = null;

  res.status(200).json(result);
});
module.exports.deleteNotice = expressAsyncHandler(async (req, res) => {
  const notice = req.notice;

  await notice.destroy();

  req.notice = null;

  res.status(200).json(parseInt(req.params.noticeId, 10));
});
