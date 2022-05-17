import React from "react";
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../Redux/actions";
import { useEffect } from "react";
import styles from './Detail.module.css';

export default function Detail(){
  const {id} = useParams()
  console.log(useParams())
  const dispatch = useDispatch() 
  useEffect (() => {dispatch(getDetail(id))} ,[]) 
  const detailstate = useSelector((state) => state.details)
 /*  if(!detailstate){
    dispatch(getDetail(id))
  }
  console.log(detailstate)
 */
  return(
    <div>
     { 
       /* detailstate && detailstate  ?  */
       detailstate.length > 0 ? 
      
       <div className = {styles.container}> 
           <h1 className = {styles.h1}> {detailstate[0].name} </h1>
           <h1 className = {styles.h5}>Diets: {
             
             detailstate[0].diets.map(e => <h5>{Object.values(e)}</h5>)}</h1>
           <div className = {styles.innercontainer}>
           <h3 className = {styles.h5}>HealthLevel: {detailstate[0].healthScore}</h3>
           {<h3 className = {styles.h5}>Score: {detailstate[0].score}</h3>}
           </div>
           <h3 className = {styles.h5}>Summary:</h3>
           <p className = {styles.h5}><img src={detailstate[0].image} alt = 'dish' className = {styles.img}/>{(detailstate[0].summary).replace(/<[^>]+>/g, '')}</p>
           <h3 className = {styles.h5}>Steps:</h3><p className = {styles.h5}>{ Array.isArray(detailstate[0].steps) ? detailstate[0].steps.map(e => <li>{e.step}</li>) : detailstate[0].steps }</p>
           <Link to='/home'><button className = {styles.boton}>Back to Home </button> </Link>
       </div> : 
       
       <div> <h2> loading... </h2> </div>
      }
     </div>
         )
         
        }