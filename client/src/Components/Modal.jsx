import React from "react";
import estilos from './Modal.module.css'
import { RiCloseLine } from "react-icons/ri";
import { useState, useEffect } from "react";
import { Link} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {postRecipe, getTypes} from '../Redux/actions'




console.log ("elmerre")

function validate (input){
    let error= {};
    if(!input.name){
        error.name = 'Name is required';
    }else if(!input.summary){
        error.summary = 'Summary is required';
    }else if(input.score < 0 || input.score > 10){
        error.score = 'The Score has to be lower or equal than 10'
    }
    return error;
}
const Modal = ({ setIsOpen }) => {
    const dispatch= useDispatch();          
    
    useEffect(()=>{
        dispatch(getTypes());
    }, []); //eslint-disable-line
    console.log("elemrre")
    const diets = useSelector((state)=> state.types)

    const [error, setError] = useState({})

    const [input, setInput] = useState({
        name: '',
        summary:'',
        score:0,
        healthScore:0,
        steps:'',
        image:'',
        diets:[],
    })

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value

        })
        setError(validate({
            ...input,
            [e.target.name] : e.target.value
        }));
    }

    function handleSelect(e){
        setInput({
            ...input,
            diets:[...input.diets, e.target.value]
        })
    } 
    function handleDelete(e){
        setInput({
            ...input,
            diets: input.diets.filter(d=> d !== e)
        }) 
     }  
console.log(input)
    function handleSubmit(e){
        e.preventDefault();
        console.log(input)
        dispatch(postRecipe(input))        
        setInput({
        name: '',
        summary:'',
        score:0,
        healthScore:0,
        steps:'',
        image:'',
        diets:[],
        })
    }   
    console.log(input.diets)
return (
    <>
     <div className={estilos.darkBG} onClick={() => setIsOpen(false)} />
        <div className={estilos.centered}>
            <div className={estilos.modal}>
                <button className={estilos.closeBtn} onClick={() => setIsOpen(false)}>
                <RiCloseLine style={{ marginBottom: "-3px" }} />
                </button>
                <div className={estilos.modalContent}>
                
                <form onSubmit={(e)=> handleSubmit(e)} className={estilos.form}>
                <div>
                    <h1 className={estilos.h1}>Be Creative</h1>
                    <p className={estilos.p}>Name: </p>
                    <input
                    type='text'
                    value={input.name}
                    name='name'
                    onChange={(e)=>handleChange(e)}
                    />                    
                    {error.name && <p className={estilos.error}>{error.name}</p>}
                </div>
                <div>
                    <p className={estilos.p}>Summary: </p>
                    <textarea
                    type='text'
                    value={input.summary}
                    name= 'summary'
                    onChange={(e)=>handleChange(e)}
                    />
                    {error.summary && <p className={estilos.error}>{error.summary}</p>}
                </div>
                <div>
                    <p className={estilos.p}>Score: </p>
                    <input
                    type= 'number'
                    value={input.score}
                    name='score'
                    onChange={(e)=> handleChange(e)}/>
                    {error.score && <p className={estilos.error}>{error.score}</p>}
                </div>
                <div>
                    <p className={estilos.p}>Health Score: </p>
                    <input
                    type= 'number'
                    value={input.healthScore}
                    name='healthScore'
                    onChange={(e)=> handleChange(e)}/>
                </div>
                <div>
                    <p className={estilos.p}>Steps: </p>
                    <textarea className={estilos.textarea}
                    type='textarea'
                    value={input.steps}
                    name='steps'
                    onChange={(e)=> handleChange(e)}/>                    
                    </div>
                    <div >
                    {diets?diets.map (e => (
                    <p className={estilos.diets}>
                        
                        <input className = {estilos.checks} type="checkbox" />
                        <li className = {estilos.lista}>
                        {e.name}
                    
                        </li>
                    
                    </p>
                        
                    )):null}                           

                    </div>
                    <br></br>
                    {input.diets.map(el=>
                    <div>
                        <p className={estilos.diets}>{el}</p>                        
                        <button className={estilos.botonx} onClick={(e)=> handleDelete(e)}>x</button>
                    </div>)}                   
                    <br></br>
              <button className={estilos.boton2}>Create</button>  
                </form>
                </div>
                <div className={estilos.modalActions}>
                <div className={estilos.actionsContainer}>
              <button className={estilos.deleteBtn} onClick={() => setIsOpen(false)}>
                Delete
              </button>
              <button
                className={estilos.cancelBtn}
                onClick={() => setIsOpen(false)}>
                Cancel
                </button>
                </div>
            </div>
            </div>
        </div>
    </>
)
}
export default Modal