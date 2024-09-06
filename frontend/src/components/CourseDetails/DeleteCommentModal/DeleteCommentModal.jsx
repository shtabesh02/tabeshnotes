import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../../context/Modal';
import './DeleteCommentModal.css'
import { deletecomment } from '../../../store/comments';


function DeleteCommentModal({ comment_id }) {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();
    const handleConfirmSubmit = (e) => {
        e.preventDefault();
        setErrors({});


        return dispatch(deletecomment(comment_id))
            .then(closeModal)
            .catch(async (res) => {
                if (res && res.message) {
                    setErrors(res);
                }
            });
    };
    const handleCancelSubmit = (e) => {
        e.preventDefault();
        closeModal()
    };


    return (
        <div className='deletereview-confirm-container'>
            <h1>Confirm Delete</h1>
            {errors.message && (
                <p className=''>{errors.message}</p>
            )}
            <p>
                Are you sure you want to remove this comment?
            </p>
            <button
                className='deletereview-confirm-button'
                type='button'
                onClick={handleConfirmSubmit}
            >
                Yes (Delete Comment)
            </button>
            <button
                className='deletereview-cancel-button'
                type='button'
                onClick={handleCancelSubmit}
            >
                No (Keep Comment)
            </button>
        </div>
    )
}


export default DeleteCommentModal