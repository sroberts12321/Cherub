'use strict';
module.exports = (sequelize, DataTypes) => {
  var Profilepic = sequelize.define('Profilepic', {
    imgsource: DataTypes.STRING,
    //this is from userid
    userid: DataTypes.INTEGER,

  }, {});
  Profilepic.associate = function(models) {
    // associations can be defined here
  };

  return Profilepic;
};
