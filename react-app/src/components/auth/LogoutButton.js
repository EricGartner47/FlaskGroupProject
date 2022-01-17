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
    await dispatch(clearTasks());
    await dispatch(clearLists());
    history.push("/login")
  };

  return <div id="logout-btn" onClick={onLogout}>Sign out</div>;
};

export default LogoutButton;
