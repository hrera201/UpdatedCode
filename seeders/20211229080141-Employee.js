'use strict';
var fs=require('fs');
var readline=require('readline');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    let stream=fs.createReadStream('emp.csv');
    const rl=readline.createInterface({
      input:stream,
      crlfDelay:Infinity
    })
    let data_to_insert=[]
    for await (const line of rl){
      let line_split=line.split(',')
      data_to_insert.push({name:line_split[0],email:line_split[1],pass:line_split[2],company:line_split[3],createdAt:new Date(),updatedAt:new Date()})
    }
    await queryInterface.bulkInsert('Employees', data_to_insert, {})


  },

  down: async (queryInterface, Sequelize) => {
    
  }
};
