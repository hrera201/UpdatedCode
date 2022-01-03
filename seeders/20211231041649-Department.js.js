'use strict';
var fs=require('fs')
var readline=require('readline')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let stream=fs.createReadStream('dep.csv');
    const rl=readline.createInterface({
      input:stream,
      crlfDelay:Infinity
    })
    let data_to_insert=[]
    for await (const line of rl){
      let line_split=line.split(',')
      data_to_insert.push({name:line_split[0],location:line_split[1],createdAt:new Date(),updatedAt:new Date()})
    }
    await queryInterface.bulkInsert('Departments', data_to_insert, {})

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
