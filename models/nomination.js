
'use strict';
module.exports = (sequelize, DataTypes) => {
  var Nomination = sequelize.define('Nomination', {
    //id for matchmaker/nominee relationship
  nomineeprospectid: {
      type: DataTypes.integer, //can be UUID
      primaryKey: true,
      allowNull: false
    },
    //this is from userid
    matchmaker: DataTypes.integer,
    //this is from userid
    nominee: DataTypes.integer,
  }, {});

  return Nomination;
};
