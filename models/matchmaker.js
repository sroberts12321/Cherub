'use strict';
 module.exports = (sequelize, DataTypes) => {
   var Matchmaker = sequelize.define('Matchmaker', {
     //id for matchmaker/nominee relationship
     matchmakernomineeid: {
       type: DataTypes.INTEGER, //can be UUID
       primaryKey: true,
       allowNull: false
     },
     //this is from userid
     nominee: DataTypes.INTEGER,
     //this is from userid
     prospect: DataTypes.INTEGER,
   }, {});

   return Matchmaker;
 };
