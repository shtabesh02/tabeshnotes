// frontend/src/components/Lessons/AddLesson.jsx
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import './UpdateProfile.css'
import { addthisprofile } from "../../store/userprofile";

const AddProfile = () => {
    const [photo, setPhoto] = useState('');
    const [github, setGithub] = useState('');
    const [linkedin, setLinkedin] = useState('');
    const [bio, setBio] = useState('');

    const [errors, setErrors] = useState({});
    const user_id = useSelector(state => state.session.user.id);
    // const course_title = useSelector(state => state.courseReducer.courseDetails.title);
    const { username } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const adduserprofile = (e) => {
        e.preventDefault();
        const newprofile = {
            user_id,
            photo,
            github,
            linkedin,
            bio
        }
        
        dispatch(addthisprofile(newprofile, user_id))
            .then(() => {
                navigate(`/${username}`)
            })
            .catch(async (res) => {
                const data = await res.json();
                setErrors(data?.errors);
            })
    }

    return (
        <>
            <div className="back2myprofile">
                <button onClick={() => navigate(`/${username}`)}>Back</button>
            </div>
            <div className="profilecontainer">
                <div className="addlesson">
                    <h1>Profile details</h1>
                    <form onSubmit={adduserprofile} className="lessonform">
                        <div>
                            <label htmlFor="photo">Photo link</label>
                            <input type="text" value={photo} onChange={e => setPhoto(e.target.value)} />
                            {errors.photo && <p className="errorcss">{errors.photo}</p>}
                        </div>
                        <div>
                            <label htmlFor="github">github</label>
                            <input type="text" value={github} onChange={e => setGithub(e.target.value)} />
                            {errors.github && <p className="errorcss">{errors.github}</p>}
                        </div>
                        <div>
                            <label htmlFor="linkedin">LinkedIn</label>
                            <input type="text" value={linkedin} onChange={e => setLinkedin(e.target.value)} />
                            {errors.linkedin && <p className="errorcss">{errors.linkedin}</p>}
                        </div>
                        <div>
                            <label htmlFor="content">Bio</label>
                            <textarea value={bio} onChange={e => setBio(e.target.value)} name="lessoncontent" id="lessoncontent" cols="30" rows="10">bio</textarea>
                            {errors.bio && <p className="errorcss">{errors.bio}</p>}
                        </div>
                        <div className="sbmtbtn">
                            <button>Add profile</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddProfile