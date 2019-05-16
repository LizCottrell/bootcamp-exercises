module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define("post", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 160]
      }
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        min: 1
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return Post;
};
