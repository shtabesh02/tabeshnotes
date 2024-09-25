'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Media extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Media.belongsTo(models.Note, {
        foreignKey: 'note_id'
      });

      Media.belongsTo(models.Lesson, {
        foreignKey: 'lesson_id'
      })
    }
  }
  Media.init({
    name: DataTypes.STRING,
    note_id: DataTypes.INTEGER,
    lesson_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Media',
  });
  return Media;
};