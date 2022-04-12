import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { addNewUser } from '../Api/api';
import { useSelector, useDispatch } from 'react-redux'
import { NavBar } from './NavBar';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import MuiAlert from '@mui/material/Alert';
import { Link as ReactR } from "react-router-dom";


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

export default function SignUp() {
  const count = useSelector((state) => state.data.value)
  const [msg, setMsg] = React.useState("");
  const [msgAlertColor, setMsgAlertColor] = React.useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let dataToSend = {
      fullname: data.get('fullname'),
      phone: data.get('phone'),
      password: data.get('password')
    };

    const res = await addNewUser(JSON.stringify(dataToSend));

    setMsg(res.message);

    switch (res.isSucesses) {
      case 1:
        setMsgAlertColor("success");
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

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" >
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"

      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );


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
              Sign Up
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="fullname"
                label="Full Name"
                type="text"
                id="fullname"

              />
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
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>

              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    {/* Forgot password? */}
                  </Link>
                </Grid>
                <Grid item>
                  <ReactR to="/Login" variant="body2">
                    {"You have an account? Login"}
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


