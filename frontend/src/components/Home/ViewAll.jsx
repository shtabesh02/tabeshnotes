// import { useSelector } from "react-redux"


const ViewAll = ({courseCategories}) => {
  // const allCourses = useSelector(state => Object.values(state.courseReducer))

  // console.log('courseCategories form ViewAll: ', courseCategories)
  return (
    <div className='viewall'>
      {courseCategories}
    <ul>
      {(courseCategories.map(course => (
        <li key={course.id}>{course.title}</li>
      
      ))) }
    </ul>
    </div>
  )
}

export default ViewAll