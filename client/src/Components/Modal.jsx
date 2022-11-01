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
const Modal = ({ setIsOpen  }) => {
    const dispatch= useDispatch();          
    
    useEffect(()=>{
        /* setSelected(); */
        dispatch(getTypes());
        return () => setIsOpen(false) && alert("reset")
        
    }, []); //eslint-disable-line
   
    const diets = useSelector((state)=> state.types)
    const details = useSelector((state)=> state.details)

    const [error, setError] = useState({})
    const [numberStep , setNumber] = useState(1)
    const [positionStep , setPositionStep]  =  useState(0)
    const [step , setStep] = useState([])
    const [stepToShow , setstepToShow] = useState([])
    const [stepEdited , setStepEdited] = useState([])
    const [input1 ,setInput1]= useState(details[0])
    const [dietsInput , setDietsInput] = useState(input1.diets.map(e => e.name))
   console.log(dietsInput)
    /* const [selectedItem ] */
    var [checkedState , setCheckedState] = useState(
        new Array(diets.length).fill(false)//null para que no se pisen con las otras
     )

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
        e.preventDefault();
        const {name , value }= e.target
   input1 ? 
        setInput1({
            ...input1,
            [name] : value
        }):
        setInput({
            ...input,
            [name] : value
        })
        console.log(input)
        setError(validate({
            
            ...input,
            [e.target.name] : e.target.value
        }));
    }
    const handleChancla =() =>{
        //crear un objeto de key y valor 
        const mySet =  new Set();//almacena valores unicos de un array
        const myMap = new Map();//es igual a un objeto
        diets.includes()
       
       /*  diets.map((e, i )=>{
            dietsInput[0].name?
            e.name !== dietsInput[i].name ? checkedState[i] = false :checkedState[i] = true


            : console.log("lacucaracha")
        }) */
 console.log(dietsInput[1].name)
    }
    function handleSelect  (e ,i) {
        var {checked , value , name} = e.target;
       /*  console.log(input1.diets.map(e=> e.name.includes(name))) */
      /*   console.log(i)
        console.log(input1.diets.map(e=>e.name)) */
        /* const grr =  diets.map((e , i ) => {}) */
       /* console.log(input1.diets.map(e => e.name.includes(value)? checked =true : checked = false)) */
       console.log(checked , value , i)
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
    const showStep = (e) => {
       var {name , value  } = e.target;
    
       setstepToShow(Object.values(input1.steps[value]));
       /* setStepEdited() */
       setPositionStep(value);
       console.log(positionStep)
    }
  

    function handleChangeStep(e){
 
    var {name , value } = e.target ; 
   /*  console.log(value) */
      input1?
      setstepToShow(value)
      :  
      setStep(value)  
      console.log(input)
      console.log(input1)
    
    }
    function handleStep (e) {
        e.preventDefault();
       
        input1? 
       
       input1.steps[positionStep] = {step :stepToShow}
        :
        setInput({
            ...input,
            steps :[...input.steps ,{step}]
        })
        setNumber(numberStep+1)
        setStep('')
        console.log(input1)
    }
    function handleSubmit(e){
       
        details.length > 0?dispatch(putRec(input1))
        : dispatch(postRecipe(input))
        console.log(input1 , input)
      
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
    /* handleChancla(); */
    /* console.log(diets) */
    /* setCheckedState() */
return (
    <>
     <div className={estilos.darkBG} onClick={() => setIsOpen(false)} />
        <div className={estilos.centered}>
            <div className={estilos.modal}>
                <button className={estilos.closeBtn} onClick={() => setIsOpen(false)}>
                <RiCloseLine style={{ marginBottom: "-3px" }} />
                </button>
                    <div className={estilos.modalContent}>
                
                        <form onSubmit={(e)=> handleSubmit(e)} >
                        <div>
                        <h1 >Be Creative</h1>
                        <p >Name: </p>
                        <input
                        type='text'
                        value={input1 ? input1.name : input.name}
                        name='name'
                        onChange={(e)=>handleChange(e)}
                                />                    
                                {error.name && <p >{error.name}</p>}
                            </div>
                            <div>
                                <p className={estilos.p}>Summary: </p>
                                <textarea
                                type='text'
                                value={input1? input1.summary:input.summary}
                                name= 'summary'
                                onChange={(e)=>handleChange(e)}
                                />
                                {error.summary && <p >{error.summary}</p>}
                            </div>
                            <div>
                                <p>Score: </p>
                                <input
                                type= 'text'
                                value={input1 ? input1.score:input.score}
                                name='score'
                                onChange={(e)=> handleChange(e)}/>
                                {error.score && <p >{error.score}</p>}
                            </div>
                            <div>
                                <p >Health Score: </p>
                                <input
                                type= 'number'
                                value={input1?input1.healthScore:input.healthScore} 
                                name='healthScore'
                                onChange={(e)=> handleChange(e)}/>
                            </div>
                            <div >
                                <p className={estilos.p}>Steps: </p>
                                <textarea 
                                type='textarea'
                                value={stepToShow.length > 0?stepToShow:step}
                                name='steps'
                                onChange={(e) =>handleChangeStep(e)}/>   
                                <div>

                                {input1?
                                input1.steps.map((e , i)=> <button
                                                 type = "button"
                                                 value ={i}
                                                 key={i} 
                                                 className={estilos.boton1} 
                                                 onClick={(e) =>showStep(e)}
                                                 >step{`${[i+1]}`}
                                                </button>
                                                ) 
                                                :<button 
                                                type = "button" 
                                                className={estilos.boton1} 
                                                onClick={(e) =>handleStep(e)}
                                                >step{`${numberStep}`}
                                                    </button>
                                                }
                                </div>
                                {input1? 
                                            <div>
                                                <button 
                                                key={1} 
                                                type = "button" 
                                                value={"ok"} 
                                                className={estilos.boton1} 
                                                /* onClick = {e=> handleStep(e)} */
                                                >Done
                                                </button> 
                                            </div> : 
                                            null
                                                 }
                                                
                            
                                
                               {/* {<button type = "button" className={estilos.boton1} onClick={(e) =>handleStep(e)}>step{`${numberStep}`}</button>} */}
                            </div> 
                            <div>
                                
                                
                            {
                            
                        
                            <div className={estilos.selecDiets}>
                                {diets.map ((e , i ) => (
                                    <div className={estilos.listo}>
                                        <input
                                        className = {estilos.checks} 
                                        value={e.name}
                                        key = {e.name +3}
                                        id={e.name + i} 
                                        name={e.name}
                                        onChange= {/* input1 ? e=> handleChancla(e, i) : */e=>handleSelect(e)}
                                        defaultChecked = {/* input1?checkedState[i] : null */ e.name === dietsInput[i] ? true : false}
                                       
                                        type="checkbox" />
                                        {e.name}
                                        </div> ))}  
                                                             
                                    <button className={estilos.deleteBtn} >
                                        Create</button>  
                                    </div>  
                        
                        }
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