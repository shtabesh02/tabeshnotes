'use strict';

const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
      User.belongsToMany(models.Course, {
        through: models.UserCourse,
        foreignKey: 'user_id',
        otherKey: 'course_id',
        onDelete: 'CASCADE',
        hooks: true
      });

      User.hasMany(models.Course_Comment, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE'
      });

      User.hasMany(models.Lesson, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE'
      })

      User.hasMany(models.Course, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE'
      })

      User.hasMany(models.StarredNote, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE'
      })

      User.hasMany(models.StarredNoteComment, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE'
      })

      User.hasOne(models.UserProfile, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE'
      })

      User.hasMany(models.CompletedLesson, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE'
      });
    }
  };

  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [4, 30],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error("Cannot be an email.");
            }
          }
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 256],
          isEmail: true
        }
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60]
        }
      }
    },
    {
      sequelize,
      modelName: "User",
      defaultScope: {
        attributes: {
          exclude: ["hashedPassword", "email", "createdAt", "updatedAt"]
        }
      }
    }
  );
  return User;
};


// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class User extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   User.init({
//     username: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//       validate: {
//         min: 4,
//         max: 30,
//         isEmail: false
//       }

//     },
//     email: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//       validate: {
//         min: 3,
//         max: 256,
//         isEmail: true
//       }
//     },
//     hashedPassword: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       validate: {
//         min: 60,
//         max: 60
//       }
//     }
//   }, {
//     sequelize,
//     modelName: 'User',
//   });
//   return User;
// };