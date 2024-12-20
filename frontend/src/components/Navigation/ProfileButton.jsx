import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';
import * as sessionActions from '../../store/session';

import './ProfileButton.css'
import { NavLink, useNavigate } from 'react-router-dom';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const username = useSelector(state => state.session.user?.username);


  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep click from bubbling up to document and triggering closeMenu
    // if (!showMenu) setShowMenu(true);
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    navigate('/');
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <button onClick={toggleMenu} className='toggle-button'>
        <FaUserCircle className='profileIcon' />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {/* <li>{user?.username}</li> */}
        <li><NavLink to={`/${username}`} style={{textDecoration: "none"}}>{user?.firstName} {user?.lastName}</NavLink></li>
        {/* <li>{user.email}</li> */}
        <li>
          <button onClick={logout}>Log Out</button>
        </li>
        <li><button onClick={() => navigate(`/managecourses`)}>Mange courses</button></li>
      </ul>
    </>
  );
}

export default ProfileButton;