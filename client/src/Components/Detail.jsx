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
  
  useEffect (() => { 
  dispatch(getDetail(id))} ,[id , dispatch]) 
  const detailstate = useSelector((state) => state.details)
  
  return(

   <div  className = {styles.back}>

     {detailstate.length > 0 ?
         <div className = {styles.container}> 
           <div  className = {styles.container}>
              <div className = {styles.h1}>
               <div className={styles.upText}>
                     
                     {<img src={detailstate[0].image} alt = 'image' className = {styles.img}/>}
                    
                     <h1 className = {styles.h5}>
                     Diets: {
                     detailstate[0].diets.map(e => <li className={styles.die}>{Object.values(e)}</li>)}
                     </h1>
                     <h1 className = {styles.h5}>
                     Health Level:
                     <li>{detailstate[0].healthScore}</li>
                     </h1>

                     <h1 className = {styles.h5}>
                     Ingredients: {
                            detailstate[0].steps.map(e => e.ingredients.map(e => <li>{e.name}</li>))}
                     </h1>
                    
                     
               </div>
               
                     <h1 className = {styles.h1}> {detailstate[0].name} 
                     </h1>
                     <h3 className = {styles.h3}>
                        </h3>
                        <article className = {styles.text}>{(detailstate[0].summary).replace(/<[^>]+>/g, '')}</article>
                  
                        <h3 className = {styles.h5}>
                           Steps:
                              </h3>
                           <p className = {styles.h5}>
                              {detailstate[0].steps.map(e=> 
                              <li>
                              {e.step}
                              </li> )}</p>
                        <Link to='/home'><button className = {styles.boton}>Back to Home </button> </Link>
                  </div>
                  </div>
          
       </div> : 
       
       <div> <h2> loading... </h2> </div>
      }
     </div>)}