'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('records', [{
      name: '中餐',
      category: '餐飲',
      amount: 2,
      unitPrice: 44,
      merchant: '麥當勞',
      date: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 1
      // itemTotalPrice: 110
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('records', null, {});
  }
};
