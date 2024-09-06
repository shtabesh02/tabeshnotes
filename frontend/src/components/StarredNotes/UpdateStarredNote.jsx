import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { loadthenote, updatethenote } from "../../store/starrednotes";
import './UpdateStarredNote.css'
import ReactQuill from "react-quill";

const UpdateStarredNote = () => {

    const { starrednote_id } = useParams();
    const currentuser = useSelector(state => state.session.user?.id);
    console.log('starrednote_id: ', starrednote_id)
    const notedetails = useSelector(state => state.starrednotesReducer?.StarredNoteDetails[0]);
    const [title, setTitle] = useState(notedetails?.title || '');
    const [content, setContent] = useState(notedetails?.content || '')

    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(loadthenote(starrednote_id))
    }, [dispatch, starrednote_id]);

    useEffect(() => {
        if(notedetails){
            setTitle(notedetails?.title || '');
            setContent(notedetails?.content || '');
        }
    }, [notedetails]);

    const updatethisnoet = (e) => {
        e.preventDefault();
        const updatednote = {
            title,
            content
        }

        dispatch(updatethenote(updatednote, starrednote_id))
        .then(()=> navigate(`/starrednotes/${starrednote_id}`))
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
    <div className="updatenotecontainer">
        <h1>Update your note</h1>
        {currentuser == notedetails?.user_id &&
            <form onSubmit={updatethisnoet} className="updatenoteform">
            <div>
            <label htmlFor="title">Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="note">Note</label>
                {/* <textarea name="note" id="note" value={content} onChange={e => setContent(e.target.value)}></textarea> */}
                <ReactQuill
                    modules={module}
                    theme='snow'
                    value={content}
                    onChange={(content) => setContent(content)}
                  placeholder='Share your note here now, use it later and anytime...' className='ql-editor' style={{ minHeight: '100px' }} />
            </div>
            <div>
            <button className="sbmtbtn">Update</button>
            </div>
        </form>}
    </div>
  )
}

export default UpdateStarredNote