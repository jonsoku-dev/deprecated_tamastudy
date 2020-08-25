const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class User extends Model {
  static init(sequelize) {
    return super.init(
      {
        username: {
          type: DataTypes.STRING(20),
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING(30),
          allowNull: false,
          unique: true,
        },
        role: {
          type: DataTypes.ENUM('normal', 'special', 'admin'),
          allowNull: false,
          defaultValue: 'normal',
        },
        password: {
          type: DataTypes.STRING(100),
          allowNull: false, // 필수 (required의 의미)
        },
        avatar: {
          type: DataTypes.STRING(100),
        },
        facebook: {
          type: DataTypes.STRING(100),
        },
        twitter: {
          type: DataTypes.STRING(100),
        },
        github: {
          type: DataTypes.STRING(100),
        },
      },
      {
        modelName: 'User',
        tableName: 'users',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci', // 한글 저장 , 이모티콘 저장
        sequelize,
      }
    );
  }

  static associate(db) {
    db.User.hasMany(db.Post);
    db.User.hasMany(db.Notice);
    db.User.hasMany(db.Comment);
    db.User.belongsToMany(db.Post, { through: 'Like', as: 'Liked' });
  }
};