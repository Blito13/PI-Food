import './App.css';
import generateStore from "./Redux/store";
import { Route, Routes } from "react-router-dom";
import React from "react";
import { Provider } from "react-redux"; 
/* import store from "./Redux/store"; */
import LandingP from './Components/LandingP.jsx'
import Home from './Components/Home.jsx'
import Detail from './Components/Detail.jsx'
import RecipeCreate from './Components/RecipeCreate.jsx'
import Modal from './Components/Modal';
function App() {
 const store = generateStore();
  return (
    <Provider store={store}>
      <div className="App">
     <Routes>
      <Route path ="/"element ={<LandingP/>}/> 
      <Route path="/Home"element ={<Home/>}/>
      <Route path="/recipe"element={<RecipeCreate/>}/>
      <Route exact path="/recipes/:id" element={<Detail/>}/>
      <Route exact path="/recipes/update" element={<Modal/>}/>
     </Routes>
      </div>
    </Provider>
  );
}

export default App;
