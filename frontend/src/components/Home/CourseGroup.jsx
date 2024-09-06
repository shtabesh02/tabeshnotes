
import { useState } from 'react';
import './CourseGroup.css';
import ViewAll from './ViewAll';
import MostRecent from './MostRecent';

const CourseGroup = ({releatedCourses}) => {
    const [selectedView, setSelectedView] = useState('mr');
    const selectView = (sv) => {
        setSelectedView(sv)
    }
  return (
    <div className='course_group_container'>
    <ul className="group_view">
        <li onClick={() => selectView('mr')} className={selectedView}>Most recent</li>
        <li onClick={() => selectView('va')} className={selectedView}>View all</li>
    </ul>
    {/* {selectedView==='mr' ? (
        <p>Most recent</p>
    ):(
        <ViewAll />
    )} */}
    {selectedView === 'mr' && <MostRecent releatedCourses = {releatedCourses} />}
    {selectedView === 'va' && <ViewAll releatedCourses = {releatedCourses}/>}
    </div>
  )
}

export default CourseGroup