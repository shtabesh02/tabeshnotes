import { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { loadUserCoursesfromDB } from '../../store/courses';
import { NavLink } from 'react-router-dom';
import './UserCourses.css'


function UserCourses({username}) {
    const dispatch = useDispatch();
    // const currentUser = useSelector(state => state.session.user.id);
    // const allCourses = useSelector(state => Object.values(state.courseReducer.courses));
    // const currentUserCourses = allCourses.filter(course => course.Users[0]?.username == username);
    const currentUserCourses = useSelector(state => Object.values(state.courseReducer?.userCourses?.Courses || {}));
    // const currentUserCourses = []
    console.log('current user courses: ', currentUserCourses)
    useEffect(() => {
        dispatch(loadUserCoursesfromDB(username))
        .then('courses loaded...')
        .catch('failed to load courses...')
    }, [dispatch, username]);
  return (
    <div className='currentusercoursescontainer'>
        <h3>User Courses</h3>
        <ul className='courseslistss'>
        {currentUserCourses && currentUserCourses.map(course => (
            <li key={course?.id} className='thecourse'>
            <NavLink to={`/courses/${course?.id}`}>{course?.title}</NavLink>
            <p className='instructor'>
              Instructor: {course?.instructor}
            </p>
          </li>
        ))}
        </ul>
    </div>
  )
}

export default UserCourses