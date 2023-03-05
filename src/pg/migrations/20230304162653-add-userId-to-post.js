'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return Promise.all([
      queryInterface.addColumn(
          'posts',
          'userId',
          {
            type: Sequelize.INTEGER
          }
      ),
      queryInterface.addConstraint(
          'posts',
          {
            fields: [ 'userId' ],
            type: 'foreign key',
            name: 'fk_user_id',
            references: {
              table: 'users',
              field: 'id'
            },
            onDelete: 'cascade',
            onUpdate: 'cascade'
          }
      )
    ]).then(
        (value) => {
          console.log("userId column was added to the posts table");
          console.log(value);
        },
        (err) => {
          console.log(err);
        }
    );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return Promise.all([
        queryInterface.removeColumn(
            'posts',
            'userId'
        )
    ]).then(
        (value) => {
          console.log("userId column was removed from the posts table");
          console.log(value);
        },
        (err) => {
          console.log(err);
        }
    );
  }
};
