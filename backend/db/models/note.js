'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Note extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Note.hasMany(models.StarredNoteComment, {
        foreignKey: 'note_id',
        onDelete: 'CASCADE'
      });

      Note.belongsTo(models.User, {
        foreignKey: 'user_id',
      });

      Note.hasMany(models.Media, {
        foreignKey: 'note_id',
      })
    }
  }
  Note.init({
    user_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    content: DataTypes.TEXT, // Changed it from STRING to TEXT
  }, {
    sequelize,
    modelName: 'Note',
  });
  return Note;
};