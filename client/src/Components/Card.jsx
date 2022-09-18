import React from "react";
import estilos from './Card.module.css'
import {useState } from "react";
import { Link } from "react-router-dom";
 function Card({img, name, diets , id}){

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
            <h2 className={estilos.titulo} onMouseMove= {e =>mostrar(e)} >{name}</h2>
            {diet?.map(e=> <h2 className={estilos.h4} /* key={id} */>{Object.values(e)}</h2>)}
                
          {/*   <Link className={estilos.titulo} to={`/recipes/${id}`} key={id}> */}

            <img className={estilos.img}src= {img} alt='img'>

                </img>                        
             {/* </Link>   */}
            
                <div>

                </div>
        </div>
    );
}
export default Card