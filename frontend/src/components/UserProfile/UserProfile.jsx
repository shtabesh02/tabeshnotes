import { NavLink, useNavigate, useParams } from 'react-router-dom'

import './UserProfile.css'
import { useEffect, useState } from 'react';
import UserCourses from './UserCourses';
import UserNotes from './UserNotes';
import { useDispatch, useSelector } from 'react-redux';
import { loadUserProfile } from '../../store/userprofile';

import axios from 'axios'
function UserProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { username } = useParams();
  const loggedInusername = useSelector(state => state.session?.user?.username);
  const [usercourses, setUsercourses] = useState(true);
  const currentuser = useSelector(state => state.session?.user?.id);
  const profiledetails = useSelector(state => state.profileReducer?.profile || {});
  console.log('profiledetails: ', profiledetails);
  console.log('username: ', username)
  useEffect(() => {
    dispatch(loadUserProfile(username))
      .then(() => console.log('user profile loaded...'))
      .catch(() => console.log('failed to load...'))
  }, [dispatch, username]);

  // Handling profile photo update
  const [profilePhoto, setProfilePhoto] = useState(null);
  // const [imageLoading, setImageLoading] = useState(false);
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
    // setImageLoading(true);
    const updatedphoto = await axios.post(`/api/getUrl/users/${currentuser}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    if (updatedphoto) {
      console.log('updatedphoto')
      const result = await axios.get(`/api/getUrl/users/${currentuser}`);
      console.log('result: ', result);
      console.log('result.imageUrl: ', result?.data[0].imageUrl);
      setNewphoto(result?.data)
    }
  }

  useEffect(() => {
    const getPhotos = async () => {
     try {
       const photos = await axios.get(`/api/getUrl/users/${currentuser}`);
       console.log('profile photo: ', photos);
       setNewphoto(photos.data)
     } catch (error) {
       console.error('Error fetching photos: ', error)
     }
   }
   getPhotos();
 }, [currentuser]);

  return (
    <div className='topcontainerdiv'>
      <div className='userprofilecontainer'>
        {profiledetails?.UserProfile ? (
          <div className="bio">
            <div className="updateyourprofile">
              {profiledetails?.id == currentuser && (
                <button onClick={() => navigate(`/${username}/update`)}>Updatee your profile</button>
              )}
            </div>
            <div className="biodetails">
              <div className="profilephoto">
                <img src={newphoto} alt="Profile Picture" className='userprofilepic' />
                {username == loggedInusername &&
                  <form onSubmit={handleProfilePhoto}>
                    <input type="file" accept='image/*' name="profilePhoto" onChange={e => setProfilePhoto(e.target.files[0])} />
                    <button>submit</button>
                    {/* {(imageLoading) && <p>Uploading....</p>} */}
                  </form>
                }
              </div>
              <p className="userbio">
                {profiledetails?.UserProfile?.bio ? (profiledetails?.UserProfile?.bio):(<p>No bio</p>)}
              </p>
              <div className='socialicons'>
                <NavLink to={profiledetails?.UserProfile?.github}><i className="fa-brands fa-github fa-2x"></i></NavLink>
                <NavLink to={profiledetails?.UserProfile?.linkedin}><i className="fa-brands fa-linkedin fa-2x"></i></NavLink>
              </div>
            </div>
          </div>
        ) : (
          <div className="bio">
            <div className="updateyourprofile">
              {profiledetails?.id == currentuser && (
                <button onClick={() => navigate(`/${username}/addprofile`)}>Updatey your profile</button>
              )}
            </div>
            <div className="biodetails">
              <div className="profilephoto">
                <img src={newphoto} alt="Profile Picture" className='userprofilepic' />
                {username == loggedInusername &&
                  <form onSubmit={handleProfilePhoto}>
                    <input type="file" accept='image/*' name="profilePhoto" onChange={e => setProfilePhoto(e.target.files[0])} />
                    <button>submit</button>
                    {/* {(imageLoading) && <p>Uploading....</p>} */}
                  </form>
                }
              </div>
              <p className='userbio'>
                No bio yet...
              </p>
              <div className='socialicons'>
                <NavLink><i className="fa-brands fa-github fa-2x"></i></NavLink>
                <NavLink><i className="fa-brands fa-linkedin fa-2x"></i></NavLink>
              </div>
            </div>
          </div>
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