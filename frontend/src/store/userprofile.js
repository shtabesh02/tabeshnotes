import { csrfFetch } from "./csrf"

const LOADCURRENTUSERPROFILE = 'loadcurrentuserprofile';
const UPDATETHISUserProfile = 'updatethisuserprofile';
const ADDProfile2thisUser = 'addtheprofileofthisuser';
// regular action to add the profile to the state
const loadprofile = (profile) => {
    return {
        type: LOADCURRENTUSERPROFILE,
        profile
    }
}
// thunk action to load profile from db
export const loadUserProfile = (username) => async (dispatch) => {
    // console.log('before fetch: ')
    try {
        const response = await csrfFetch(`/api/userprofile/${username}`);
    // console.log('response: ', response)
    if(response.ok){
        const data = await response.json();
        dispatch(loadprofile(data))
    }
    } catch (error) {
        // console.log('error: ', error)
        return error;
    }
}

// regular action to update the profile in the state
const uptdateprofile = (updatedprofile) => {
    return {
        type: UPDATETHISUserProfile,
        updatedprofile
    }
}
// thunk action to update profile
export const updatethisprofile = (newprofile, user_id) => async (dispatch) => {
    const response = await csrfFetch(`/api/userprofile/${user_id}`, {
        method: 'PUT',
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(newprofile)
    })
    // console.log('response: ', response)
    if(response.ok){
        const data = await response.json();
        dispatch(uptdateprofile(data))
    }
}

// regular action to add the profile to the state
const addprofile = (profile) => {
    return {
        type: ADDProfile2thisUser,
        profile
    }
}
// thunk action to add user profile
export const addthisprofile = (newprofile, user_id) => async (dispatch) => {
    const response = await csrfFetch(`/api/userprofile/${user_id}`, {
        method: 'POST',
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(newprofile)
    });
    if(response.ok){
        const data = await response.json();
        dispatch(addprofile(data))
    }
}


const initialState = {
    profile: {}
}
const profileReducer = (state = initialState, action) => {
    switch(action.type){
        case LOADCURRENTUSERPROFILE: {
            return {...state, profile: action.profile}
        }
        case ADDProfile2thisUser: {
            return {...state, profile: action.profile}
        }
        case UPDATETHISUserProfile: {
            return {...state, profile: {...state.profile, [action.updatedprofile.id]: action.updatedprofile}}
        }
        default: {
            return state;
        }
    }
}
export default profileReducer;