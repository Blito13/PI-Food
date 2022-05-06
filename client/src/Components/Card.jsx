import React from "react";
import estilos from './Card.module.css'

export default function Card({img, name, diets}){
    console.log(diets)
    return(
        <div className={estilos.contenedor}>
            <h2 className={estilos.titulo}>{name}</h2>
            {diets?.map(e=> <h1 className={estilos.h4} key={e.name}>{Object.values(e)}</h1>)}
            <img className={estilos.img}src= {img} alt='img'></img>                        
            
        </div>
    );
}