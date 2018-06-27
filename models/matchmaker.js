'use strict';
 module.exports = (sequelize, DataTypes) => {
   var Matchmaker = sequelize.define('Matchmaker', {
     //id for matchmaker/nominee relationship
     matchmakernomineeid: {
       type: DataTypes.integer, //can be UUID
       primaryKey: true,
       allowNull: false
     },
     //this is from userid
     nominee: DataTypes.integer,
     //this is from userid
     prospect: DataTypes.integer,
   }, {});

   return Matchmaker;
 };
