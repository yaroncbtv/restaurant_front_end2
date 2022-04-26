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
import GridLoader from "react-spinners/GridLoader";
import { margin } from '@mui/system';
import Admin from './Component/Admin';
function App() {
  const dispatch = useDispatch();

  const [loadPage, setLoadPage] = React.useState(true);
  React.useEffect(() => {
    (
      async () => {
        const userData = await getUserData();
        if (!(userData === 401)) {
          dispatch(setUserData(userData));
        }
      }
    )();
    setTimeout(() => {
      setLoadPage(false)
    }, 1000)
  }, []);



  const userData = useSelector(userDataValue);

  if (!userData.Id && loadPage) {
    return (
      <div style={{ marginTop: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
        <div>
          <GridLoader color={'#36D7B7'} css={override} loading={true} size={30} />
        </div>
        <div>Loading...</div>
      </div>
    )

  }
  else {

    if (userData.phone) {
      return (
        <div className="App">
          <BrowserRouter>
            <Routes>
              <Route path="/HomePage" element={<HomePage />}></Route>
              <Route path="/" element={<Navigate to={'HomePage'} />}></Route>
              <Route path="/Admin" element={<Admin />}></Route>
              <Route
                path="*" s
                element={<Navigate to="/HomePage" />} // 404 page
              />
            </Routes>
          </BrowserRouter>

        </div>
      );
    } else {
      return (
        <div className="App">
          <BrowserRouter>
            <Routes>
              <Route path="/SignUp" element={<SignUp />}></Route>
              <Route path="/Admin" element={<Admin />}></Route>
              <Route path="/Login" element={<Login />}></Route>
              <Route path="/" element={<Navigate to={'Login'} />}></Route>
              <Route
                path="*" s
                element={<Navigate to="/Login" />} // 404 page
              />
            </Routes>
          </BrowserRouter>

        </div>
      );
    }



  }


}
const override = `
  display: block;
  
`;

export default App;
