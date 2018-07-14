'use strict';
module.exports = (sequelize, DataTypes) => {
  var Profilepic = sequelize.define('Profilepic', {
    //id for matchmaker/nominee relationship
    profilepicid: {
      type: DataTypes.INTEGER, //can be UUID
      primaryKey: true,
      allowNull: false
    },
    imgsource: DataTypes.STRING,
    //this is from userid
    userid: DataTypes.INTEGER,

  }, {});
  Profilepic.associate = function(models) {
    // associations can be defined here
  };

  return Profilepic;
};
