import React from "react";
import {Link} from 'react-router-dom'
import estilos from './LandingP.module.css' 

console.log(process.env.REACT_APP_BE_URL)
export default function LandingPage(){
   
    return(
        <div className={estilos.contenedor}>
            <h1 className={estilos.titulo}>Recipedia</h1>
            <Link to = '/home'>
                <button className={estilos.boton}>Home</button>
            </Link>
        </div>
    )
}