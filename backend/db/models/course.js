'use strict';
const { Model, Validator} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Course.belongsToMany(models.User, {
        through: models.UserCourse,
        foreignKey: 'course_id',
        otherKey: 'user_id',
        onDelete: 'CASCADE'
        // hooks: true // this should be on one side.
      });

      Course.hasMany(models.Lesson, {
        foreignKey: 'course_id',
        onDelete: 'CASCADE'
      });

      Course.hasMany(models.Course_Comment, {
        foreignKey: 'course_id',
        onDelete: 'CASCADE'
      })

      Course.belongsTo(models.User, {
        foreignKey: 'user_id'
      })

      Course.hasMany(models.CompletedLesson, {
        foreignKey: 'course_id',
        onDelete: 'CASCADE'
      })
    }
  }
  Course.init({
    user_id: DataTypes.INTEGER,
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Please provide the title of the course."
        }
      }
    },
    instructor: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Please provide the name of the instructor."
        }
      }
    },
    category: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Please select the category of the course."
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Please provide a description about the course."
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};