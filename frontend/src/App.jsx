// frontend/src/App.jsx
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navigation from './components/Navigation';
import * as sessionActions from './store/session';
import Home from './components/Home';
import CourseDetails from './components/CourseDetails'
import LessonDetails from './components/LessonDetails/LessonDetails';
import AddComment from './components/Comments/AddComment';
import UpdateComment from './components/Comments/UpdateComment';
import ManageCourses from './components/ManageCourses';
import AddCourse from './components/ManageCourses/AddCourse';
import UpdateCourse from './components/ManageCourses/UpdateCourse';
import ManageLessons from './components/ManageLessons/ManageLessons';
import AddLesson from './components/ManageLessons/AddLesson';
import UpdateLesson from './components/ManageLessons/UpdateLesson';
import StarredNotes from './components/StarredNotes';
import StarredNoteModal from './components/StarredNoteModal/StarredNoteModal';
import StarredNoteDetails from './components/StarredNotes/StarredNoteDetails';
import UpdateStarredNote from './components/StarredNotes/UpdateStarredNote';
import UserProfile from './components/UserProfile/UserProfile';
import UpdateProfile from './components/UserProfile/UpdateProfile';
import AddProfile from './components/UserProfile/AdduserProfile';
import SearchResult from './components/SearchResult';

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/courses/:course_id',
        element: <CourseDetails />
      },
      {
        path: '/courses/:course_id/lessons/:lesson_id',
        element: <LessonDetails />
      },
      {
        path: '/courses/:course_id/comment',
        element: <AddComment />
      },
      {
        path: '/courses/:course_id/comment/:comment_id',
        element: <UpdateComment />
      },
      {
        path: '/managecourses',
        element: <ManageCourses />
      },
      {
        path: '/managecourses/addcourse',
        element: <AddCourse />
      },
      {
        path: '/managecourses/updatecourse/:course_id',
        element: <UpdateCourse />
      },
      {
        path: '/courses/:course_id/managelessons',
        element: <ManageLessons />
      },
      {
        path: '/courses/:course_id/addlesson',
        element: <AddLesson />
      },
      {
        path: '/courses/:course_id/updatelesson/:lesson_id',
        element: <UpdateLesson />
      },
      {
        path: '/starrednotes',
        element: <StarredNotes />
      },
      {
        path: '/addstarrednote',
        element: <StarredNoteModal />
      },
      {
        path: '/starrednotes/:starrednote_id',
        element: <StarredNoteDetails />
      },
      {
        path: '/starrednotes/:starrednote_id/update',
        element: <UpdateStarredNote />
      },
      {
        path: '/:username',
        element: <UserProfile />
      },
      {
        path: '/:username/update',
        element: <UpdateProfile />
      },
      {
        path: '/:username/addprofile',
        element: <AddProfile />
      },
      {
        path: '/search',
        element: <SearchResult />
      },
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;