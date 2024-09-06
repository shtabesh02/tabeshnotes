
import { csrfFetch } from "./csrf";

const LOADCOURSES = 'LOADCOURSES';
const AddCOURSE = 'AddNewCourse';
const LOADCOURSE = 'LOADCOURSE';
const LOADMYCOURSES = 'loadmycourses';
const UPDATETHISCOURSE = 'updatethiscourse';
const DELETETHISCOURSE = 'deletethiscourse';
const LOADuSERcourses = 'loadallthecourseslforoneuser';


// regular action to load courses
const loadCourses = (courses) => {
    return {
        type: LOADCOURSES,
        courses
    }
}
// thunk action to load courses from db
export const loadCoursesfromDB = () => async (dispatch) => {
    const response = await fetch('api/courses');
    if(response.ok){
        const data = await response.json();
        dispatch(loadCourses(data))
    }
}

// regular action to add user courses to the state
const loadusercourses = (usercourses) => {
    return {
        type: LOADuSERcourses,
        usercourses
    }
}
// thunk action to load user courses
export const loadUserCoursesfromDB = (username) => async (dispatch) => {
    console.log('called...')
    const response = await csrfFetch(`api/users/${username}`);
    if(response.ok){
        const usercourses = await response.json();
        dispatch(loadusercourses(usercourses))
    }
}

// const regular action to load my courses
const loadmycourses = (my_courses) => {
    return {
        type: LOADMYCOURSES,
        my_courses
    }
}
// thunk action to load only my courses from db
export const loadmycoursesfromDB = (current_user) => async (dispatch) => {
    const response = await csrfFetch(`/api/courses/${current_user}/currentcourses`);
    if(response.ok){
        const data = await response.json();
        dispatch(loadmycourses(data));
    }else{
        const e = await response.json();
        // console.log('eeee: ', e)
        return e;
    }
}

// regular action to load a course by id
const loadCourse = (course) => {
    return {
        type: LOADCOURSE,
        course
    }
}
// thunk action to load a course from db by id
export const loadCoursefromDB = (course_id) => async (dispatch) => {
    // const response = await fetch(`/api/courses/${course_id}`);
    const response = await csrfFetch(`/api/courses/${course_id}`)
    // console.log('course response: ', response);
    if(response.ok){
        const data = await response.json();
        // console.log('course data: ', data)
        dispatch(loadCourse(data))
    }
}

// regular action to a add a new course
const addcourse = (newcourse) => {
    return {
        type: AddCOURSE,
        newcourse
    }
}
// thunk action to add a new course
export const addcoursetoDB = (newcourse) => async (dispatch) => {
    // console.log('before fetch...')
    const response = await csrfFetch('/api/courses/newcourse', {
        method: 'POST',
        headers: {'Content-Type':'Application/json'},
        body: JSON.stringify(newcourse)
    })
    const data = await response.json();
    dispatch(addcourse(data))
    return response;
    // if(response.ok){
    // }else{
    //     const errors = await response.json();
    //     return {result: false, errors};
    // }
}

// regular action to update a course
const updatethiscourse = (updaedcourse) => {
    return {
        type: UPDATETHISCOURSE,
        updaedcourse
    }
}
// thunk action to update a course
export const updatecoursetoDB = (updatedcourse, course_id) => async (dispatch) => {
    const response = await csrfFetch(`/api/courses/${course_id}/update`, {
        method: 'PUT',
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(updatedcourse)
    });
    if(response.ok){
        const data = await response.json()
        dispatch(updatethiscourse(data));
        return true;
    }else{
        const data = await response.json();
        return data;
    }
}

// regular action to delete a course
const deletecourse = (course_id) => {
    return{
        type: DELETETHISCOURSE,
        course_id
    }
}
// thunk action to delete a course
export const deletemycourse = (course_id) => async (dispatch) => {
    const response = await csrfFetch(`/api/courses/${course_id}`, {
        method: 'DELETE'
    })
    if(response.ok){
        dispatch(deletecourse(course_id));
        return true;
    }
}

// course reducer
const initialState = {
    courses: {},
    courseDetails: {},
    userCourses: {}
};
const courseReducer = (state = initialState, action) => {
    // const newState = {...state};
    switch(action.type){
        case LOADCOURSES: {
            // return {...state, ...action.courses}
            // return {...state, courses: action.courses}
            const _mycourses = {};
            action.courses.forEach(course => _mycourses[course.id] = course);
            return {...state, courses: {...state.courses, ..._mycourses}}
        }
        case LOADCOURSE: {
            // return newState[action.course.id] = {...newState[action.course.id], ...action.course}
            // return {...state, courseDetails: action.course} // it worked
            return {...state, courseDetails: action.course}
        }
        case LOADMYCOURSES: {
            const _mycourses = {};
            action.my_courses.forEach(course => _mycourses[course.id] = course);
            return {...state, courses: {...state.courses, ..._mycourses}}
        }
        case AddCOURSE: {
            return {...state, courses: {...state.courses, [action.newcourse.id]: action.newcourse}}
        }
        case UPDATETHISCOURSE: {
            return {...state, courses: {...state.courses, [action.updaedcourse.id]: action.updaedcourse}}
        }
        case DELETETHISCOURSE: {
            const newState = {...state};
            delete newState.courses[action.course_id];
            return newState;
        }
        case LOADuSERcourses: {
            return {...state, userCourses: action.usercourses}
        }
        default:
            return state
    }
}

export default courseReducer