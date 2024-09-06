'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course_Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Course_Comment.belongsTo(models.User, {
        foreignKey: 'user_id'
      });

      Course_Comment.belongsTo(models.Course, {
        foreignKey: 'course_id'
      })
    }
  }
  Course_Comment.init({
    user_id: DataTypes.INTEGER,
    course_id: DataTypes.INTEGER,
    comment: DataTypes.STRING,
    stars: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Course_Comment',
  });
  return Course_Comment;
};