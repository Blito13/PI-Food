import React from "react";
import estilos from './Card.module.css'
import {useState } from "react";
import { Link } from "react-router-dom";
 function Card({img, name, diets , id}){

   
   
    return(
       <div  className={estilos.flip}>
        <div className={estilos.flip1}>
        <h2 className={estilos.titulo}>{name}</h2>
        <img className={estilos.img}src= {img} alt='img'></img>
        </div>
        <div className={estilos.flip2}>
        {
        diets?.map(e=> <h2 className={estilos.h4} key = {"9"+id}>{Object.values(e)}</h2>)
        }
        </div>
       </div>
    );
}
export default Card