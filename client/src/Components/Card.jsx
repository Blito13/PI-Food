import React from "react";
import estilos from './Card.module.css'
import { useEffect, useState } from "react";
import Modal from "./Modal";
import { Link } from "react-router-dom";
export default function Card({img, name, diets , id}){
   console.log(id)
   const [diet ,setDiet] = useState([])
   const mostrar = (e) => {
    
    e.preventDefault()
    setDiet(diets)
}
    const ocultar = (e) =>{
        setDiet(null)
    }
    return(
        <div className={estilos.contenedor} onMouseLeave = {e => ocultar(e)}>
            <h2 className={estilos.titulo} onMouseMove= {e =>mostrar(e)}>{name}</h2>
            {/* <Link className={estilos.titulo} to={`/recipes/${id}`} key={'l' + id}></Link> */}   
            {diet?.map(e=> <h2 className={estilos.h4} key={e.name}>{Object.values(e)}</h2>)}
            <img className={estilos.img}src= {img} alt='img'>
                
                </img>                        
            
                <div>

                </div>
        </div>
    );
}