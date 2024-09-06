// frontend/src/components/LoginFormModal/LoginFormModal.jsx

import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './LoginForm.css';
import OpenModalButton from '../OpenModalButton';
import SignupFormModal from '../SignupFormModal';
// import { thunkLogin } from '../../store/session'

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  const handleDemoLogin = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      sessionActions.login({
        credential: 'user2@demo.io',
        password: 'password2',
      }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors)
        }
      })

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }

  }

  return (
    <>
      <div className="logincontainer">
        <h1 className='login'>Log In</h1>
        <form onSubmit={handleSubmit} className='form'>
          <div className='theusername'>
            <label className='form-label'>
              Username or Email
            </label>
            <input
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
              className='form-input'
            />
          </div>

          <div className='thepassword'>
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
          </div>

          {errors.credential && (
            <p className='errors'>{errors.credential}</p>
          )}
          <button type="submit" className='login-form-button'>Log In</button>
          <button type='button' style={{ marginLeft: '15px' }} onClick={handleDemoLogin} className='login-form-demo-login'>Demo User</button>
        </form>
        <div className='createanaccount'>
          <p>Create an account:</p>

          <OpenModalButton
            buttonText="Sign Up"
            modalComponent={<SignupFormModal />}
          />
        </div>
      </div>
    </>
  );
}

export default LoginFormModal;