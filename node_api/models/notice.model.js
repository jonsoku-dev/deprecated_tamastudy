const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Notice extends Model {
  static init(sequelize) {
    return super.init(
      {
        title: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        desc: {
          type: DataTypes.STRING(1000),
          allowNull: false,
        },
        view: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
        },
      },
      {
        modelName: 'Notice',
        tableName: 'notices',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci', // 한글 저장 , 이모티콘 저장
        sequelize,
      }
    );
  }

  static associate(db) {
    db.Notice.belongsTo(db.User);
  }
};
