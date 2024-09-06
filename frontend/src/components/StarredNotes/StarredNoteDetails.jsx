import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"
import { deleteanote, loadthenote } from "../../store/starrednotes";
import { NavLink } from "react-router-dom";
import DOMPurify from 'dompurify'
import './StarredNoteDetails.css'

const StarredNoteDetails = () => {
    const { starrednote_id } = useParams();
    const currentuser = useSelector(state => state.session.user?.id);
    // console.log('starrednote_id: ', starrednote_id)
    const notedetails = useSelector(state => state.starrednotesReducer?.StarredNoteDetails[0]);
    // console.log('notedetails: ', notedetails);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(loadthenote(starrednote_id))
    }, [dispatch, starrednote_id]);

    // handle deleting a note
    const deletethisnote = () => {
        dispatch(deleteanote(starrednote_id))
            .then(() => {
                alert('The note successfully deleted.')
                navigate('/starrednotes')
            })
    }
    return (
        <div className="centerdiv">
            <div className="notedetailscontainer">
                <h1>{notedetails?.title}</h1>
                {
                    notedetails &&
                    <div className="starrednotedetails">
                        <div className="noteinfo">
                            <NavLink to={`/${notedetails.User?.username}`} style={{textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px'}}>
                            <span className='user-icon'><i className="fa-solid fa-user fa-lg"></i></span>
                            <span>{notedetails.User?.firstName + ' ' + notedetails.User?.lastName}</span>
                            </NavLink>
                            <span>{new Date(notedetails.createdAt).toLocaleString('en-US', {month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'})}</span>
                            {/* <span>{new Date(note.createdAt).toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })}</span> */}
                        </div>
                        <div dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(notedetails.content.replace(/\n/g, '<br>')),
                        }}>
                            {/* {notedetails.content} */}
                        </div>
                        {notedetails.user_id == currentuser && <div className="notebtn">
                            <span><button onClick={() => navigate(`/starrednotes/${notedetails.id}/update`)}>Update</button></span><span><button onClick={() => deletethisnote()}>Delete</button></span>
                        </div>}
                    </div>
                }
            </div>
        </div>
    )
}

export default StarredNoteDetails