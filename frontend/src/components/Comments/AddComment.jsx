import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { addnewcommenttoDB } from '../../store/comments';

import './AddComment.css'

const AddComment = ({ setSelectedTab }) => {
    const [comment, setComment] = useState('');
    const { course_id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const current_user = useSelector(state => state.session?.user?.id);

    const [errors, setErrors] = useState({});

    // submitting the comment
    const addcomment = async (e) => {
        e.preventDefault();
        const newComment = {
            user_id: current_user,
            course_id,
            comment
        }
        await dispatch(addnewcommenttoDB(newComment, course_id))
            .then(() => {
                navigate(`/courses/${course_id}`)
            })
            .catch(async (res) => {
                const err = await res.json();
                if (err?.errors) {
                    setErrors(err.errors)
                }
            });
            setSelectedTab('comments')
    }
    return (
        <>
            {/* <div className="back2course">
                <button onClick={() => navigate(`/courses/${course_id}`)}>Back</button>
            </div> */}
            <div className='commentcontainer'>
                <div className="addingcomment">
                    <h1>Add your comment</h1>
                    <form onSubmit={addcomment} className='commentform'>
                        <div>
                            <label htmlFor="comment">Comment</label>
                            <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
                            {errors.comment && <p className='errorcss'>{errors.comment}</p>}
                        </div>
                        <div className='sbmtbtn'>
                            <button>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddComment