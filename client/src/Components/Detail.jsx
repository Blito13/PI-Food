import React from "react";
import { Link, useParams , useNavigate} from 'react-router-dom';
import { useDispatch, useSelector,  } from "react-redux";
import { getDetail ,resetDet , onDelete } from "../Redux/actions";
import { useEffect } from "react";
import Modal from "./Modal";
import { Fragment } from "react";

import styles from './Detail.module.css';
import { useState } from "react";


export default function Detail(){
   

   
   const dispatch = useDispatch();
   const navigate= useNavigate();
   const {id} = useParams()
   
   
   const detailstate = useSelector((state) => state.details);
   const [isOpen, setIsOpen] = useState(false);
   console.log(detailstate)
   useEffect ( () => {
      
     /*  dispatch(resetDet()) */
      dispatch(getDetail(id));
      return () =>  dispatch(resetDet())
   }
   
   
   ,[])    

   const deleteRec = () => {
      let respuesta = window.confirm("are you sure ?")
      if(respuesta === true ){
         dispatch(onDelete(id));
         navigate('/home');
      }
     
   }

   return(
   <div>
      <article  >

      
         {detailstate.length > 0 ? 
         
         <div className = {styles.container}> 
           <div  className = {styles.container}>
           
                  <div className={styles.column}>
                     <h1 className = {styles.h1}> {detailstate[0].name} 
                     </h1>
                     <p className = {styles.text}>{(detailstate[0].summary).replace(/<[^>]+>/g, '')}</p>
                     <h3 className = {styles.h1}>
                     Steps:
                     </h3>
                             {detailstate[0].steps?.map(e=> 
                              <li className = {styles.h5}>
                              {e.step}
                              </li> )} 
                     </div>
                     <div className = {styles.divisionBar}></div>

                     <div className={styles.column}>
                     
                     {<img src={detailstate[0].image} alt = 'fot' className = {styles.img}/>}
                    
                     <h1 className = {styles.h1}>
                     Diets: {
                     detailstate[0].diets.map(e => <li className={styles.text} key={"p" +e.name}>{Object.values(e)}</li>)}
                     </h1>
                     <h1 className = {styles.h1}>
                     Health Level:
                     <li className={styles.text}>{detailstate[0].healthScore}</li>
                     </h1>
                     <h1 className = {styles.h1}>
                     Ingredients: {/* { 
                        detailstate[0].steps.map(e => e.ingredients.map(e => 
                        <li className={styles.text} key = {e.name}>{e.name}</li>))} */}
                     </h1>
                     <br />
                     <div className={styles.h1}>

                     <Link to='/home'><button className = {styles.boton} >Back to Home </button></Link>
                  
                     {
                        detailstate[0].createdINBd?
                        <button className = {styles.boton} onClick={() => setIsOpen(true)}>Update</button>
                       
                         :
                        null
                        
                     }
                     {detailstate[0].createdINBd?
                         <button className = {styles.boton} onClick= {(e )=> deleteRec(e)}>Delete Recipe</button> :
                         null
                     }
                     </div>
                    { isOpen &&
                    <Fragment>
                        <Modal 
                             className={styles.check} 
                             setIsOpen={setIsOpen}/>
                             
                    </Fragment> 
                    }
                   </div>     
          </div>
          <div>
    

          </div>
         </div> :
       
       <div className={styles.divLoading}>
       <img src="https://thumbs.gfycat.com/PepperyMediumBrahmancow-size_restricted.gif" />
     </div> 
        }          
   </article>
</div>
   )}
