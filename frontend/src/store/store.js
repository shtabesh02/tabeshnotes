// frontend/src/store/store.js
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session';
import courseReducer from './courses';
import lessonReducer from './lessons';
import commentReducer from './comments';
import notesReducer from './notes'
import profileReducer from './userprofile';
import completedLessons from './completedlesson';
import enrollmentReducer from './enrollment';
import searchReducer from './search';
import profilePhotoReducer from './profilePicture';

const rootReducer = combineReducers({
  // ADD REDUCERS HERE
  session: sessionReducer,
  courseReducer: courseReducer,
  lessonReducer: lessonReducer,
  commentReducer: commentReducer,
  notesReducer: notesReducer,
  profileReducer: profileReducer,
  completedLessons: completedLessons,
  enrollmentReducer: enrollmentReducer,
  searchReducer: searchReducer,
  profilePhotoReducer: profilePhotoReducer,
});

let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
