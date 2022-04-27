import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userDataValue } from '../Store/State';
import { NavBar } from './NavBar';

export const UserProfile = () => {
    const userData = useSelector(userDataValue);

    return (
        <div>
        <NavBar/>
        <h1>Hello {userData.fullname}</h1>
        </div>
    )
}