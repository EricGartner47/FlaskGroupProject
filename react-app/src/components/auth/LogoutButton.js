import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import { useHistory } from 'react-router-dom';
import { clearTasks } from '../../store/tasks';
import { clearLists } from '../../store/lists';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const history = useHistory()
  const onLogout = async (e) => {
    await dispatch(logout());
    dispatch(clearTasks());
    dispatch(clearLists());
    history.push("/login")
  };

  return <li id="log-out-button" onClick={onLogout}>Sign out</li>;
};

export default LogoutButton;
