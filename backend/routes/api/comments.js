const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation')
const { Course_Comment, User } = require('../../db/models');
const { where } = require('sequelize');

// loading comments for a course based on its id -->
router.get('/:course_id/comments', async (req, res) => {
    const course_id = parseInt(req.params.course_id);
    const comments = await Course_Comment.findAll({ where: { course_id: course_id },
    include: [
        {model: User, attributes: ['id', 'firstName', 'lastName']}
    ] })
    // console.log('comments in the server: ', comments)
    const commentsList = []
    comments.forEach(comment => {
        commentsList.push(comment.toJSON());
    });
    // console.log('comments list in the server: ', commentsList)
    res.status(200).json(commentsList);
})


// adding a new comment
// comment validation
const validateComment = [
    check('comment')
        .notEmpty()
        .withMessage('Add a comment.')
        .isLength({ max: 255 })
        .withMessage('The comment must be less than 255 characters.'),
    handleValidationErrors
]
router.post('/:course_id/comment', validateComment, async (req, res) => {
    const { user_id, course_id, comment, stars } = req.body;
    const newcomment = await Course_Comment.create({ user_id, course_id, comment, stars });
    // console.log()
    const commentanduser = await Course_Comment.findOne({where: { id: newcomment.id},
    include: [
        {model: User, attributes: ['id', 'firstName', 'lastName']}
    ]})
    // console.log()
    res.status(200).json(commentanduser);
})



// loading a comment by its id -->
router.get('/:course_id/comments/:comment_id', async (req, res) => {
    const { course_id, comment_id } = req.params;
    const mycomment = await Course_Comment.findAll({ where: { id: comment_id, course_id: course_id } })
    // console.log('my coment from db: ', mycomment)
    res.status(200).json(mycomment)
})


// delete a comment
router.delete('/:comment_id', async (req, res) => {
    const { comment_id } = req.params;
    const thecomment = await Course_Comment.findOne({ where: { id: comment_id } })
    await thecomment.destroy();
    res.status(200).json(thecomment);
})

// update a comment
router.put('/:comment_id', validateComment, async (req, res) => {
    const { user_id, course_id, comment, stars } = req.body;
    const commentid = req.params.comment_id;
    const targetcomment = await Course_Comment.findOne({ where: { id: commentid } });
    
    await targetcomment.set({
        user_id,
        course_id,
        comment,
        stars
    })
    await targetcomment.save();
        // console.log()
        const updatedResult = await Course_Comment.findOne({where: { id: targetcomment.id},
            include: [
                {model: User, attributes: ['id', 'firstName', 'lastName']}
            ]})
            // console.log()
    res.status(200).json(updatedResult);
})


module.exports = router;