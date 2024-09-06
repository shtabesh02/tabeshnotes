const express = require('express');
const router = express.Router();
const { Lesson } = require('../../db/models');
// loading a lesson based on its id -->
router.get('/:course_id/lessons/:lesson_id', async (req, res) => {
    const { course_id, lesson_id } = req.params;
    const mylesson = await Lesson.findAll({ where: { id: lesson_id, course_id: course_id } });
    res.status(200).json(mylesson);
});



// loading lessons for a course based on course id -->
router.get('/:course_id/lessons', async (req, res) => {
    const { course_id } = req.params;
    const lessons = await Lesson.findAll({ where: { course_id: course_id } });
    // console.log('lessons: ', lessons)
    res.status(200).json(lessons)
})


module.exports = router;