'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    // Get all existing users, then insert fake posts
    const usersRows = (await queryInterface.sequelize.query(
        'SELECT id from public."users";'
    ))[0];

    console.log("Found users:");
    console.log(usersRows);
    console.log(typeof usersRows[0].id);

    return (usersRows.length > 0 && usersRows[0].hasOwnProperty("id")) ?
            queryInterface.bulkInsert(
            'posts',
            [
                {
                    text: 'Lorem ipsum 1',
                    userId: usersRows[0].id,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    text: 'Lorem ipsum 2',
                    userId: usersRows[0].id,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }
            ],
            {}
        ) :
        async () => {};
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('posts', null, {});
  }
};
