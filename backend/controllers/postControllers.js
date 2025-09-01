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
   * @returns {Promise} 
   */
  static async getAllPosts(req) {
    return Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username']
        }
      ],
      order: [['date', 'DESC']]
    });
  }

  /**
   * Find a post by its ID, including user and comments
   * @param {http.IncomingMessage} req
   * @returns {Promise} 
   */
  static async getPostById(req) {
    return Post.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ['username'] },
        {
          model: Comment,
          attributes: ['id', 'text', 'date', 'userId'],
          include: [{ model: User, attributes: ['username'] }]
        }
      ]
    });
  }

  /**
   * Delete a post by its ID
   * @param {http.IncomingMessage} req
   * @returns {Promise} 
   */
  static async deletePost(req) {
    const post = await Post.findByPk(req.params.id);
    if (!post) throw new Error('Post not found');
    await post.destroy();
    return post;
  }

  /**
   * Update a post by its ID
   * @param {http.IncomingMessage} req
   * @returns {Promise} 
   */
  static async updatePost(req) {
    const post = await Post.findByPk(req.params.id);
    if (!post) throw new Error('Post not found');

    // update only the fields that are provided in the request body
    if (req.body.title !== undefined) post.title = req.body.title;
    if (req.body.description !== undefined) post.description = req.body.description;
    if (req.body.gender !== undefined) post.gender = req.body.gender;
    if (req.body.image !== undefined) post.image = req.body.image;
    if (req.body.latitude !== undefined) post.latitude = req.body.latitude;
    if (req.body.longitude !== undefined) post.longitude = req.body.longitude;

    await post.save();
    return post;
  }
}

