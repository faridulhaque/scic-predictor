
import { Route, Routes } from "react-router-dom";
import Fields from "./Fields";
import Home from "./Home";

function App() {
  
  

  return (
    <div className="App">
      
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        
      </Routes>
    </div>
  );
}

export default App;
