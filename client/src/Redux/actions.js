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
            let yeison = await axios.get(`http://localhost:3001/recipes?name=${name}`)
            return dispatch({
                type : 'GET_NAME_RECIPE',
                payload : yeison.data
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
        let yeison = await axios.get('http://localhost:3001/diets')
        return dispatch({
            type: 'GET_TYPES',
            payload : yeison.data
        })
    }
    
}
export function postRecipe (payload){
    return async function(dispatch){
        try{

            var yeison = await axios.post("http://localhost:3001/recipe",payload)
            return yeison;
        }catch (error){
            console.log(error)
        console.log (yeison)
        }
    } 
    
}
export function getDetail(id){

    return async function(dispatch){
        try{
            var json = await axios.get(`http://localhost:3001/recipes/${id}`);
            console.log(json.data)
        return dispatch( {
            type : "GET_DETAILS",
            payload: json.data
        })
        }catch(error){
            console.log(json.data)
        }
    }
}
