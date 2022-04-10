import React from 'react';
import SignUp from './Component/SignUp';
import HomePage from './Component/HomePage';
import Login from './Component/Login';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { userDataValue, setUserData } from './Store/State';
import { useSelector, useDispatch } from 'react-redux';
import { getUserData } from './Api/api';
import GridLoader
from "react-spinners/GridLoader";
import { margin } from '@mui/system';

 function App() {
  const dispatch = useDispatch();

  const [loadPage, setLoadPage] = React.useState(true);
  React.useEffect(() => {
    (
      async () => {
        const userData = await getUserData();
        dispatch(setUserData(userData));
      }
  )();
  },[]);

  
  const userData = useSelector(userDataValue);
  const userIsLogin = userData.phone ? '/homepage' : '/login';

  setTimeout(()=>{
    setLoadPage(false)
  },1000)

  if(loadPage){
    return (
      <div style={{marginTop:'30%',display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', alignContent:'center'}}>
        <div>
        <GridLoader color={'#36D7B7'} css={override} loading={true} size={30} />
        </div>
        <div>Loading...</div>
      </div>
   )
  }else{
    return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/SignUp" element={<SignUp />}></Route>
            <Route path="/HomePage" element={<HomePage />}></Route>
            <Route path="/Login" element={<Login />}></Route>
            <Route path="/" element={<Navigate to={userIsLogin} />}></Route>
            <Route
              path="*"s
              element={<Navigate to="/HomePage" />} // 404 page
            />
          </Routes>
        </BrowserRouter>
        
      </div>
    );
  }
    
  
}
const override = `
  display: block;
  
`;

export default App;
