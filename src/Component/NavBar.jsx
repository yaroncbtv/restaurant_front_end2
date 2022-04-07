import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export const NavBar = () => {
    return (
        <div>
            <CssBaseline />
            <AppBar position="relative">
                <Toolbar>
                    {/* <CameraIcon sx={{ mr: 2 }} /> */}
                    <Typography variant="h6" color="inherit" noWrap>
                        Pick Your Restaurant
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    )
}