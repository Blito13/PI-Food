import React from "react";
import estilos from './Card.module.css'

export default function Card({img, name, diets ,Diet}){
    return(
        <div className={estilos.contenedor}>
            <h2 className={estilos.titulo}>{name}</h2>
            {diets?
            diets.map(e=> <h4 className={estilos.h4} key={e}>{e}</h4>):
            Diet.map(e => <h1 classNAme = {estilos.h4}key ={e.name}>{e.name}</h1>)}
            <img className={estilos.img}src= {img} alt='img'></img>                        
            
        </div>
    );
}