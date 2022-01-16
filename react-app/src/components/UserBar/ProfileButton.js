import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import LogoutButton from "../auth/LogoutButton";

function ProfileButton() {
    const user = useSelector(state => state.session.user);
    const [showMenu, setShowMenu] = useState(false)

    const openMenu = () => {
        if (showMenu) return;
        return setShowMenu(true)
    }

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        }

        document.addEventListener("click", closeMenu)

        return () => document.removeEventListener("click", closeMenu)
    }, [showMenu])

    return (
        <>
            <div onClick={openMenu} id="profile-icon" >
                <i class="fas fa-cog"></i><i className="fas fa-angle-down"></i>
            </div>
            {showMenu && (
            <ul className="profile-dropdown">
                <li id="user-info">
                    <div id="user-picture"></div>
                    <div id="user-name">
                        <span>{user.first_name} {user.last_name}</span>
                        <span id="email">{user.email}</span>
                    </div>
                </li>
                <li id="log-out-button">
                    <LogoutButton />
                </li>
            </ul>
            )}
        </>
    )
}

export default ProfileButton
