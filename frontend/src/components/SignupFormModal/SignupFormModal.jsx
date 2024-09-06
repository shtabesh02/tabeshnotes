import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as sessionActions from '../../store/session';
import './SignupForm.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data?.errors) {
            setErrors(data.errors);
          }
        });
    }
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };

  return (
    <>
      <div className="signupcontainer">
        <h1 className='signup'>Sign Up</h1>
        <form onSubmit={handleSubmit} className='signupform'>
         <div className="email">
         <label className='form-label'>
            Email
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className='form-input'
            />
          
          {errors.email && <p>{errors.email}</p>}
         </div>
          <div className="username">
          <label className='form-label'>
            Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className='form-input'
            />
          
          {errors.username && <p>{errors.username}</p>}
          </div>
          <div className="firstname">
          <label className='form-label'>
            First Name 
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className='form-input'
            />
         
          {errors.firstName && <p>{errors.firstName}</p>}
          </div>
          <div className="lastname">
          <label className='form-label'>
            Last Name 
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className='form-input'
            />
         
          {errors.lastName && <p>{errors.lastName}</p>}
          </div>
          <div className="password">
          <label className='form-label'>
            Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className='form-input'
            />
          
          {errors.password && <p>{errors.password}</p>}
          </div>
          <div className="confirmpassword">
          <label className='form-label'>
            Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className='form-input'
            />
          
          {errors.confirmPassword && (
            <p>{errors.confirmPassword}</p>
          )}
          </div>
          <div className="submitbutton">
          <button type="submit" className='signupbuttonform'>Sign Up</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default SignupFormModal;