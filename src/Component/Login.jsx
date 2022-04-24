import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { sendLoginData } from '../Api/api';
import { useDispatch } from 'react-redux'
import { NavBar } from './NavBar';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import { Link as ReactR }  from "react-router-dom";
import { getUserData } from '../Api/api';
import { setUserData } from '../Store/State';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Login() {
  // const count = useSelector((state) => state.data.value)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [msg, setMsg] = React.useState("");
  const [msgAlertColor, setMsgAlertColor] = React.useState("");
  const [isChecked] = React.useState(true);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const data = new FormData(event.currentTarget);
    let dataToSend = {
      phone: data.get('phone'),
      password: data.get('password'),
      stayLogin: isChecked
    };

    const res = await sendLoginData(JSON.stringify(dataToSend));
    console.log(res)

    setMsg(res.message);

    switch (res.isSucesses) {
      case 1:
        setMsgAlertColor("success");
        setTimeout(() => {navigate('/homepage');}, 2000)
        const userData = await getUserData();
        if(!(userData === 401)){         
          dispatch(setUserData(userData));
        }
        
        break;
      case -1:
        setMsgAlertColor("error");
        break;
      case 0:
        setMsgAlertColor("warning");
        break;
      default:
        setMsgAlertColor("error");
        setMsg("Server Error!");
        break;
    }
    setOpen(true);
    //setTimeout(()=>{setMsg("")},3000)
  };


  const [open, setOpen] = React.useState(false);

  // const handleClick = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);
  };

  // const action = (
  //   <React.Fragment>
  //     <Button color="secondary" size="small" >
  //       UNDO
  //     </Button>
  //     <IconButton
  //       size="small"
  //       aria-label="close"
  //       color="inherit"

  //     >
  //       <CloseIcon fontSize="small" />
  //     </IconButton>
  //   </React.Fragment>
  // );

    
  return (
    <div>
      <ThemeProvider theme={theme}>
        <NavBar />
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="phone"
                label="Phone"
                type="tel"
                id="phone"

              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"

              />
              {/* <FormControlLabel
                control={<Checkbox onClick={() => setIsChecked(!isChecked)} checked={isChecked} value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>

              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <ReactR to="/SignUp" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </ReactR>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />

        </Container>

      </ThemeProvider>
      <div>
        {/* <Button onClick={handleClick}>Open simple snackbar</Button> */}
        <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={open} autoHideDuration={2000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={msgAlertColor} sx={{ width: '100%' }}>
            {msg}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}


