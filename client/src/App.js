import './App.css';
import { Route, Routes } from "react-router-dom";
import generateStore from "./Redux/store";
import { Provider } from "react-redux";
import LandingP from './Components/LandingP.jsx'
import Home from './Components/Home.jsx'
import Detail from './Components/Detail.jsx'
import RecipeCreate from './Components/RecipeCreate.jsx'
import Modal from './Components/Modal';
function App() {
  const store = generateStore();
  return ( 
  <Provider store={store}>


   
     <Routes>
      <Route  path = '/'element ={<LandingP/>}/> 
      <Route  path='/Home' element ={<Home/>}/>
      <Route  path="/recipe" element={<RecipeCreate/>}/>
      <Route exact path="/recipes/:id" element={<Detail/>}/>
      <Route exact path="/recipes/update" element={<Modal/>}/>
     </Routes>

  </Provider>
  );
}

export default App;
