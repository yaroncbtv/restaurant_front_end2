import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userDataValue } from '../Store/State';
import { NavBar } from './NavBar';
import TextField from '@mui/material/TextField';

export const Chat = () => {
    const userData = useSelector(userDataValue);

    return(
        <div>
            <NavBar/>
            <div style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', alignContent:'center'}}>
                <div>
                <TextField id="outlined-basic" label="Outlined" variant="outlined" />

                </div>

                <div style={{width:'100%',display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', alignContent:'center'}}>
                <TextField
          id="outlined-multiline-static"
          label="Multiline"
          multiline
          rows={9}
          defaultValue="Default Value"
         sx={{ width:  '90%'}}  
        />
                </div>
            </div>
            
        </div>
    )
}