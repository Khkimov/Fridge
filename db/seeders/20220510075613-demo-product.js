module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Products', [
      {
        name: 'Banana',
        user_id: 1,
        category_id: 1,
        img: 'https://lenta.gcdn.co/globalassets/1/-/01/12/30/292498_1.png?preset=fulllossywhite',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Cheese origin Dagestan',
        user_id: 2,
        category_id: 2,
        img: 'https://images.saymedia-content.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:eco%2Cw_1200/MTc0NjQ1MTIyMzYwMDkyMDI2/some-milk-products-name-in-hindi.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Products', null, {});
  },
};
