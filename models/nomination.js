
'use strict';
module.exports = (sequelize, DataTypes) => {
  var Nomination = sequelize.define('Nomination', {
    //id for matchmaker/nominee relationship
  nomineeprospectid: {
      type: DataTypes.INTEGER, //can be UUID
      allowNull: false
    },
    //this is from userid
    matchmaker: DataTypes.INTEGER,
    //this is from userid
    nominee: DataTypes.INTEGER,
  }, {});

  return Nomination;
};
