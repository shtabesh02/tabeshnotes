'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NoteComment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      NoteComment.belongsTo(models.User, {
        foreignKey: 'user_id'
      });

      NoteComment.belongsTo(models.Note, {
        foreignKey: 'note_id'
      })
    }
  }
  NoteComment.init({
    user_id: DataTypes.INTEGER,
    note_id: DataTypes.INTEGER,
    comment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'NoteComment',
  });
  return NoteComment;
};