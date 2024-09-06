import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useModal } from '../../context/Modal';
import { useModal } from '../../../context/Modal';
import './CommentModal.css'
// import { insertReview} from '../../store/review';
import RatingStars from './RatingStars';
import { addnewcommenttoDB } from '../../../store/comments';
// import { useParams } from 'react-router-dom';
// import { insertReview } from '../../store/review';
function CommentModal ({course_id, setSelectedTab}) {

    const dispatch = useDispatch();
    //const sessionUser = useSelector((state) => state.session.user);
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0);
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

        const newComment = {
            user_id: current_user,
            course_id,
            comment,
            stars: rating
        }
   
        return dispatch(addnewcommenttoDB(newComment, course_id))
          .then(closeModal)
          .then(() => {
            setSelectedTab('comments')
          })
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



    return (
        <div className='reviewContainerForm'>
            <h1>You can add your comment here...</h1>
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
              

                <button className={`${comment.length < 10 || rating < 1 ? 'disabled' : 'submitReview'}`}
                    type='button'
                    onClick={handleSubmit}
                    disabled={comment.length < 10 || rating < 1}
                >
                    Submit Your Comment
                </button>


            </form>
        </div>
    )
}

export default CommentModal