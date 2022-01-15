import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Link, NavLink } from 'react-router-dom';
import { login } from '../../store/session';
import './LoginForm.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div id='div-root'>
      <div id='left-div'>
        <article>
          <div id="ymtl-container">
            <Link to='/' className="ymtl-logo">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Notepad_icon.svg/2048px-Notepad_icon.svg.png" alt="" id="notepad"></img>
              <span>you made<br></br>the list</span>
            </Link>
          </div>
          <p>Insert inspirational quote here</p>
          <div id="log-in-author">
            <img src="/" alt="todo"></img>
            <p>Quotes curated by Bill A. Chimp, renowned productivity expert</p>
          </div>
        </article>
      </div>
      <div id='right-div'>
        <NavLink id="login-signup" to='/sign-up' exact={true} activeClassName='active'>
          Sign up for free
        </NavLink>
        <form onSubmit={onLogin} id='login-form'>
          <div>
            {errors.map((error, ind) => (
              <div key={ind} className="login-error">{error}</div>
            ))}
          </div>
          <h3>Been here before? Welcome Back!</h3>
          <div id="login-fields">
            <div>
              <input
                className='login-field'
                name='email'
                type='text'
                placeholder='Email'
                value={email}
                onChange={updateEmail}
              />
            </div>
            <div>
              <input
                className='login-field'
                name='password'
                type='password'
                placeholder='Password'
                value={password}
                onChange={updatePassword}
                />
            </div>
            <button type='submit' id='login-button'>Log in</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
