'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class User extends Sequelize.Model {}
  User.init({
      // id (Integer, primary key, auto-generated)
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    // firstName (String)
    firstName: Sequelize.STRING,
    // lastName (String)
    lastName: Sequelize.STRING,
    // emailAddress (String)
    emailAddress: {
      type: Sequelize.STRING,
      // unique : {
      //   args: true,
      //   msg: "Email address already in use!",
      // }
    },
    // password (String)
    password: Sequelize.STRING,

}, { sequelize });


  User.associate = (models) => {
    User.hasMany(models.Course, { 
      as: 'user', // alias
      foreignKey: {
        fieldName: 'userId',
        allowNull: false,
      } 
    });
  };

  return User;
}






