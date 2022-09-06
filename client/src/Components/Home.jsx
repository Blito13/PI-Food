import React, { Fragment } from "react";
import { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import { getRecipes, orderByName, orderByScore, filterByTypes, getTypes } from "../Redux/actions";
import {Link} from "react-router-dom";
import Card from "../Components/Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import estilos from './Home.module.css';

import Modal from "./Modal";
import RecipeCreate from "./RecipeCreate";

export default function Home(){
    const dispatch = useDispatch();
    const allRecipes = useSelector((state)=> state.recipes)
    const [currentPage, setCurrentPage] = useState(1)
    const [recipesPerPage, setRecipesPerPage]= useState(9) 
    const indexOfLastRecipe = currentPage * recipesPerPage 
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage 
    const currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe) 
    const [orden, setOrden] = useState('') 
    const [orden1, setOrden1] = useState('') 
    const [isOpen, setIsOpen] = useState(false);
    console.log(allRecipes)
    /* const [modalIsOpen, setIsOpen] = useState(false); */
    function afterOpenModal() {
        console.log("transa")
      }
    function openModal() {
      setIsOpen(true);
    }
    function closeModal() {
      setIsOpen(false);
    }

    const paginado = (number) =>{ 
        setCurrentPage(number)
       
    }
    console.log(currentPage)
    useEffect((e)=>{
       
        dispatch(getRecipes());
        dispatch(getTypes());
    },[dispatch]) 

    const types = useSelector(state=> state.types)

    function handleFilterTypes(e){
        e.preventDefault();
        dispatch(filterByTypes(e.target.value))
        paginado(1);
    }

    function handleSort(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setCurrentPage(1);
        setOrden(`ordenado ${e.target.value}`)
        
    }

    function handleScore(e){
        e.preventDefault();
        dispatch(orderByScore(e.target.value))
        setCurrentPage(1);
        setOrden1(`ordenado ${e.target.value}`)
    }
    /* function handleHealthScore(e){
        e.preventDefault();
        dispatch(orderByhealthScore(e.target.value))
        setCurrentPage(1);
        setOrden1(`ordenado ${e.target.value}`)
    } */
   
    return(
        <div className={estilos.contenedor}>
         {/*    <Link to= '/recipe' className={estilos.recipeCreate}><button className={estilos.boton1}>Create Recipe</button></Link>
            <h1 className={estilos.h1}>Recipes</h1>    */}                    
            <div className={estilos.check}>
            <button className={estilos.primaryBtn} onClick={() => setIsOpen(true)}>
             Open Modal
            </button>
        {isOpen &&<Fragment>
            <div className={estilos.check}>

          <Modal className={estilos.check} setIsOpen={setIsOpen} />
            </div>
          
      </Fragment> 
          }
    </div>
            <div>            
            <select onChange={e=>handleSort(e)} className={estilos.select}>
                <option value='asc'>A to Z</option>
                <option value='desc'>Z to A</option>
            </select>              
            <select onChange={e=>handleFilterTypes(e)} className={estilos.select}> 
                <option value='All'>All Diets</option>
                {types?.map(diet=> <option value={diet.name} key={diet.name}>{diet.name}</option> )}                                    
            </select> 
            <select onChange={e=> handleScore(e)} className={estilos.select}>
                <option value='high'>High Score</option>
                <option value='low'>Low Score</option>                 
            </select>
           {/*  <select onChange={e=> handleHealthScore(e)} className={estilos.select}>
                <option value='highHealthScore'>High Healt Score</option>
                <option value='lowHealtScore'>Low Score</option>                 
            </select> */}
            <div >
           
                {/* <Modal
               
                  isOpen={modalIsOpen}
                  onRequestClose={closeModal}
                  contentLabel="Example Modal"
                  onAfterOpen={afterOpenModal}
                >
                  <button onClick={closeModal}>close</button>
                  <div>I am a modal</div>
                  <div>
                   <RecipeCreate
                   ></RecipeCreate>
                  </div>
                </Modal>
{/* 
            <Modal >
                <RecipeCreate></RecipeCreate>
            </Modal> */} 
            </div>
            
            <SearchBar className={estilos.boton1}/>
            
            <div className={estilos.card}>                         
                {currentRecipes?.map((el)=>{ //slice(0.9)
                    return( 
                        <Fragment>                      
                            <Link className={estilos.tyty} to={`/recipes/${el.id}`} key={'l' + el.id}>
                            <Card key={el.id} id={el.id} img={el.image} name={el.name} /* Diet={el.Diets} */  diets={el.diets} /* healtScore = {el.healthScore} */>
                            </Card>
                                </Link>   
                            </Fragment>                         
                    )})                               
                }
                </div>
            <div>
            <Paginado key= {1} recipesPerPage={recipesPerPage} allRecipes={allRecipes.length} paginado={paginado} currentPage = {currentPage}/>
            </div>
                
            </div>
        </div>
    )
}     
