import Login from './Component/Login';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}>
       
      </Route>
    </Routes>
  </BrowserRouter>
    </div>
  );
}

export default App;
