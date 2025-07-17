import { Post, User, Comment } from '../models/database.js';

export class PostController {
  /**
   * Create a new post with the provided details
   * @param {http.IncomingMessage} req
   * @returns {Promise} 
   */
  static async createPost(req) {
    let post = Post.build({
      title: req.body.title,
      description: req.body.description,
      gender: req.body.gender,
      image: req.body.image,
      latitude: req.body.latitude,
      longitude: req.body.longitude
    });
    post.userId = req.user.id; //with middleware, req.user is set to the authenticated user
    return post.save();
  }

  /**
   * Find all posts with user details
   * @param {http.IncomingMessage} req
   * @returns {Promise} Lista dei post
   */
  static async getAllPosts(req) {
    return Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username']
        }
      ]
    });
  }

  /**
   * Find a post by its ID, including user and comments
   * @param {http.IncomingMessage} req
   * @returns {Promise} Il post trovato
   */
  static async getPostById(req) {
    return Post.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ['username'] },
        {
          model: Comment,
          attributes: ['text', 'date'],
          include: [{ model: User, attributes: ['username'] }]
        }
      ]
    });
  }

  /**
   * Delete a post by its ID
   * @param {http.IncomingMessage} req
   * @returns {Promise} Il post eliminato
   */
  static async deletePost(req) {
    return new Promise((resolve, reject) => {
      Post.findByPk(req.params.id).then(post => {
        if (!post) return reject(new Error('Post non trovato'));
        if (post.userId !== (await User.findOne({ where: { username: req.user } })).id) {
          return reject(new Error('Non autorizzato'));
        }
        post.destroy().then(() => resolve(post));
      }).catch(reject);
    });
  }
}