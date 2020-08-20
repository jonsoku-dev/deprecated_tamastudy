const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Comment extends Model {
    static init(sequelize) {
        return super.init(
            {
                desc: {
                    type: DataTypes.STRING(500),
                    allowNull: false,
                },
            },
            {
                modelName: "Comment",
                tableName: "comments",
                charset: "utf8mb4",
                collate: "utf8mb4_general_ci", // 한글 저장 , 이모티콘 저장
                sequelize,
            }
        );
    }
    static associate(db) {
        db.Comment.belongsTo(db.Post);
        db.Comment.belongsTo(db.User);
    }
};
