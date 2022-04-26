// import React from "react";
// import {
//     addToArray,
//     homePageDataValue,
//     removeFromArray
//   } from '../Store/State';
// import { useSelector, useDispatch } from 'react-redux';

// export const HomePage = () => {
//     const homePageValue = useSelector(homePageDataValue);
//     const dispatch = useDispatch();
//     console.log(homePageValue)

//     const addArray = () => {
//         dispatch(addToArray("test"));
//     }
//     const removeArray = () => {
//         dispatch(removeFromArray());
//     }
//     return(
//         <div>
//                 <button onClick={addArray}>addToArray</button>
//                 <button onClick={removeArray}>removeFromArray</button>
//         </div>
//     )
// }


import * as React from 'react';
import Button from '@mui/material/Button';
// import CameraIcon from '@mui/icons-material/PhotoCamera';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { NavBar } from './NavBar';
import { useSelector, useDispatch } from 'react-redux';
import { userDataValue, allPostValue, setAllPost} from '../Store/State';
import Posts from './Posts';
import { getAllPost } from '../Api/api';
import axios from "axios";
import HashLoader from "react-spinners/HashLoader";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const theme = createTheme();

export default function HomePage() {
  const dispatch = useDispatch();
  const userData = useSelector(userDataValue);
  const allPost = useSelector(allPostValue);
  const posts = allPost.length > 0 ? allPost.map((post) => {
    return <div key={post.contentPosts.Id}><Posts post={post}/></div> 
}): <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', alignContent:'center'}}>
<div>
<HashLoader color={'#36D7B7'} css={override} loading={true} size={50} />
</div>
<div>Loading...</div>
</div>

  React.useEffect(() => {
        setInterval( async () => {
          const allPost = await getAllPost();
          axios.all([allPost]).then(axios.spread((...responses) => {
            const responseOne = responses[0]
            dispatch(setAllPost(allPost));
           
            // const responseTwo = responses[1]
            // const responesThree = responses[2]
            // use/access the results 
          })).catch(errors => {
            // react on errors.
          })
        },5000)
  },[]);
  return (
    <ThemeProvider theme={theme}>
        <NavBar/>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Hello And Welcome
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Something short and leading about the collection below—its contents,
              the creator, etc. Make it short and sweet, but not too short so folks
              don&apos;t simply skip over it entirely.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained">Main call to action</Button>
              <Button variant="outlined">Secondary action</Button>
            </Stack>
          </Container>
        </Box>
        <div style={{ display:'flex', justifyContent:'space-evenly', flexWrap:'wrap'}}>
            {posts}
        </div>
        
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}
const override = `
  display: block;
  
`;