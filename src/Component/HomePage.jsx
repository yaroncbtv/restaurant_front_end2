import React from "react";
import {
    addToArray,
    homePageDataValue,
    removeFromArray
  } from '../Store/State';
import { useSelector, useDispatch } from 'react-redux';

export const HomePage = () => {
    const homePageValue = useSelector(homePageDataValue);
    const dispatch = useDispatch();
    console.log(homePageValue)

    const addArray = () => {
        dispatch(addToArray("test"));
    }
    const removeArray = () => {
        dispatch(removeFromArray());
    }
    return(
        <div>
                <button onClick={addArray}>addToArray</button>
                <button onClick={removeArray}>removeFromArray</button>
        </div>
    )
}