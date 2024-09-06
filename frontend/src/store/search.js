import { csrfFetch } from "./csrf";

const SEARCHQUESTION = 'searchthequestion';
// regular action to add search result to state
const searchaction = (searchResult) => {
    return {
        type:
        SEARCHQUESTION,
        searchResult
    }
}
// thunk action to search
export const search = (key) => async (dispatch) => {
    const response = await csrfFetch(`/api/search/${key}`);
    if(response.ok){
        const data = await response.json();
        dispatch(searchaction(data))
    }
}

const initialState = {
    Result: {}
}
const searchReducer = (state = initialState, action) => {
    switch(action.type){
        case SEARCHQUESTION: {
            return {...state, Result: action.searchResult}
        }
        default: {
            return state
        }
    }
}

export default searchReducer;