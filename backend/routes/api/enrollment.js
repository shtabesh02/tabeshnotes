const express = require('express');
const router = express.Router();
const { User, UserCourse, Course, Lesson, CompletedLesson } = require('../../db/models');
const { where, Sequelize } = require('sequelize');
router.get('/:user_id', async (req, res) => {
    try {
        const { user_id } = req.params;
        // console.log('user_id: ', user_id)
        const user = await User.findByPk(user_id);
        // console.log('user: ', user);
        if (!user) {
            return res.status(404).json(
                {
                    message: "You need to log in first."
                }
            )
        }
        const enrolledcourses = await user.getCourses({
            attributes: ['id', 'title', 'instructor', 'category', 'description', 'createdAt', 'updatedAt'],
            include: [
                {
                    model: Lesson,
                    attributes: ['id', 'course_id'],
                    include: [{
                        model: CompletedLesson, where: { user_id },
                        required: false,
                        attributes: ['id']
                    }]
                }
            ],
            // group: ['Course.id']
        });

        // console.log('enrolledcourses: ', enrolledcourses)

        const result = [];
        enrolledcourses.forEach(course => {
            result.push(course.toJSON())
        });
        const coursesWithLessonCounts = result.map(course => {
            const numOfLessons = course.Lessons.length;
            const numOfCompletedLessons = course.Lessons.filter(lesson => lesson.CompletedLessons.length > 0).length;
            return { ...course, numOfLessons, numOfCompletedLessons };
        });
     
        // result.forEach(course => {
        //     course.numOfLessons = course.Lessons.length;
        //     course.numOfCompletedLessons = course.Lessons.filter(lesson => lesson.CompletedLesson.length > 0).length
        //     // course.Lessons.forEach(lesson => {
        //         // if(lesson.CompletedLessons.length > 0){
        //         //     course.numOfCompletedLessons = lesson.CompletedLesson.length;
        //         // }else{
        //         //     course.numOfCompletedLessons = 0;
        //         // }
        //     // })
        // })
        // console.log('result: ', result)
        res.status(200).json(coursesWithLessonCounts);

    } catch (error) {
        res.status(404).json({
            message: "You are not enrolled in to any course. Get enrolled in a course, and try again later."
        })
    }
});

router.post('/enrollnow', async (req, res) => {
    const { user_id, course_id } = req.body;
    const gotenrolled = await UserCourse.create({
        user_id,
        course_id
    });

    const user = await User.findByPk(user_id);
    const newEnrollment = await user.getCourses()
    res.status(200).json(newEnrollment);
})
module.exports = router