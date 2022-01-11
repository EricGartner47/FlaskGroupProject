import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, Link, NavLink } from 'react-router-dom';
import { signUp } from '../../store/session';
import './SignUpForm.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password, firstName, lastName));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };
  const updateLastName = (e) => {
    setLastName(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div id='div-root'>
      <div id='left-div'>
        <article id='signup-left-div'>
          <div id="ymtl-container">
            <Link to="/" className="ymtl-logo">
              <img src="/images/Notepad_icon.png" alt="" id="notepad"></img>
              <span>you made<br></br>the list</span>
            </Link>
          </div>
          <div id='image-divs'>
            <div id="image1">
            </div>
            <div id='image2'>
            </div>
            <div id='image3'>
            </div>
            <h2 id='quote-div'>Join millions of people getting more organized and productive</h2>
          </div>
        </article>
      </div>
      <div id='right-div'>
          <NavLink to='/login' exact={true} activeClassName='active' id='signup-login'>
            Log in
          </NavLink>
        <form onSubmit={onSignUp} id='signup-form'>
          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div id='signup-fields'>
          <h3>Sign up for Free.</h3>
            <div>
              <input
                className='signup-field'
                placeholder='First Name'
                type='text'
                name='first_name'
                onChange={updateFirstName}
                value={firstName}
              ></input>
            </div>
            <div>
              <input
                className='signup-field'
                placeholder='Last Name'
                type='text'
                name='last_name'
                onChange={updateLastName}
                value={lastName}
              ></input>
            </div>
            <div>
              <input
                className='signup-field'
                placeholder='Username'
                type='text'
                name='username'
                onChange={updateUsername}
                value={username}
              ></input>
            </div>
            <div>
              <input
                className='signup-field'
                placeholder='Email'
                type='text'
                name='email'
                onChange={updateEmail}
                value={email}
              ></input>
            </div>
            <div>
              <input
                className='signup-field'
                type='password'
                name='password'
                placeholder='Password'
                onChange={updatePassword}
                value={password}
              ></input>
            </div>
            <div>
              <input
                className='signup-field'
                placeholder='Confirm Password'
                type='password'
                name='repeat_password'
                onChange={updateRepeatPassword}
                value={repeatPassword}
                required={true}
              ></input>
            </div>
            <button type='submit' id='login-button'>Sign Up!</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
