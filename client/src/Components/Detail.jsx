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
    <div className = {styles.container}>

     {detailstate.length > 0 ?
          <div className = {styles.container}> 
          
        {/* <img src={detailstate[0].image} alt = 'dish' className = {styles.img}/> */}
            
           <div  className = {styles.conta}>
              <div className = {styles.span}>
           <h1 className = {styles.h5}>
            Diets: {
             detailstate[0].diets.map(e => <li className={styles.die}>{Object.values(e)}</li>)}</h1>

              <div className = {styles.span}>
           <h1 className = {styles.h5}>
              HealthLevel:
            
               <p>{detailstate[0].healthScore}</p>
            </h1>
              </div>
              <div className = {styles.span}>
           <h1 className = {styles.h5}>
            
          </h1>

              </div>

              </div>
           
            <br />


           </div>
          
           

           <div>
           <h1 className = {styles.h1}> {detailstate[0].name} 
           </h1>
           <h3 className = {styles.h5}>Summary:</h3>
           <p  className = {styles.h5}>{(detailstate[0].summary).replace(/<[^>]+>/g, '')}</p>
           </div>
 

           
           
           <br></br>
           <h3 className = {styles.h5}>Steps:</h3><p className = {styles.h5}>{detailstate[0].steps.map(e=> <li>


              {e.step}
           </li>
            )}
           
           </p>
           <div>

              {/*  {detailstate[0].steps.map(e => e.ingredients.map(e => <li>{e.name}</li>))} */}
               {detailstate[0].steps.map(e => e.ingredients.map(e => <img src = {e.image} alt = "fr"></img>))}
               
           </div>
           <Link to='/home'><button className = {styles.boton}>Back to Home </button> </Link>
       </div> : 
       
       <div> <h2> loading... </h2> </div>
      }
     </div>
         )
         
        }