'use strict';
 module.exports = (sequelize, DataTypes) => {
   var Matchmaker = sequelize.define('Matchmaker', {
     //id for matchmaker/nominee relationship
     nomineeid: {
       type: DataTypes.INTEGER, //can be UUID
       allowNull: false
     },
     //this is from userid
     matchmakerid: DataTypes.INTEGER,
   }, {});

   return Matchmaker;
 };
