// frontend/src/components/Lessons/AddLesson.jsx
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import './UpdateProfile.css'
import { loadUserProfile, updatethisprofile } from "../../store/userprofile";

const UpdateProfile = () => {
    const currentProfile = useSelector(state => state.profileReducer?.profile);
    console.log('currentprofile: ', currentProfile)
    const [photo, setPhoto] = useState(currentProfile?.UserProfile?.photo || '');
    const [github, setGithub] = useState(currentProfile?.UserProfile?.github || '');
    const [linkedin, setLinkedin] = useState(currentProfile?.UserProfile?.linkedin || '');
    const [bio, setBio] = useState(currentProfile?.UserProfile?.bio || '');

    const [errors, setErrors] = useState({});
    const user_id = useSelector(state => state.session.user.id);
    const { username } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const updateuserprofile = (e) => {
        e.preventDefault();
        const newprofile = {
            user_id,
            photo,
            github,
            linkedin,
            bio
        }
        
        dispatch(updatethisprofile(newprofile, user_id))
            .then(() => {
                navigate(`/${username}`)
            })
            .catch(async (res) => {
                const data = await res.json();
                setErrors(data?.errors);
            })
    }
    useEffect(()=> {
        dispatch(loadUserProfile(user_id))
    }, [dispatch, user_id]);

    useEffect(() => {
        if(currentProfile){
            setPhoto(currentProfile?.UserProfile?.photo || '');
            setGithub(currentProfile?.UserProfile?.github || '');            
            setLinkedin(currentProfile?.UserProfile?.linkedin ||'');
            setBio(currentProfile?.UserProfile?.bio || '');
        }
    }, [currentProfile]);

    return (
        <>
            <div className="back2myprofile">
                <button onClick={() => navigate(`/${username}`)}>Back</button>
            </div>
            <div className="profilecontainer">
                <div className="addlesson">
                    <h1>Profile details</h1>
                    <form onSubmit={updateuserprofile} className="lessonform">
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
                            <button>Update profile</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default UpdateProfile