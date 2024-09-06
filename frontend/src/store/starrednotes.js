// import StarredNotes from "../components/StarredNotes/StarredNotes";
import { csrfFetch } from "./csrf";

const LOADSTARREDNOTES = 'loadallstarrednotesfromdb';
const INSERTNEWNOTE = 'addnewnotetostate';
const ADDTHISNOTE2THESTATE = 'addthisnote2thestate';
const UPDATEMYStarredNOTE = 'updatemystarrednote';
const DELETETHISNOTE = 'deletethisdatafromstate';
// regular action to load StarredNotes
const loadSN = (sn) => {
    return {
        type: LOADSTARREDNOTES,
        sn
    }
}
// thunk action to load StarredNotes from db
export const loadStarredNotes = () => async (dispatch) => {
    const response = await csrfFetch(`/api/starrednotes`);
    // console.log('stareednotes loaded: ', response)
    if (response.ok) {
        const sn = await response.json();
        dispatch(loadSN(sn));
    }
}

// regular action to add the details of note to the state
const addthisnote2state = (notedetails) => {
    return {
        type: ADDTHISNOTE2THESTATE,
        notedetails
    }
}
// thunk action to load one note details from db
export const loadthenote = (starrednote_id) => async (dispatch) => {
    const response = await csrfFetch(`/api/starrednotes/${starrednote_id}`);
    // console.log('response: ', response)
    if(response.ok){
        const data = await response.json();
        // console.log('data: ', data)
        dispatch(addthisnote2state(data));
    }
}

// regular action to insert new note to the state
const addnewnote = (newnote) => {
    return {
        type: INSERTNEWNOTE,
        newnote
    }
}
// thunk action to insert a new note
export const insertnewnote = (newnote) => async (dispatch) => {
    const response = await csrfFetch(`/api/starrednotes`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newnote)
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(addnewnote(data))
    }else{
        return response;
    }
}

// regular action to update a note
const updatemynote = (updatednote) => {
    return {
        type: UPDATEMYStarredNOTE,
        updatednote
    }
}
// thunk to update a note
export const updatethenote = (updatednote, starrednote_id) => async (dispatch) => {
    const response = await csrfFetch(`/api/starrednotes/${starrednote_id}/update`, {
        method: 'PUT',
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(updatednote)
    })
    if(response.ok){
        const data = await response.json();
        dispatch(updatemynote(data));
    }
} 

// regular action to delete a note
const deletethisnote = (deleteddata) => {
    return {
        type: DELETETHISNOTE,
        deleteddata
    }
}
// thunk to delete a note
export const deleteanote = (starrednote_id) => async (dispatch) => {
    const response = await csrfFetch(`/api/starrednotes/${starrednote_id}`, {
        method: 'DELETE'
    })
    if(response.ok){
        // const data = await response.json();
        dispatch(deletethisnote(starrednote_id))
    }
}

const initialState = {
    StarredNotes: {},
    StarredNoteDetails: {}
}
const starrednotesReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADSTARREDNOTES: {
            const _sn = {};
            action.sn.forEach(element => _sn[element.id] = element);
            return { ...state, StarredNotes: { ...state.StarredNotes, ..._sn } }
        }
        case INSERTNEWNOTE: {
            return {...state, StarredNotes: {...state.StarredNotes, [action.newnote.id]:action.newnote}}
        }
        case ADDTHISNOTE2THESTATE: {
            return {...state, StarredNoteDetails: {...action.notedetails}}
        }
        case UPDATEMYStarredNOTE: {
            return {...state, StarredNotes: {...state.StarredNotes, [action.updatednote.id]: action.updatednote}}
        }
        case DELETETHISNOTE: {
            const newState = {...state};
            delete newState.StarredNotes[action.deleteddata];
            return newState
        }
        default:
            return state;
    }
}

export default starrednotesReducer;