import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadCoursesfromDB } from '../../store/courses';
import { NavLink } from 'react-router-dom'


import './Home.css'
// import CoursesRibbon from './CoursesRibbon';
const Home = () => {
  // Maintain separate state for each category
  const dispatch = useDispatch();
  const allCourses = useSelector((state) => Object.values(state.courseReducer.courses));

  // // Check if data is fully loaded before proceeding
  // if (allCourses.length === 0) {
  //   return <p>Loading...</p>; // Placeholder while data loads
  // }

  
  // Group courses by category. The 'category' is set as 'keys' and courses are set at values in an array.
  const courseByCategory = {};
  allCourses.forEach((course) => {
    const category = course.category;
    if (!courseByCategory[category]) {
      courseByCategory[category] = [];
    }
    courseByCategory[category].push(course);
  });

  const defaultTab = {};
  Object.keys(courseByCategory).forEach(category => {
    defaultTab[category] = 'mr';
  });

  const [tabState, setTabState] = useState(defaultTab);

  useEffect(() => {
    dispatch(loadCoursesfromDB());
  }, [dispatch])
  return (
    <>
      <div className="home_container">
        <div className="homepage">
          {Object.keys(courseByCategory)
            .sort()
            .map((category) => (
              <div key={category}>
                <h1>{category}</h1>
                <div className='tabs-container'>
                  <div className="tabs">
                    <h3 onClick={() => setTabState({ ...tabState, [category]: 'mr' })}>
                      Recent courses
                    </h3>
                    <h3>.</h3>
                    <h3 onClick={() => setTabState({ ...tabState, [category]: 'va' })}>
                      View all
                    </h3>
                  </div>
                </div>
                <hr />
                <div className='coursesdisplay'>
                  <ul className='coursecarts'>
                    {
                      tabState[category] === 'va' ? (
                        courseByCategory[category]
                          .sort()
                          .map(course => (
                            <li key={course.id} className='thecourse'>
                              <NavLink to={`/courses/${course.id}`}>{course.title}</NavLink>
                              <p className='instructor'>
                                Instructor: {course.instructor}

                                {/* <NavLink to={`/${course.Users[0]?.username}`} style={{ fontWeight: 'lighter', fontSize: '1em', color: 'black' }}>Instructor:  
                                {course.instructor} 
                                {course.Users[0]?.firstName + ' ' + course.Users[0]?.lastName}
                                </NavLink> */}
                              </p>

                              {course.numOfStudents == 0 && <p>New</p>}
                              {course.numOfStudents == 1 && <p>{course.numOfStudents} Student</p>}
                              {course.numOfStudents > 1 && <p>{course.numOfStudents} Students</p>}

                            </li>
                          ))
                      ) : (
                        courseByCategory[category]
                          .slice(-4)
                          .map(course => (
                            <li key={course.id} className='thecourse'>
                              <NavLink to={`/courses/${course.id}`}>{course.title}</NavLink>
                              <p className='instructor'>
                                Instructor: {course.instructor}
                                {/* <NavLink to={`/${course.Users[0]?.username}`} style={{ fontWeight: 'lighter', fontSize: '1em', color: 'black' }}>Instructor:  
                                {course.Users[0]?.firstName + ' ' + course.Users[0]?.lastName}
                                </NavLink> */}
                              </p>
                              {course.numOfStudents == 0 && <p>New</p>}
                              {course.numOfStudents == 1 && <p>{course.numOfStudents} Student</p>}
                              {course.numOfStudents > 1 && <p>{course.numOfStudents} Students</p>}
                            </li>
                          ))
                      )
                    }
                  </ul>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Home;