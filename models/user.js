'use strict';
module.exports = (sequelize, DataTypes) => {
 var UserProfile = sequelize.define('UserProfile', {
   username: DataTypes.STRING,
   dob: DataTypes.STRING,
   email: {type: DataTypes.STRING,
   unique: true},
   sexpref: DataTypes.STRING,
   gender: DataTypes.STRING,
   password: DataTypes.STRING,
   bio: DataTypes.TEXT,
   youngest: DataTypes.INTEGER,
   oldest: DataTypes.INTEGER
 }, {});
 UserProfile.associate = function(models) {
   // associations can be defined here
 };
 return UserProfile;
};
