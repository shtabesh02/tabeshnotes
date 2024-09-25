import { NavLink, useNavigate, useParams } from 'react-router-dom'

import './UserProfile.css'
import { useEffect, useState } from 'react';
import UserCourses from './UserCourses';
import UserNotes from './UserNotes';
import { useDispatch, useSelector } from 'react-redux';
import { loadUserProfile } from '../../store/userprofile';

// import { profilePicture } from '../../store/profilePicture.js';

import axios from 'axios'
function UserProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { username } = useParams();
  const loggedInusername = useSelector(state => state.session?.user?.username);
  const [usercourses, setUsercourses] = useState(true);
  const currentuser = useSelector(state => state.session?.user?.id);
  // const profiledetails = useSelector(state => state.profileReducer?.profile);
  const profiledetails = useSelector(state => state.profileReducer?.profile || {});
  console.log('profiledetails: ', profiledetails);
  console.log('username: ', username)
  useEffect(() => {
    dispatch(loadUserProfile(username))
      .then(() => console.log('user profile loaded...'))
      .catch(() => console.log('failed to load...'))
  }, [dispatch, username]);


  // Handling profile photo update

  // const [imageForm, setImageForm] = useState();
  // const [imageInput, setImageInput] = useState();

  // const history = useHistory(); // so that you can redirect after the image upload is successful
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [newphoto, setNewphoto] = useState(null);
  
  // 1. get a secure url from the server
  // 2. post the image directly to the s3 bucket
  // 3. then request to my server to store any extra data

  const handleProfilePhoto = async (e) => {
    e.preventDefault();

    if (profilePhoto && profilePhoto.size > 10 * 1024 * 1024) { // 10MB
      alert(`  "File size exceeds 10MB"`);
      return;
    } 
    const formData = new FormData();
    formData.append("profilePhoto", profilePhoto);

    setImageLoading(true);
    // await dispatch(createPost(formData));

    // await dispatch(profilePicture(formData, currentuser))
    //   .then((p) => {
    //     console.log('photo sent...');
    //     console.log('photo: ', p)
    //   })
    //   .catch(() => console.log('photo not sent...'))
    const updatedphoto = await axios.post(`/api/getUrl/users/${currentuser}`, formData, { headers: {'Content-Type': 'multipart/form-data'}})
    if(updatedphoto){
      console.log('updatedphoto')
      const result = await axios.get(`/api/getUrl/users/${currentuser}`);
      console.log('result: ', result);
      console.log('result.imageUrl: ', result?.data[0].imageUrl);
      setNewphoto(result?.data[0]?.imageUrl)
    }

  }
  return (
    <div className='topcontainerdiv'>
      <div className='userprofilecontainer'>
        <h1>User profile</h1>

        {profiledetails?.UserProfile ? (
          <>
            {profiledetails?.id == currentuser && (
              <button onClick={() => navigate(`/${username}/update`)}>Update your profile</button>
            )}
            <div className="profileheadings">
              <div className="followme">
                {/* <i className="fa-solid fa-user fa-5x userprofilepic"></i> */}
                {/* <img src={profiledetails?.UserProfile?.photo} alt="Profile Picture" className='userprofilepic' /> */}
                <div className='followonsn'>
                {username == loggedInusername &&                   
                  <form onSubmit={handleProfilePhoto}>
                    {newphoto? <img src={newphoto} alt="not found" /> : <p>Not uploaded yet.</p>}
                    <input type="file" accept='image/*' name="profilePhoto" onChange={e => setProfilePhoto(e.target.files[0])} />
                    <button>submit</button>
                    {(imageLoading) && <p>Uploading....</p>}
                  </form>
                  }
                </div>
              </div>
              <div className="userbio">
                {/* <p className='biodetail'> */}

                {profiledetails?.UserProfile?.bio}

                {/* </p> */}
              </div>
              <div className='socialicons'>
                <NavLink to={profiledetails?.UserProfile?.github}><i className="fa-brands fa-github fa-2x"></i></NavLink>
                <NavLink to={profiledetails?.UserProfile?.linkedin}><i className="fa-brands fa-linkedin fa-2x"></i></NavLink>
              </div>
            </div>
          </>
        ) : (
          <>
            {profiledetails?.id == currentuser && (
              <button onClick={() => navigate(`/${username}/addprofile`)}>Update your profile</button>
            )}
            <div className="profileheadings">
              <div className="followme">
                {/* <i className="fa-solid fa-user fa-5x userprofilepic"></i> */}
                <img src='' alt="Profile Picture" className='userprofilepic' />
                <div className='followonsn'>
                  {username == loggedInusername &&                   
                  <form onSubmit={handleProfilePhoto}>
                    <input type="file" accept='image/*' name="profilePhoto" onChange={e => setProfilePhoto(e.target.files[0])} />
                    <button>submit</button>
                    {(imageLoading) && <p>Uploading....</p>}
                  </form>
                  }
                </div>
              </div>
              {/* <div className="userbio"> */}
              <p className='biodetail'>
                No bio yet...
              </p>
              {/* </div> */}
              <div className='socialicons'>
                <NavLink><i className="fa-brands fa-github fa-2x"></i></NavLink>
                <NavLink><i className="fa-brands fa-linkedin fa-2x"></i></NavLink>
              </div>
            </div>
          </>
        )}
        <div className="coursesAndnotes">
          <ul>
            <li onClick={() => setUsercourses(true)}>Courses</li>
            <li onClick={() => setUsercourses(false)}>Starred Notes</li>
          </ul>
          <hr />
        </div>
        {usercourses ? (<UserCourses username={username} />) : (<UserNotes username={username} />)}

      </div>
    </div>
  )
}

export default UserProfile