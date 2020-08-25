const { User } = require('../models');

module.exports.findUserById = async (id) => {
  const userRecord = await User.findOne({
    where: {
      id,
    },
    attributes: {
      exclude: ['password'],
    },
  });
  return { user: userRecord };
};

module.exports.findUserByEmail = async (email) => {
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

module.exports.createUser = async (user) => {
  const userRecord = await User.create(user);
  return { user: userRecord };
};
