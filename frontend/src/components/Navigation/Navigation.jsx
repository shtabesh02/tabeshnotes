// frontend/src/components/Navigation/Navigation.jsx

import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
// import SignupFormModal from '../SignupFormModal';
import './Navigation.css';
import { useState } from 'react';
import { search } from '../../store/search';
// import CoursesRibbon from '../CoursesRibbon';
// import { FaUserCircle } from 'react-icons/fa';

function Navigation({ isLoaded }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session?.user);
  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <li>
        <ProfileButton user={sessionUser} />
      </li>
    );
  } else {
    sessionLinks = (
      <>

        <li>
          <OpenModalButton
            buttonText="Log In"
            modalComponent={<LoginFormModal />}
          />
        </li>
        {/* The Signup is commented for testing purpose. */}
        {/* <li>
        <OpenModalButton
          buttonText="Sign Up"
          modalComponent={<SignupFormModal />}
        />
      </li> */}
      </>
    );
  }

  // Handle search...
  const [searchKey, setSearchKey] = useState('');
  const handlesearch = (e) => {
    e.preventDefault();
    dispatch(search(searchKey));
    navigate('/search')
  }
  return (
    <>

      <ul className='home-nav'>
        <li>
          <NavLink to="/"><img src={'/sn-logo.png'} style={{ width: '130px' }} alt="" /></NavLink>
        </li>
        <li>
          <form onSubmit={handlesearch}>
            <div className="search-div">
              <input value={searchKey} onChange={(e) => setSearchKey(e.target.value)} type="text" name="search" id="search" className='' placeholder='What is your problem?' />
              <button>Search</button>
            </div>
          </form>
        </li>
        {isLoaded && sessionLinks}
      </ul>
      {/* <CoursesRibbon /> */}
      <hr />
      <ul className='top-headings'>
        <li><NavLink to={'/'} style={{ textDecoration: "none" }}>Courses</NavLink></li>
        <li><NavLink to={'/starrednotes'} style={{ textDecoration: "none" }}>Starred Notes</NavLink></li>
      </ul>
      <hr />
    </>
  );
}

export default Navigation;