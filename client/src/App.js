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
      <Route  path = '/'element ={<LandingP/>}/> 
      <Route  path='/Home' element ={<Home/>}/>
      <Route  path="/recipe" element={<RecipeCreate/>}/>
      <Route exact path="/recipes/:id" element={<Detail/>}/>
     </Routes>
    </div>
  );
}

export default App;
