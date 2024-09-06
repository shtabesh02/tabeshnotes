// frontend/src/store/lessons.js
import { csrfFetch } from "./csrf";

const LOADLESSONS = 'LOADLESSONS';
const ADDANEWLESSON = 'addanewlesson';
const UPDATETHISLESSON = 'updatethislessondb';
const DELETEALESSON = 'deletealesson';
const LOADMYLESSON1 = 'loadmylesson1'

// regular action to load lessons
const loadlessons = (lessons) => {
    return {
        type: LOADLESSONS,
        lessons
    }
}
// thunk action to lead lessons from DB by course id
export const loadlessonsfromDB = (course_id) => async (dispatch) => {
    const response = await csrfFetch(`/api/lessons/${course_id}/lessons`);
    if (response.ok) {
        const data = await response.json();
        dispatch(loadlessons(data));
    }
}

// regular action to load a lesson based on its id
const loadMyLesson = (mylesson) => {
    return {
        type: LOADMYLESSON1,
        mylesson
    }
}
// thunk action to load a lesson by its id
export const loadmylesson = (course_id, lesson_id) => async (dispatch) => {
    const response = await csrfFetch(`/api/lessons/${course_id}/lessons/${lesson_id}`);
    if(response.ok){
        const data = await response.json();
        dispatch(loadMyLesson(data))
    }
}


// regular action to add new lesson to state
const addlesson = (newlesson) => {
    return {
        type: ADDANEWLESSON,
        newlesson
    }
}
// thunk action to add a new lesson to DB
export const addnewlesson = (newlesson, course_id) => async (dispatch) => {
    const response = await csrfFetch(`/api/courses/${course_id}/newlesson`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newlesson)
    })
    const data = await response.json();
    dispatch(addlesson(data));
    return response;

    // if (response.ok) {
    //     const data = await response.json();
    //     dispatch(addlesson(data));
    //     return true;
    // }
}

// regular action to update a lesson
const updatelesson = (updatedlesson) => {
    return {
        type: UPDATETHISLESSON,
        updatedlesson
    }
}
// thunk action to update a lesson
export const updatethislessontoDB = (updatedlesson, lesson_id) => async (dispatch) => {
    const response = await csrfFetch(`/api/courses/lessons/${lesson_id}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedlesson)
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(updatelesson(data));
        return true;
    }else{
        const data = await response.json();
        return data;
    }
}


// regular action to delete the lesson
const deletethislesson = (lesson_id) => {
    return {
        type: DELETEALESSON,
        lesson_id
    }
}
// thunk action to delete a lesson based on its id
export const deltethelesson = (lesson_id) => async (dispatch) => {
    const response = await csrfFetch(`/api/courses/lessons/${lesson_id}`, {
        method: 'DELETE'
    })
    if (response.ok) {
        dispatch(deletethislesson(lesson_id));
        return true;
    }
}

// lessons reducer
const initialState = {
    lessons: {},
    lessonDetails: {},
    my_lesson: {}
}
const lessonReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADLESSONS: {
            // The bellow code works:

            // const _lessons = {};
            // action.lessons.forEach(lesson => _lessons[lesson.id] = lesson);
            // return { ...state, lessons: { ...state.lessons, ..._lessons } }
                                    
            return {...state, lessons: action.lessons}
        }
        case LOADMYLESSON1: {
            const _mylesson = {};
            action.mylesson.forEach(lesson => _mylesson[lesson.id] = lesson);
            return {...state, my_lesson: {...state.my_lesson, ..._mylesson}}
        }
        case ADDANEWLESSON: {
            return { ...state, lessons: { ...state.lessons, [action.newlesson.id]: action.newlesson } }
        }
        case UPDATETHISLESSON: {
            return { ...state, lessons: { ...state.lessons, [action.updatedlesson.id]: action.updatedlesson } }
        }
        case DELETEALESSON: {
            const newState = { ...state };
            delete newState.lessons[action.lesson_id]
            return newState
        }
        default:
            return state;
    }
}
export default lessonReducer;