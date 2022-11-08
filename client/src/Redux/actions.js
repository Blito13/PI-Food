import axios from 'axios';

export const GET_ALL_REC = 'GET_ALL_REC'
export const FILTER_REC =  'FILTER_REC'
export const ORDER_NAME = 'ORDER_NAME'
export const GET_NAME_RECIPE = 'GET_NAME_RECIPE'
export const GET_TYPES = 'GET_TYPES'
export const POST_REC = 'POST_REC'
export const ORDER_SCORE = 'ORDER_SCORE'
export const GET_DETAILS = 'GET_DETAILS'
export const ORDER_HEALTH = 'SORDER_HEALTHY'
export const RESET_DETAILS = 'RESET_DETAILS'
export const GET_DB_DETAILS = 'GET_DB_DETAILS'

export function getRecipes (){
return async function (dispatch){
    var json =  await axios.get('http://localhost:3001/recipes',{});
    
    return dispatch({
    type : 'GET_ALL_REC', 
    payload :json.data,   
    })
};

}

export function getNameRecipes (name){ //concatenamos lo que ingresemos en el input como nombre para buscar recetas
    return async function (dispatch){
        try{
            let json = await axios.get(`http://localhost:3001/recipes?name=${name}`)
            return dispatch({
                type : 'GET_NAME_RECIPE',
                payload : json.data
            })
            
        }catch(error){
        console.log(error)}
    }
}
export function filterByTypes (payload){
    return{
        type: 'FILTER_REC',
        payload 
    }
    
}
export function orderByhealthScore(payload){
    return{
        type : 'SORDER_HEALTHY',
        payload
    }
}
export function orderByName (payload){
    return{
        type: 'ORDER_NAME',
        payload
    }
    
}
export function orderByScore(payload){
    return {
        type: 'ORDER_SCORE',
        payload
    }
    
}
export function getTypes(){
    return async function (dispatch){
        let json = await axios.get('http://localhost:3001/diets')
        return dispatch({
            type: 'GET_TYPES',
            payload : json.data
        })
    }
    
}
export function postRecipe (payload){
    return async function(dispatch){
        try{

            var json = await axios.post("http://localhost:3001/recipes",payload)
            console.log(json)
            return dispatch({json});
        }catch (error){
            console.log(error)
        }
    } 
    
}
export function getDetail(id){

    return async function(dispatch){
        try{
            var json = await axios.get(`http://localhost:3001/recipes/${id}`);
        
        return dispatch( {
            type : "GET_DETAILS",
            payload: json.data
        })
        }catch(error){
            
        }
    }
}
export function resetDet(){

    return async function(dispatch){
        try{
           
        return dispatch( {
            type : "RESET_DETAILS",
            payload: []
        })
        }catch(error){
            console.log(error)
        }
    }
}

export function putRec (payload){
    console.log(payload)
    return async function (dispatch){
        try{
            var update = await axios.put('http://localhost:3001/recipes/uppdate',payload)
            console.log(update)
            return dispatch({update})
        }catch(error){
            console.log(error)
        }
    }
}

