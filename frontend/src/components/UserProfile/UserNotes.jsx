import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadStarredNotes } from '../../store/starrednotes';
import { NavLink } from 'react-router-dom';
import DOMPurify from 'dompurify';
import './UserNotes.css';

function UserNotes({username}) {
  // const currentuser = useSelector(state => state.session.user.id)
  const dispatch = useDispatch();
  const currentusernotes = useSelector(state => Object.values(state.starrednotesReducer?.StarredNotes))
  const currentStarredNotes = [];
  currentusernotes.forEach(note => {
    if(note?.User.username == username){
      currentStarredNotes.push(note);
    }
  });
  useEffect(() => {
    dispatch(loadStarredNotes());
  }, [dispatch]);

   // displaying 300 character states
   const [expandedNotes, setExpandedNotes] = useState({});
   const togleExpand = (starrednote_id) => {
     setExpandedNotes(currentState => ({
       ...currentState, [starrednote_id]: !currentState[starrednote_id]
     }))
   }

  return (
    <div className='mystarrednotes'>
      <h1>User Starred Notes</h1>
      <ul>
      {
          currentStarredNotes && currentStarredNotes
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) 
          .map(note => (
            <li className='one-note' key={note.id}>
              <div className='one-note-container'>
                <NavLink to={`/${note.User?.username}`} style={{textDecoration: "none"}}>

                <span className='user-icon'><i className="fa-solid fa-user fa-lg"></i>
                </span>
                <span>{note.User?.firstName + ' ' + note.User?.lastName}</span>
                </NavLink>
                <span>{new Date(note.createdAt).toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })}</span>
                <NavLink to={`/starrednotes/${note.id}`} style={{ textDecoration: "none" }}>
                  {/* <hr /> */}
                  <h3>{note.title}</h3>
                </NavLink>
                {/* <p>{note.content}</p> */}
                <div>
                  {expandedNotes[note.id] ? (
                    <span dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(note.content.replace(/\n/g, '<br>')),
                  }}>
                      {/* {note.content} */}
                      </span>
                  ) : (
                    <span>{`${note.content.substring(0, 400)}... `}</span>
                  )}
                  {note.content.length > 400 &&
                    <span className='more-less' onClick={() => togleExpand(note.id)}>
                      {expandedNotes[note.id] ? ' See less' : 'See more'}
                    </span>}
                </div>
              </div>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default UserNotes