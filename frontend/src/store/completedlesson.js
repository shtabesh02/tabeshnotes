import { csrfFetch } from "./csrf";
const LOADCOMPLETEDLESSONS = 'loadallthelessonsIcompleted';
const MARKCOMPLETE = 'markedthislessonascompleted';

// regular action to add the completed lesson to the state
const loadcomplted = (completelessons) => {
    return {
        type: LOADCOMPLETEDLESSONS,
        completelessons
    }
}
// thunk action to load completed lessons from db
export const loadCompletedlesson = (user_id) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/completed/${user_id}`);
        if(response.ok){
            const data = await response.json();
            dispatch(loadcomplted(data))
        }else{
            const err = await response.json();
            return err
        }
    } catch (error) {
        return error
    }
}

// regular action to update state with marked as complete
const markedcompete = (markedascompleted) => {
    return {
        type: MARKCOMPLETE,
        markedascompleted
    }
}
// thunk action to mark as complete a lesson
export const markascompleteLesson = (marked) => async (dispatch) => {
    const response = await csrfFetch(`/api/completed/markascomplete`, {
        method: 'PUT',
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(marked)
    });
    // console.log('response: ', response)
    if(response.ok){
        const data = await response.json();
        // console.log('data: ', data)
        dispatch(markedcompete(data))
    }else{
        const errors = await response.json();
        return errors
    }
}

// lessons reducer
const initialState = {
    lessons: {}
}
const completedLessons = (state = initialState, action) => {
    switch (action.type) {
        case LOADCOMPLETEDLESSONS: {                                    
            return {...state, lessons: action.completelessons}
        }
        case MARKCOMPLETE: {
            // console.log('action.makredascomplete: ', action.markascompleteLesson)
            return { ...state, lessons: { ...state.lessons, [action.markedascompleted.id]: action.markedascompleted } }
        }
        default:
            return state;
    }
}
export default completedLessons;