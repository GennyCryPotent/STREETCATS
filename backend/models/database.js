import { Sequelize } from 'sequelize';
import { createModel as createPostModel } from './post.js';
import { createModel as createUserModel } from './user.js';
import { createModel as createCommentModel } from './comment.js';

const database = new Sequelize({
  dialect: process.env.DB_DIALECT,
  storage: process.env.DB_PATH,
  logging: false
});

// models (NB: sequelize define models with plural names by default)
createUserModel(database);
createPostModel(database);
createCommentModel(database);

export const { User, Post, Comment } = database.models;

User.hasMany(Post, { foreignKey: 'userId' });
Post.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Comment, { foreignKey: 'userId' });
Comment.belongsTo(User, { foreignKey: 'userId' });

Post.hasMany(Comment, { foreignKey: 'postId' });
Comment.belongsTo(Post, { foreignKey: 'postId' });

export default database;
