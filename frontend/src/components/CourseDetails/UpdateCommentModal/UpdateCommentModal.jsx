import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useModal } from '../../context/Modal';
import { useModal } from '../../../context/Modal';
import './UpdateCommentModal.css'
// import { insertReview} from '../../store/review';
import RatingStars from './RatingStars';
import { editcomment, loadcommentsfromDB } from '../../../store/comments';
// import { useParams } from 'react-router-dom';
// import { insertReview } from '../../store/review';
function UpdateCommentModal ({comment_id, course_id, setSelectedTab}) {
    // console.log('comment id: ', comment_id)
    const dispatch = useDispatch();
    //const sessionUser = useSelector((state) => state.session.user);

    const updatingmycomment = useSelector(state => state.commentReducer?.comments[comment_id]);
    // console.log('current comment: ', updatingmycomment);
    const [comment, setComment] = useState(updatingmycomment?.comment || '');
    const [rating, setRating] = useState(updatingmycomment?.stars || 0);
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();
    //console.log(spotId)

    // const { course_id } = useParams();
    const current_user = useSelector(state => state.session.user?.id);
    const onChange = (num) => {
        setRating(num);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});

        const UpdatedComment = {
            user_id: current_user,
            course_id,
            comment,
            stars: rating
        }

        return dispatch(editcomment(UpdatedComment, comment_id))
          .then(closeModal)
          .then(() => setSelectedTab('comments'))
          .catch(async (res) => {
            const data = await res.json();
            //console.log(data)
            if (data && data.message) {
                // console.log('data.errors: ', data.errors)
                setErrors(data.errors);
                //console.log(errors, errors)
            }
            //console.log(errors)
            return;
        });
    };



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
            setComment(updatingmycomment.comment || '');
            setRating(updatingmycomment.stars || 0)
        }
    }, [updatingmycomment])

    return (
        <div className='reviewContainerForm'>
            <h1>You can update your comment here...</h1>
                {errors.message && (
                <p className=''>{errors.message}</p>
            )}
            {errors.comment && (<div className='requiredInput'>{errors.comment}</div>)}
            <form className='form' onSubmit={handleSubmit}>
                <textarea className='reviewText'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    name='review'
                    placeholder='Leave your comment here...'
                    rows='5'
                >
                </textarea>

                {/* <rating>
                    onChange={(e) => setRating(e.target.value)}

                <rating/> */}
                {errors.stars && (<div className='newspot-form-required-input'>{errors.stars}</div>)}

                <RatingStars rating={rating} onChange={onChange}/>
              

                <button className={`${updatingmycomment.length < 10 || rating < 1 ? 'disabled' : 'submitReview'}`}
                    type='button'
                    onClick={handleSubmit}
                    disabled={updatingmycomment.length < 10 || rating < 1}
                >
                    Update Your Comment
                </button>


            </form>
        </div>
    )
}

export default UpdateCommentModal