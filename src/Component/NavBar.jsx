import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { logOutUser } from '../Api/api';
import { useSelector, useDispatch } from 'react-redux';
import { userDataValue, setUserData } from '../Store/State';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import ChatIcon from '@mui/icons-material/Chat';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

export const NavBar = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch();

    const logOut = async () => {
        await logOutUser();
        dispatch(setUserData({}));
        navigate('/');
    }

    const userData = useSelector(userDataValue);
    //const btnLogout = userData.Id ? <Button onClick={logOut} color="inherit">Logout</Button> : null;
    const btnLogout = userData.Id ? <FormGroup>
    <FormControlLabel onClick={logOut} control={<Switch defaultChecked />} label="Logout" />
  </FormGroup>: null;
    

    const [state, setState] = React.useState({
        left: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {

        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }
        setState({ ...state, [anchor]: open });

    };

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                <ListItem onClick={() => navigate('/')}   button>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Home Page'} />
                    </ListItem>
                    <ListItem onClick={() => navigate('/userprofile')}   button>
                        <ListItemIcon>
                            <AccountCircleIcon />
                        </ListItemIcon>
                        <ListItemText primary={'User Profile'} />
                </ListItem>
                <ListItem onClick={() => navigate('/chat')}   button>
                        <ListItemIcon>
                            <ChatIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Chat'} />
                </ListItem>
            </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>
                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar style={{ backgroundColor: "#ffab40" }} position="static">
                    <Toolbar>
                        {userData.Id ? <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            onClick={ toggleDrawer('left', true)}

                        >
                            <MenuIcon ></MenuIcon>


                        </IconButton>: null}
                        <div>

                            <React.Fragment key={'left'}>
                                <SwipeableDrawer
                                    open={state['left']}
                                    onClose={toggleDrawer('left', false)}
                                    onOpen={toggleDrawer('left', true)}
                                >
                                    {list('left')}
                                </SwipeableDrawer>
                            </React.Fragment>

                        </div>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Restaurant App
                        </Typography>
                        {btnLogout}
                    </Toolbar>
                </AppBar>
            </Box>

        </>
    );
}