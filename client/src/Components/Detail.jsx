import React from "react";
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector,  } from "react-redux";
import { getDetail ,resetDet } from "../Redux/actions";
import { useEffect } from "react";
import Modal from "./Modal";
import { Fragment } from "react";

import styles from './Detail.module.css';
import { useState } from "react";


export default function Detail(){
   

   
   const dispatch = useDispatch() 
   const {id} = useParams()
   
   
<<<<<<< HEAD
   const detailstate = useSelector((state) => state.details)
   const [isOpen, setIsOpen] = useState(false);
   
   

=======
   const detailstate = useSelector((state) => state.details);
   const [isOpen, setIsOpen] = useState(false);
>>>>>>> 40ac36280b9dd645a605c52a6bc05e6aa1069936
   console.log(detailstate)
   useEffect ( () => {
      
     /*  dispatch(resetDet()) */
      dispatch(getDetail(id));
      return () =>  dispatch(resetDet())
   }
   
   
   ,[])    

   return(
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
                             {detailstate[0].steps.map(e=> 
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
<<<<<<< HEAD
{/*                      Ingredients: { 
=======
                     Ingredients: {/* { 
>>>>>>> 40ac36280b9dd645a605c52a6bc05e6aa1069936
                        detailstate[0].steps.map(e => e.ingredients.map(e => 
                        <li className={styles.text} key = {e.name}>{e.name}</li>))} */}
                     </h1>
                     <br />
                     <div className={styles.h1}>

<<<<<<< HEAD
                     <Link to='/home'><button className = {styles.boton} >Back to Home </button> </Link>
                     <Link to='/recipes/update'><button className = {styles.boton}>Update </button> </Link>
                     <button className = {styles.boton} >Delete </button>
=======
                     <Link to='/home'><button className = {styles.boton} >Back to Home </button></Link>
                     <button className = {styles.boton} onClick={() => setIsOpen(true)}>Update</button>
                  
                     
                     <button className = {styles.boton}>Update</button>
>>>>>>> 40ac36280b9dd645a605c52a6bc05e6aa1069936
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
          {isOpen &&
         <Fragment>
             <Modal 
                  className={estilos.check} 
                  setIsOpen={setIsOpen} />
         </Fragment> 
         }

          </div>
         </div> :
       
       <div className={styles.divLoading}>
       <img src="https://thumbs.gfycat.com/PepperyMediumBrahmancow-size_restricted.gif" />
     </div> 
        }          
      
   </article>)}