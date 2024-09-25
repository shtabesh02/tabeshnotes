import { csrfFetch } from "./csrf";

const UPLOADPHOTO = 'UpoadMyProfilephotow'
const addImage = (profile_photo) => {
    return {
        type: UPLOADPHOTO,
        profile_photo
    }
}

export const profilePicture = (user_profile, user_id) => async (dispatch) => {
    const response = await csrfFetch(`/api/getUrl/users/${user_id}`, {
        method: "POST",
        // headers: { 'Content-Type': 'multipart/form-data'},
        body: user_profile
    });
    if(response.ok){
        const resPost = await response.json();
        dispatch(addImage(resPost));
    }else{
        console.log('There was an error uploading your photo...')
    }
}

const initialState = {
    profile_photo: {}
}
const profilePhotoReducer = (state = initialState, action) => {
    switch(action.type){
        case UPLOADPHOTO: {
            return {...state, profile_photo: action.profile_photo}
        }
        default: 
        return state
    }
}

export default profilePhotoReducer;