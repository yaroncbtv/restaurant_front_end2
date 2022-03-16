import Login from './Component/Login';
import {HomePage} from './Component/HomePage';
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
      <Route path="/" element={<Login/>}></Route>
      <Route path="/HomePage" element={<HomePage/>}></Route>
    </Routes>
  </BrowserRouter>
    </div>
  );
}

export default App;
