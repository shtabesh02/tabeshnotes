import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom'
import './StarredNotes.css'
import { useDispatch, useSelector } from 'react-redux';
import { insertnewnote, loadStarredNotes } from '../../store/starrednotes';
import DOMPurify from 'dompurify';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'
// import OpenModalButton from '../OpenModalButton';
// import StarredNoteModal from '../StarredNoteModal';

const StarredNotes = () => {
  const dispatch = useDispatch();
  const user_id = useSelector(state => state.session.user?.id);
  const starrednotes = useSelector(state => Object.values(state.starrednotesReducer.StarredNotes));
  // const [formModal, setFormModal] = useState(false);
  const [note, setNote] = useState('');
  const [title, setTitle] = useState('');
  const [errors, setErrors] = useState({});


  // displaying 300 character states
  const [expandedNotes, setExpandedNotes] = useState({});
  const togleExpand = (starrednote_id) => {
    setExpandedNotes(currentState => ({
      ...currentState, [starrednote_id]: !currentState[starrednote_id]
    }))
  }

  // console.log('formModal: ', formModal);
  useEffect(() => {
    dispatch(loadStarredNotes());
  }, [dispatch]);

  // Adding new note
  const addnewnote = (e) => {
    e.preventDefault();
    if (note.trim() === '' || note.trim() === '<p><br></p>') {
      setErrors({ note: "Add the note!" })
      return;
    }
    if (title.trim() === '') {
      setErrors({ title: "Add the title!" })
      return;
    }
    const newnote = {
      user_id,
      title,
      note
    }
    dispatch(insertnewnote(newnote))
      .then(() => {
        setTitle('');
        setNote('');
        // setFormModal(false);
      })
      .catch(async (res) => {
        const data = await res.json();
        setErrors(data?.errors)
      })
  }

  const module = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],
      // ['link', 'image', 'video', 'formula'],
  
      // [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction
  
      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  
      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],
  
      ['clean']                                         // remove formatting button
    ]
  }
  return (
    <div className='starrednotes-container'>
      <ul className='notes'>
        <li className='one-note'>
          {user_id &&
            <div className='one-note-container'>
              <form className='noteform' onSubmit={addnewnote}>
                <div>

                  <input value={title} onChange={e => setTitle(e.target.value)} type="text" placeholder='Title' className='title' />

                  {/* <textarea onChange={(e) => setNote(e.target.value)} value={note} onFocus={() => setFormModal(true)} className='addnote' placeholder='Share your note here now, use it later and anytime...' /> */}
                  <ReactQuill
                    theme='snow'
                    value={note}
                    onChange={(content) => setNote(content)}
                    modules={module}
                  placeholder='Share your note here now, use it later and anytime...' className='ql-editor' style={{ minHeight: '100px' }} />


                  <div className='addnotebtn'>
                    <div>
                      {errors?.title && <p className='errors'>{errors?.title}</p>}
                      {errors?.note && <p className='errors'>{errors?.note}</p>}
                    </div>
                    {/* <input type="file" /> */}
                    <button>Add this note</button>
                  </div>

                </div>
              </form>
            </div>
          }
        </li>
        <hr />
        {
          starrednotes && starrednotes
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map(note => (
              <li className='one-note' key={note.id}>
                <div className='one-note-container'>
                  <NavLink to={`/${note.User?.username}`} style={{ textDecoration: "none" }}>

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
                      <>
                        {/* <span>{`${note.content.substring(0, 400)}... `}</span> */}
                        <span dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(note.content.substring(0, 400).replace(/\n/g, '<br>')),
                        }}>
                          {/* {note.content} */}
                        </span>
                      </>

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

export default StarredNotes