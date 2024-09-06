import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { editcomment, loadcommentsfromDB } from "../../store/comments";

import './UpdateComment.css'

const UpdateComment = () => {
    const { course_id, comment_id } = useParams();
    console.log('comment_id: ', comment_id)
    // const comments = useSelector(state => Object.values(state.commentReducer?.comments))
    const updatingmycomment = useSelector(state => state.commentReducer?.comments[comment_id])
    const user_id = useSelector(state => state.session?.user.id)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const thetargetcomment = comments.filter(comment => comment?.id == comment_id);

    const [comment, setComment] = useState(updatingmycomment?.comment || '');


    const [errors, setErrors] = useState({});

    const updatethiscomment = async (e) => {
        e.preventDefault();
        const updatedcomment = {
            comment,
            comment_id,
            user_id
        };
        await dispatch(editcomment(updatedcomment, comment_id))
        .then(()=> {
            navigate(`/courses/${course_id}`)
        })
        .catch(async (res) => {
            const err = await res.json();
            if(err?.errors){
                setErrors(err.errors)
            }
        })
    }

    useEffect(() => {
        dispatch(loadcommentsfromDB(course_id))
        // dispatch(loadmycomment(comment_id, course_id))
            .then(()=> console.log('comments loaded.'))
            .catch(async (res) => {
                const data = await res.json();
                console.log('error of my comment: ', data)
            })
        // dispatch(loadcommentsfromDB(course_id))
    }, [dispatch, comment_id, course_id]);

    useEffect(() => {
        if(updatingmycomment){
            setComment(updatingmycomment.comment || '')
        }
    }, [updatingmycomment])
    return (
        <>
             <div className="back2course">
                <button onClick={() => navigate(`/courses/${course_id}`)}>Back</button>
            </div>
        <div className="commentcontainer">
            <div className="updatingcomment">
            <h1>Edit your comment here:</h1>
            <form onSubmit={updatethiscomment} className="commentform">
                <div>
                    <label htmlFor="comment">Comment</label>
                    <textarea id="comment" name="comment" value={comment} onChange={(e) => setComment(e.target.value)} />
                    {errors.comment && <p className="errorcss">{errors.comment}</p>}
                </div>
                <div className="sbmtbtn">

                <button>Update</button>
                </div>
            </form>
            </div>
        </div>
        </>
    )
}

export default UpdateComment