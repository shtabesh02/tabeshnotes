import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { deltethelesson, loadlessonsfromDB } from "../../store/lessons";
import { useNavigate, useParams } from "react-router-dom";
import { loadCoursefromDB } from "../../store/courses";

import './ManageLessons.css'
const ManageLessons = () => {
    const dispatch = useDispatch();
    const { course_id } = useParams();
    const navigate = useNavigate();
    const course_title = useSelector(state => state.courseReducer.courseDetails?.title)
    const lessons = useSelector(state => Object.values(state.lessonReducer?.lessons));
    const thiscourse = lessons.filter(lesson => lesson.course_id == course_id)

    const current_user = useSelector(state => state.session.user?.id);

    useEffect(() => {
        dispatch(loadlessonsfromDB(course_id))
        dispatch(loadCoursefromDB(course_id))
    }, [dispatch, course_id]);

    // handel delete
    const deletelesson = async (lession_id) => {
        const deletesuccess = await dispatch(deltethelesson(lession_id))
        if (deletesuccess) {
            alert('Lesson deleted successfuly...')
            await dispatch(loadlessonsfromDB(course_id));
            navigate(`/courses/${course_id}/managelessons`);
        }
    }

    if (!current_user) {
        return (
            <div>
                <h1>Mange lessons</h1>
                <p>You must be logged-in to manage the lessons.</p>
            </div>
        )
    }

    return (
        <>
            <div className="managelessoncontainer">
                <div className="back2mycourse">
                    <button onClick={() => navigate('/managecourses')}>Back</button>
                </div>
                <h1>Manage {course_title} Lessons</h1>
                <div className="createlesson">
                    <button onClick={() => navigate(`/courses/${course_id}/addlesson`)}>Add a new lesson</button>
                </div>
                <ol className="lessoncart">
                    {thiscourse?.length > 0 ? (
                        thiscourse.map(lesson => (
                            <li key={lesson.id} className="thelesson">
                                <span>{lesson.title}</span>
                                <span className="btns">

                                    <button onClick={() => deletelesson(lesson.id)}>Delete</button>
                                    <button onClick={() => navigate(`/courses/${course_id}/updatelesson/${lesson.id}`)}>Update</button>
                                </span>
                                <span>

                                </span>
                            </li>
                        ))
                    ) : (
                        <div>
                            <p>No lessons found for this course.</p>
                        </div>
                    )
                    }
                </ol>
            </div>
        </>
    )
}

export default ManageLessons