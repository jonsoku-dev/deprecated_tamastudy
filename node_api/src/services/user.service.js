const { User } = require('../db/models');

module.exports.findUserById = async ({ userId }) => {
  const userRecord = await User.findOne({
    where: {
      id: userId,
    },
    attributes: {
      exclude: ['password'],
    },
  });
  return { user: userRecord };
};

module.exports.findUserByEmail = async ({ email }) => {
  const userRecord = await User.findOne({
    where: {
      email,
    },
    attributes: {
      exclude: ['password'],
    },
  });
  return { user: userRecord };
};

module.exports.createUser = async ({ requestBody }) => {
  const userRecord = await User.create(requestBody);
  return { user: userRecord };
};
