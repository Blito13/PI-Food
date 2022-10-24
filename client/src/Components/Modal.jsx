import React from "react";
import estilos from './Modal.module.css'
import { RiCloseLine } from "react-icons/ri";
import { useState, useEffect } from "react";
import { Link} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {postRecipe, getTypes ,putRec} from '../Redux/actions'






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
const Modal = ({ setIsOpen ,recipe }) => {
    const dispatch= useDispatch();          
    console.log(recipe)
    useEffect(()=>{
   
        dispatch(getTypes());
        return () => setIsOpen(false) && alert("reset")
        
    }, []); //eslint-disable-line
   
    const diets = useSelector((state)=> state.types)
    const details = useSelector((state)=> state.details)
console.log(details)
    const [error, setError] = useState({})
    const [numberStep , setNumber] = useState(1)
    const [step , setStep] = useState([])
    const [input1 ,setInput1]= useState(details[0])
    console.log(input1)
    const [input, setInput] = useState({
        name: '',
        summary:'',
        score:0,
        healthScore:0,
        steps:[],
        image:'',
        diets:[],
    })

    function handleChange(e){
        
        setInput({
            ...input,
            [e.target.name] : e.target.value

        })
        console.log(input)
        setError(validate({
            
            ...input,
            [e.target.name] : e.target.value
        }));
    }
    
    function handleSelect  (e) {
        const {checked , value} = e.target
        if(checked === false || input.diets.includes(value) === true){
            setInput({
                ...input,
                diets : [...input.diets.filter(d=> d !== value)] 
             })
            } else {
                setInput({
                    ...input,
                    diets:[...input.diets , value]
                })
                console.log(input.diets)
           
             }
    } 


    function handleChangeStep(e){
 
    const {name , value } = e.target ; 
    setStep(value)  
    }
    function handleStep (e) {
        e.preventDefault()
        setInput({
            ...input,
            steps :[...input.steps ,{step}]
        })
        setNumber(numberStep+1)
        setStep('')
        console.log(input)
    }
    function handleSubmit(e){
        console.log(input)
        /* si tengo detail input es igual a input 1 */
        details.length > 0 &&  dispatch(putRec(input1))
        console.log(input1)
       /*  input.length > 0 &&
        dispatch(postRecipe(input)) 
        console.log(input1)        */
        setInput({
        name: '',
        summary:'',
        score:0,
        healthScore:0,
        steps:[],
        image:'',
        diets:[],
        })
    } 
return (
    <>
     <div className={estilos.darkBG} onClick={() => setIsOpen(false)} />
        <div className={estilos.centered}>
            <div className={estilos.modal}>
                <button className={estilos.closeBtn} onClick={() => setIsOpen(false)}>
                <RiCloseLine style={{ marginBottom: "-3px" }} />
                </button>
                    <div className={estilos.modalContent}>
                
                        <form onSubmit={(e)=> handleSubmit(e)} /* className={estilos.modalContent}  *//* className={estilos.form} */>
                        <div>
                        <h1 /* className={estilos.h1} */>Be Creative</h1>
                        <p /* className={estilos.p} */>Name: </p>
                        <input
                        type='text'
                        value={details?details[0].name:input.name}
                        name='name'
                                onChange={(e)=>handleChange(e)}
                                />                    
                                {error.name && <p /* className={estilos.error} */>{error.name}</p>}
                            </div>
                            <div>
                                <p className={estilos.p}>Summary: </p>
                                <textarea
                                type='text'
                                value={details?details[0].summary:input.summary}
                                name= 'summary'
                                onChange={(e)=>handleChange(e)}
                                />
                                {error.summary && <p /* className={estilos.error} */>{error.summary}</p>}
                            </div>
                            <div>
                                <p /* className={estilos.p} */>Score: </p>
                                <input
                                type= 'number'
                                value={details?details[0].score:input.score}
                                name='score'
                                onChange={(e)=> handleChange(e)}/>
                                {error.score && <p /* className={estilos.error} */>{error.score}</p>}
                            </div>
                            <div>
                                <p /* className={estilos.p} */>Health Score: </p>
                                <input
                                type= 'number'
                                value={details?details[0].healthScore:input.healthScore}
                                name='healthScore'
                                onChange={(e)=> handleChange(e)}/>
                            </div>
                            <div >
                                <p className={estilos.p}>Steps: </p>
                                <textarea  /* className={estilos.textarea} */
                                type='textarea'
                                value={details?details[0].steps.map((e)=> e.step):step}
                                name='steps'
                                onChange={(e) =>handleChangeStep(e)}/>     
                               <button type = "button" className={estilos.boton1} onClick={(e) =>handleStep(e)}>step{`${numberStep}`}</button>

                            <div className={estilos.selecDiets}>
                                {diets.map (e => (
                                    <div className={estilos.listo}>
                                        <input
                                        className = {estilos.checks} 
                                        value={e.name} 
                                        
                                        onChange= {e=>handleSelect(e)}
                                        type="checkbox" />
                                        {e.name}
                                </div> ))}                           
                                    <button className={estilos.deleteBtn} >
                                        Create</button>  
                                    </div>  
                                    </div>        
                </form>
                </div>
                <div className={estilos.modalActions}>
                <div className={estilos.actionsContainer}>
                </div>
            </div>
            </div>
        </div>
    </>
)
}
export default Modal