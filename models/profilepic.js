
  'use strict';
  module.exports = (sequelize, DataTypes) => {
    var Profilepic = sequelize.define('Profilepic', {
      //id for matchmaker/nominee relationship
      profilepicid: {
        type: DataTypes.integer, //can be UUID
        primaryKey: true,
        allowNull: false
      }
      imgsource: DataTypes.string,
      //this is from userid
      userid: DataTypes.integer,

    }, {});

    return Profilepic;
  };
