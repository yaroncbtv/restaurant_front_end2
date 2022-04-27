import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userDataValue } from '../Store/State';
import { NavBar } from './NavBar';

export const Chat = () => {
    const userData = useSelector(userDataValue);

    return(
        <div>
            <NavBar/>
        </div>
    )
}