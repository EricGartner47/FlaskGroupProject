import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, Link, NavLink } from 'react-router-dom';
import { signUp } from '../../store/session';
import './SignUpForm.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState({})
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
    if (!username) errors.username = "Username is required"
    if (!firstName) errors.firstName = "First Name is required"
    if (!email) errors.email = "Email is required"
    if (!password) errors.password = "Password is required"
    if (!repeatPassword) errors.cpassword = "Confirm Password is required"
    setErrors({...errors})
    if (Object.keys(errors).length > 0) return
    else {
      const data = await dispatch(signUp(username, email, password, firstName, lastName));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
    if (e.target.value.length > 40) {
      errors.username = "Username must be 40 characters or fewer"
    } else if (e.target.value.length === 0) {
      errors.username = "Username is required"
    } else delete errors.username
  };

  const updateFirstName = e => {
    setFirstName(e.target.value);
    if (e.target.value.length > 100) {
      errors.firstName = "First Name must be 100 characters or fewer"
    } else if (e.target.value.length === 0) {
      errors.firstName = "First Name is required"
    } else delete errors.firstName
  };

  const updateLastName = (e) => {
    setLastName(e.target.value);
    if (e.target.value.length > 100) {
      errors.lastName = "Last Name must be 100 characters or fewer"
    } else delete errors.lastName
  };

  const validateEmail = mail => {
    const validRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if (mail.match(validRegex)) return true;
    else return false;
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
    if (e.target.value.length > 255) {
      errors.email = "Email must be 255 characters or fewer"
    } else if (e.target.value.length === 0) {
      errors.email = "Email is required"
    } else if (!validateEmail(e.target.value)) {
      errors.email = "Please enter a valid email address"
    } else delete errors.email

  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length === 0) {
      errors.password = "Password is required"
    } else delete errors.password
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
    if (e.target.value.length === 0) {
      errors.cpassword = "Confirm Password is required"
    } else if (password !== e.target.value) {
      errors.cpassword = "Password and Confirm Password must match"
    } else delete errors.cpassword
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
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Notepad_icon.svg/2048px-Notepad_icon.svg.png" alt="" id="notepad"></img>
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
          </div>
          <div id='signup-fields'>
          <h3>Sign up for free.</h3>
            <div>
              <input
                className={errors.firstName ? "error signup-field" : "signup-field"}
                placeholder='First Name'
                type='text'
                name='first_name'
                onChange={updateFirstName}
                value={firstName}
              ></input>
              {errors.firstName && <p className="signup-error">{errors.firstName}</p>}
            </div>
            <div>
              <input
                className={errors.lastName ? "error signup-field" : "signup-field"}
                placeholder='Last Name'
                type='text'
                name='last_name'
                onChange={updateLastName}
                value={lastName}
              ></input>
              {errors.lastName && <p className="signup-error">{errors.lastName}</p>}
            </div>
            <div>
              <input
                className={errors.username ? "error signup-field" : "signup-field"}
                placeholder='Username'
                type='text'
                name='username'
                onChange={updateUsername}
                value={username}
              ></input>
              {errors.username && <p className="signup-error">{errors.username}</p>}
            </div>
            <div>
              <input
                className={errors.email ? "error signup-field" : "signup-field"}
                placeholder='Email'
                type='text'
                name='email'
                onChange={updateEmail}
                value={email}
              ></input>
              {errors.email && <p className="signup-error">{errors.email}</p>}
            </div>
            <div>
              <input
                className={errors.password ? "error signup-field" : "signup-field"}
                type='password'
                name='password'
                placeholder='Password'
                onChange={updatePassword}
                value={password}
              ></input>
            </div>
            {errors.password && <p className="signup-error">{errors.password}</p>}
            <div>
              <input
                className={errors.cpassword ? "error signup-field" : "signup-field"}
                placeholder='Confirm Password'
                type='password'
                name='repeat_password'
                onChange={updateRepeatPassword}
                value={repeatPassword}
                // required={true}
              ></input>
              {errors.cpassword && <p className="signup-error">{errors.cpassword}</p>}
            </div>
            <button type='submit' id='login-button'>Sign Up!</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
