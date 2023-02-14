import React, { Fragment } from "react";
import { useEffect, useState  , useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import { getRecipes, orderByName, orderByScore, filterByTypes, getTypes } from "../Redux/actions";
import {Link} from "react-router-dom";
import Card from "../Components/Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import estilos from './Home.module.css';
import Modal from "./Modal";
import RecipeCreate from "./RecipeCreate";
let PageSize = 9;
export default function Home(){
    const dispatch = useDispatch();
    useEffect(()=>{
       
        dispatch(getRecipes());
        dispatch(getTypes());
       
    },[dispatch]) 
    const allRecipes = useSelector((state)=> state.recipes)
    const types = useSelector(state=> state.types)
    const [currentPage, setCurrentPage] = useState(1);
    const currentTableData = useMemo(() => {
      const firstPageIndex = (currentPage -1) * PageSize;
      const lastPageIndex = firstPageIndex + PageSize;
      return  allRecipes.slice(firstPageIndex, lastPageIndex);
      
    }, [currentPage , allRecipes]);
    const [orden, setOrden] = useState('') 
    const [orden1, setOrden1] = useState('') 
    const [isOpen, setIsOpen] = useState(false);
    console.log(currentTableData)
   
   /*  function afterOpenModal() {
       
      } */


    /* const paginado = (number) =>{ 
        if(number > 12){
            number = 12
        }
        else if (
            number <1
        ) { number = 1

        } else {

            setCurrentPage(number)
        }
       
    } */



    function handleFilterTypes(e){
        e.preventDefault();
        dispatch(filterByTypes(e.target.value))
       /*  paginado(1); */
    }

    function handleSort(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        /* setCurrentPage(1); */
        setOrden(`ordenado ${e.target.value}`)
        
    }

    function handleScore(e){
        e.preventDefault();
        dispatch(orderByScore(e.target.value))
       /*  setCurrentPage(1); */
        setOrden1(`ordenado ${e.target.value}`)
    }
    
   console.log(allRecipes)
    return(
        <div className={estilos.contenedor}>
                      
                <div className={estilos.check}>
                 <button className={estilos.primaryBtn} onClick={() => setIsOpen(true)}>
                Create!
                </button>
                    {isOpen &&
                    <Fragment>
                        <Modal 
                             className={estilos.check} 
                             setIsOpen={setIsOpen} />
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
                <SearchBar className={estilos.boton1}/>
                <div className={estilos.card}>                         
                {currentTableData.map((el)=>{ //slice(0.9)
                    return(                   
                            <Link className={estilos.tyty} to={`/recipes/${el.id}`} key={'p'+el.id}>
                            <Card id={el.id} img={el.image}  key = {el.name} name={el.name} /* Diet={el.Diets} */  diets={el.diets} /* healtScore = {el.healthScore} */ >
                            </Card>
                            </Link>   
                                              
                    )})                               
                }
                            </div>
                            <div>
                                
                            <Paginado
                                className={estilos.pagination}
                                currentPage={currentPage}
                                totalCount={allRecipes.length}
                                pageSize={PageSize}
                                onPageChange={page => setCurrentPage(page)}
                                    />
                             </div>
                
            </div>
            </div>
    )
}     
