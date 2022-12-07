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
        
       /*  console.log(JSON.stringify(input1)) */
        dispatch(getTypes());
        /* return () => setIsOpen(false) */
        
    }, []); //eslint-disable-line
    
    const diets = useSelector((state)=> state.types)
    const details = useSelector((state)=> state.details)
    
    const [error, setError] = useState({})
    const [numberStep , setNumber] = useState(1)
    const [positionStep , setPositionStep]  =  useState(0)
    const [step , setStep] = useState([])
    const [stepToShow , setstepToShow] = useState([])
    const [stepEdited , setStepEdited] = useState([])
    const [input1 ,setInput1]= useState(details[0])//las diets vienen de otra forma aca
    const [dietsInput , setDietsInput] = useState( details.length > 0 ? details[0].diets.map(e => e.name): null)
    console.log(diets ,dietsInput)
    
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
        console.log(input1)
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
  
    function handleSelect  (e ,i) {
        
        var {defaultChecked , checked , value , name} = e.target;
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
     const handleUpdate = (e) => {
        var {defaultChecked , checked , value , name} = e.target;
        if(checked === false ){    
            setInput1({
                ...input1, 
                diets : [...input1.diets.filter(e => e.name !== value)]
            })
            
        } else {
            setInput1({
                ...input1,
                diets:[...input1.diets ,{ name : value}] 
            })
        } 
     }
     
    const showStep = (e) => {
       var {name , value  } = e.target;
    
       setstepToShow(Object.values(input1.steps[value]))
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
        setInput1(...input1.steps[positionStep] = {step : stepToShow})

           /* input1.steps[positionStep] = {step :stepToShow} */
       
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
      
       if(details.length>0){
        /* const leg = input1.diets.map(e => e.name)
       input1.diets = leg
        && */ dispatch(putRec(input1))
       
       }else {
        dispatch(postRecipe(input))
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
                                <p>URL image: </p>
                                <input
                                type= 'url'
                                value={input1 ? input1.image:input.image}
                                name='image'
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
                               { input1?
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
                                                onClick = {(e)=> handleStep(e)}
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
                                      
                                        id={e.name + i} 
                                        name={e.name}
                                        onChange= {input1 ? (e)=> handleUpdate(e) :(e)=>handleSelect(e)}
                                        defaultChecked = {input1?  dietsInput.includes(e.name) ? true : false : null}
                                       
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