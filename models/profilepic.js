'use strict';
module.exports = (sequelize, DataTypes) => {
  var Profilepic = sequelize.define('Profilepic', {
    imgsource: DataTypes.STRING,
    //this is from userid
    userid: DataTypes.INTEGER,

  }, {});

  return Profilepic;
};
