import React from "react";
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector,  } from "react-redux";
import { getDetail } from "../Redux/actions";
import { useEffect , useState } from "react";

import styles from './Detail.module.css';
import Modal from "./Modal";

export default function Detail(){
  const {id} = useParams()
  
  const dispatch = useDispatch() 
  
  const detailstate = useSelector((state) => state.details)
  useEffect (() => { 
     dispatch(getDetail(id))},[detailstate]) 
     
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
                  <div className = {styles.divisionBar}>

                  </div>

                  <div className={styles.column}>
                     
                     {<img src={detailstate[0].image} alt = 'image' className = {styles.img}/>}
                    
                     <h1 className = {styles.h1}>
                     Diets: {
                     detailstate[0].diets.map(e => <li className={styles.text}>{Object.values(e)}</li>)}
                     </h1>
                     <h1 className = {styles.h1}>
                     Health Level:
                     <li className={styles.text}>{detailstate[0].healthScore}</li>
                     </h1>
                     <h1 className = {styles.h1}>
                     Ingredients: {
                        detailstate[0].steps.map(e => e.ingredients.map(e => 
                        <li className={styles.text}>{e.name}</li>))}
                     </h1>
                     <br />
                     <div className={styles.h1}>

                     <Link to='/home'><button className = {styles.boton}>Back to Home </button> </Link>
                     </div>
                   </div>     
         <div className={styles.column}>

      </div>
         </div>
       </div> : 
       
       <div> 
         <h2> loading... </h2> </div>
      }              
      
   </article>)}