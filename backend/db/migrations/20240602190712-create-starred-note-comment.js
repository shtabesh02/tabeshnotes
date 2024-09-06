'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('StarredNoteComments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          id: 'id'
        },
        onDelete: 'CASCADE',
        allowNull: false
      },
      starrednote_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'StarredNotes',
          id: 'id'
        },
        onDelete: 'CASCADE',
        allowNull: false
      },
      comment: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }, options);
  },
  async down(queryInterface, Sequelize) {
    options.tableName = "StarredNoteComments";
    await queryInterface.dropTable(options);
  }
};