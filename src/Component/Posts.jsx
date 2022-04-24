import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TextField from '@mui/material/TextField';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useSelector } from 'react-redux';
import { userDataValue } from '../Store/State';
import { postUserOffer } from '../Api/api';
import Alert from '@mui/material/Alert';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Posts({post}) {
  const [expanded, setExpanded] = React.useState(false);
  const [inputVal, setInputVal] = React.useState('');
  const [dataFromReq, setDataFromReq] = React.useState('');
  const [dataFromReqAlert, setDataFromReqAlert] = React.useState(false);
  const userData = useSelector(userDataValue);


  
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const submitOfferToServer = async () => {
        if(inputVal.length === 0){
            setDataFromReq('You must input valid offer')
            setDataFromReqAlert(true);
            setTimeout(() => {
                setDataFromReqAlert(false)
            }, 2000)
        }
        else if(post.contentPosts.maxOffer >= inputVal){
            setDataFromReq('You must submit higher offer')
            setDataFromReqAlert(true);
            setTimeout(() => {
                setDataFromReqAlert(false)
            }, 2000)
        }else{
            const data = {
                postId:`${post.contentPosts.Id}`,
                userPhone:userData.phone,
                userOffer:inputVal
            }
       
            const dataFromReq = await postUserOffer(JSON.stringify(data));
            
            setDataFromReq(dataFromReq)
            setDataFromReqAlert(true);
            setTimeout(() => {
                setDataFromReqAlert(false)
            }, 2000)
        }  
  }
  const submitMsgOffer = dataFromReqAlert ? <Alert severity={dataFromReq.message ? "success" : "error"}>{dataFromReq.message ? dataFromReq.message : dataFromReq}</Alert>: null;
//   const allUserOffer = post.post.map( (post) => {
//     return <Typography key={post.Id}>- {`${post.userOffer} ₪`}</Typography>
//   })



  return (
    <Card sx={{ maxWidth: 345, marginTop:5 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={post.contentPosts.header}
        subheader={post.contentPosts.endSale}
      />
      <CardMedia
        component="img"
        height="194"
        image="https://media-cldnry.s-nbcnews.com/image/upload/t_focal-758x379,f_auto,q_auto:best/rockcms/2022-03/plant-based-food-mc-220323-02-273c7b.jpg"
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {post.contentPosts.content}
        </Typography>
      </CardContent>
      <CardContent variant="body2" color="text.secondary">
      <Typography style={{fontSize:'13px'}}>Start Offer: {post.contentPosts.startOffer} ₪</Typography>
      <Typography style={{fontSize:'18px'}}>Currect Offer: {post.contentPosts.maxOffer} ₪</Typography>
      </CardContent>
      
      <CardActions disableSpacing>
          {/* <Typography variant="body2" color="text.secondary">Add Offer</Typography> */}
          <TextField onChange={(e) => { setInputVal(e.target.value); }} style={{width:'150px'}} size="small" type='number' id="outlined-basic" label="Add Offer" variant="outlined" />
        <IconButton onClick={submitOfferToServer} aria-label="add to favorites">
          {/* <FavoriteIcon /> */}
          <AddCircleIcon/>
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      {submitMsgOffer}
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
           {/* {allUserOffer} */}
           <TableContainer component={Paper}>
      <Table sx={{ minWidth: 0 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Offer Id</TableCell>
            <TableCell align="right">User Phone</TableCell>
            <TableCell align="right">User Offer</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
        {/* <Items currentItems={currentItems} /> */}
      
          {post.post.map((post, index) => (
            
            <TableRow
              key={post.Id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } ,backgroundColor:index === 0 ? '#32CD32' : null}}
            >
              <TableCell component="th" scope="row">
                {post.Id}
                {/* {index === post.post.length co} */}
              </TableCell>
              <TableCell align="right">{post.userPhone}</TableCell>
              <TableCell align="right">{`${post.userOffer} ₪`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </CardContent>
      </Collapse>
    </Card>
  );
}
