import './App.css';
import { Route, Routes } from "react-router-dom";
import LandingP from './Components/LandingP.jsx'
import Home from './Components/Home.jsx'
import Detail from './Components/Detail.jsx'
import RecipeCreate from './Components/RecipeCreate.jsx'

function App() {
  return (
    <div className="App">
     <Routes>
      <Route exact path = '/'element ={<LandingP/>}/>
      <Route exact path='/Home' element ={<Home/>}/>
      <Route exact path="/recipes/:id" element={<Detail/>}/>
      <Route exact path="/recipe" element={<RecipeCreate/>}/>
     </Routes>
    </div>
  );
}

export default App;
