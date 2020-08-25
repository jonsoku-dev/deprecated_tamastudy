const expressAsyncHandler = require('express-async-handler');
const { Category } = require('../models');

module.exports.createCatrgory = expressAsyncHandler(async (req, res) => {
  const newCategory = await Category.create(req.body);
  res.status(201).json(newCategory);
});
module.exports.getCatrgoryList = expressAsyncHandler(async (req, res) => {
  const categories = await Category.findAll({
    order: [
      ['id', 'DESC'],
      ['updatedAt', 'DESC'],
    ],
  });
  res.status(200).json(categories);
});
module.exports.deleteCatrgory = expressAsyncHandler(async (req, res) => {
  const findCategory = await Category.findOne({
    where: {
      id: req.params.categoryId,
    },
  });
  if (!findCategory) {
    return res.status(403).json('카테고리를 찾을 수 없습니다. ');
  }
  await findCategory.destroy();
  res.status(200).json(parseInt(req.params.categoryId, 10));
});
