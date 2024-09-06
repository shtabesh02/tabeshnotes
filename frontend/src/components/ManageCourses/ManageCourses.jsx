
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { deletemycourse, loadmycoursesfromDB } from '../../store/courses';
import './ManageCourses.css'
import { NavLink, useNavigate } from 'react-router-dom';
import { loadEnrollment } from '../../store/enrollment';
import { loadCompletedlesson } from '../../store/completedlesson';

const ManageCourses = () => {
  const current_user = useSelector(state => state.session.user?.id);
  // const [authmsg, setAuthmsg] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const _courses = useSelector(state => Object.values(state.courseReducer.courses));
  const courses = _courses.filter(course => course.user_id == current_user);

  useEffect(() => {
    dispatch(loadmycoursesfromDB(current_user))
    // .catch(() => async (res) => {
    //   const _authmsg = await res.json();
    //   console.log('_authmsg: ')
    // })
  }, [dispatch, current_user]);

  // load the completed lessons
  useEffect(() => {
    dispatch(loadCompletedlesson(current_user))
      .then(() => console.log('completed lessons loaded successfully...'))
      .catch(() => console.log('No completed lesson found...'))
  }, [dispatch, current_user]);

  // Enrollment
  useEffect(() => {
    dispatch(loadEnrollment(current_user))
      .then(() => console.log('All the courses you are enrolled in loaded successfully...'))
      .catch(() => console.log('You are not enrolled in any course yet.'))
  }, [dispatch, current_user]);

  // Progress calculation
  const enrolledCourses = useSelector(state => Object.values(state.enrollmentReducer?.enrolled));
  // calculating the number of the number of lessons in enrolled courses by the user
  // const numOfLessonsPerCourse = {};
  // enrolledCourses.forEach(course => numOfLessonsPerCourse[course.id] = course.numOfLessons);
  // console.log('numOfLessonsPerCourse: ', numOfLessonsPerCourse);

  // grouping the completed lesson by their course_id
  const completedLessons = useSelector(state => Object.values(state.completedLessons?.lessons));
  const numOfCompletedlesson = {};
  completedLessons.forEach(lesson => numOfCompletedlesson[lesson.course_id] = lesson.numOfLessondone);
  // console.log('numOfLessondone: ', numOfCompletedlesson);




  // Handle Delete a course
  const deletecourse = async (course_id) => {
    const successdelete = await dispatch(deletemycourse(course_id))
    if (successdelete) {
      navigate('/managecourses');
    }
  }

  if (!current_user) {
    return (
      <div>
        <h1>Mange Courses</h1>
        <p>You must be logged-in to manage courses.</p>
      </div>
    )
  }
  return (
    <>
      <div className='managecoursecontainer'>
        <div className='createcourse'>
          <button onClick={() => navigate('/managecourses/addcourse')}>Create a new course</button>
        </div>
        <h1>Courses I&apos;m Teaching</h1>
        <ul className='coursecarts'>
          {courses.length > 0 && courses.map(course => (
            <li key={course.id} className='thecourse'>
              {
                course.user_id == current_user &&
                <NavLink to={`/courses/${course.id}/managelessons`} style={{ textDecoration: "none" }}>
                  {course.title}
                </NavLink>
              }
              <p className='btns'>
                <button onClick={() => deletecourse(course.id)}>Delete</button>
                <button onClick={() => navigate(`/managecourses/updatecourse/${course.id}`)}>Update</button>
              </p>
            </li>
          )
          )}
          {courses?.length == 0 && <li>You do not have any course yet. Click on the above button to create your courses.</li>}
        </ul>
        <hr />
        <h1>Courses I&apos;m enrolled in</h1>
        <ul className='coursecarts'>
          {
            enrolledCourses.length > 0 ? (
              enrolledCourses.map(course => (
                <li key={course.id} className='thecourse'>
                  <NavLink to={`/courses/${course.id}`} style={{ textDecoration: "none" }}>
                    {course.title}
                  </NavLink>
                  <p>
                    Instructor: {course.instructor}
                  </p>
                  <div className="progress">
                    <span>Progress:</span>
                    <span className='progress-bar'>
                    <span className='percentage-progress' style={{ width: `${((course.numOfCompletedLessons) * 100) / (course.numOfLessons) || 0}%`, height: '4px' }}></span>
                      <span>{((course.numOfCompletedLessons * 100) / (course.numOfLessons) || 0).toFixed(0)} &#37;</span>
                      {/* <span className='percentage-progress' style={{ width: `${((numOfCompletedlesson[course.id]) * 100) / (course.numOfLessons) || 0}%`, height: '4px' }}></span>
                      <span>{(((numOfCompletedlesson[course.id]) * 100) / (course.numOfLessons) || 0).toFixed(0)} &#37;</span> */}
                    </span>
                  </div>
                </li>
              )
              )
            ) : (
              <li>You are not enrolled in any course yet. Go to courses, and get enrolled in your favorite courses.</li>
            )
          }
          {/* {enrolledCourses.length > 0 && enrolledCourses.map(course => (
            <li key={course.id} className='thecourse'>

              <NavLink to={`/courses/${course.id}`} style={{ textDecoration: "none" }}>
                {course.title}
              </NavLink>
              <p>
                Instructor: {course.instructor}
              </p>
              <div className="progress">
                <span>Progress:</span>
                <span className='progress-bar'>
                  <span className='percentage-progress' style={{width: `${((numOfCompletedlesson[course.id])*100)/(course.numOfLessons) || 0}%`, height:'4px' }}></span>
                  <span>{(((numOfCompletedlesson[course.id])*100)/(course.numOfLessons) || 0).toFixed(0)} &#37;</span>
                </span>
              </div>
            </li>
          )
          )}
          {enrolledCourses?.length == 0 && <li>You are not enrolled in any course yet. Go to courses, and get enrolled in your favorite courses.</li>} */}
        </ul>
      </div>
    </>
  )
}

export default ManageCourses