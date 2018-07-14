'use strict';
module.exports = (sequelize, DataTypes) => {
 var UserProfile = sequelize.define('UserProfile', {
   firstname: DataTypes.STRING,
   lastname: DataTypes.STRING,
   dob: DataTypes.DATE,
   email: {type: DataTypes.STRING,
   unique: true},
   sexpref: DataTypes.STRING,
   gender: DataTypes.STRING,
   password: DataTypes.STRING,
   bio: DataTypes.TEXT,
   youngest: DataTypes.INTEGER,
   oldest: DataTypes.INTEGER,
   profilepic: DataTypes.STRING
 }, {});
 UserProfile.associate = function(models) {
   // associations can be defined here
 };
 return UserProfile;
};
