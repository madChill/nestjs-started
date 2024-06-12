'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      id:1,
      dob: '1990-01-01',
      status: 'active',
      nationality: 'US',
      roles: 'manager',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      id:2,
      dob: '1992-02-02',
      status: 'inactive',
      nationality: 'UK',
      roles: 'employee',
      created_at: new Date(),
      updated_at: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', { id: [1, 2] }, {});
  }
};