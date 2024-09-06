import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {NavLink} from 'react-router-dom'
import { loadCoursesfromDB } from '../../store/courses';
import './cr.css'
const CoursesRibbon = () => {
    const courses = useSelector(state => Object.values(state.courseReducer.courses))
    // console.log('course type: ', typeof (courses))
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadCoursesfromDB());
    }, [dispatch]);

    return (
        <div className='courses-ribbon'>
            
            <ul className="courses_title">
                {courses ? (
                    courses.map(course => (
                        <NavLink to={''} style={{textDecoration: 'none'}} key={course.id}>
                            <li>{}</li>
                        </NavLink>
                    ))
                ) : (null)}
            </ul>
        </div>
    )
}

export default CoursesRibbon