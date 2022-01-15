import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, Link, NavLink } from 'react-router-dom';
import { signUp } from '../../store/session';
import './SignUpForm.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([])
  const [fnError, setFnError] = useState();
  const [lnError, setLnError] = useState();
  const [unError, setUnError] = useState();
  const [emError, setEmError] = useState();
  const [pError, setPError] = useState();
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
    setErrors([])
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password, firstName, lastName));
      if (data) {
        setErrors(data)
      }
    } else setPError("Password and Confirm Password must match")
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
    if (username.length > 40) {
      setUnError("Username must be 40 characters or fewer")
    } else setUnError()
  };

  const updateFirstName = e => {
    setFirstName(e.target.value);
    if (firstName.length > 100) {
      setFnError("First Name must be 100 characters or fewer")
    } else setFnError()
  };

  const updateLastName = (e) => {
    setLastName(e.target.value);
    if (lastName.length > 100) {
      setLnError("Last Name must be 100 characters or fewer")
    } else setLnError()
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
    if (email.length > 255) {
      setEmError("Email must be 255 characters or fewer")
    } else setEmError()

  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
    // if (password !== repeatPassword) {
    //   setPError("Password and Confirm Password must match")
    // }
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
            {/* {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))} */}
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
              {errors.includes("first_name : This field is required.") && <p>First Name is required.</p>}
              {fnError && <p>{fnError}</p>}
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
              {lnError && <p>{lnError}</p>}
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
              {errors.includes("username : This field is required.") && <p>Username is required.</p>}
              {unError && <p>{unError}</p>}
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
              {errors.includes("email : This field is required.") && <p>Email is required.</p>}
              {errors.includes("email : Invalid email address.") && <p>Please enter a valid email address.</p>}
              {emError && <p>{emError}</p>}
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
              {errors.includes("password : This field is required.") && <p>Password is required.</p>}
            </div>
            <div>
              <input
                className='signup-field'
                placeholder='Confirm Password'
                type='password'
                name='repeat_password'
                onChange={updateRepeatPassword}
                value={repeatPassword}
                // required={true}
              ></input>
              {pError && <p>{pError}</p>}
            </div>
            <button type='submit' id='login-button'>Sign Up!</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
