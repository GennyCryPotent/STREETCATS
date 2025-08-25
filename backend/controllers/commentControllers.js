import {Comment, User, Post} from  '../models/database.js';

export class CommentController {

    /**
     * Create a new comment for a post
     * @param {http.IncomingMessage} req
     * @returns {Promise} 
     */
    static async createComment(req) {
   
   let comment = await Comment.create({
        text: req.body.text,       
        postId: req.body.postId,   
        userId: req.user.id,       
        date: new Date().toISOString()          
   });

   return await Comment.findByPk(comment.id, {
      include: [{ model: User, attributes: ['username'] }]
   });
}


    /**
     * Get all comments for a specific post
     * @param {http.IncomingMessage} req
     * @returns {Promise} 
     */
    static async getCommentsByPostId(req) {
        const postId = req.params.postId;
        return Comment.findAll({
            where: { postId },
            include: [{ model: User, attributes: ['username'] }]
        });
}

    /**
     * Delete a comment by its ID
     * @param {http.IncomingMessage} req
     * @returns {Promise} 
     */
    static async deleteComment(req) {
        const comment = await Comment.findByPk(req.params.id);
        if (!comment) throw new Error('Comment not found');
        await comment.destroy();
        return comment;
    }

    /**
   * Update a comment by its ID
   * @param {http.IncomingMessage} req
   * @returns {Promise} 
   */
    static async updateComment(req) {
        const comment = await Comment.findByPk(req.params.id);
        if (!comment) throw new Error('Comment not fount');

        if (req.body.text !== undefined) comment.text = req.body.text;

        await comment.save();
        return comment;
    }
    
}