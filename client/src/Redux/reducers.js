import{
    GET_ALL_REC ,
    GET_DETAILS ,
    GET_NAME_RECIPE ,
    GET_TYPES ,
    FILTER_REC ,
    ORDER_NAME ,
    ORDER_SCORE ,
    POST_REC,
    
}from './actions'

    const initialState = {
    allRecipes : [],
    recipes : [],
    details : [],
    types : [],
}







function rootR (state = initialState ,{payload ,type}){

 
    switch(type){
        case GET_ALL_REC :
            return{
                ...state,
                recipes : payload,
                allRecipes :payload
                
             
            }
        case FILTER_REC: 
            const allRecipes= state.allRecipes
            var fix =[]
            allRecipes.map((e)=>{
            let sol =e.diets.map((e)=>{
             if(typeof e === 'object'){
                return(e.name)
                } else{
                    return e
                    }
                    })
             return sol.includes(payload) ===true? 
                 fix.push(e):null})
                
            return{
                    ...state,
                    recipes:payload === 'All'? allRecipes: fix 
                }
        case ORDER_NAME : 
            let arrayOrd = payload === 'asc'?
            state.recipes.sort(function(a,b){
                if(a.name > b.name){
                    return 1;
                }
                if(b.name > a.name){
                    return -1
                }
                return 0
            }):
            state.recipes.sort(function (a , b){
                if(a.name > b.name){
                    return -1
                }if (b.name > a.name){
                    return 1
                }
                return 0;
            })
            return {
                ...state,
                recipes : arrayOrd
            }
        case ORDER_SCORE : 
       
        let puntaje =payload === 'low'?
        state.recipes.sort(function(a,b){
            if(a.healthScore> b.healthScore){
                return 1;
            }
            if(b.healthScore>a.healthScore){
                return -1;
            }
            return 0;
        }) :
        state.recipes.sort(function(a,b){
            if(a.healthScore>b.healtScore){
                return -1;
            }
            if(b.healthScore> a.healtScore){
                return 1;
            }
            return 0;
        })
            return{    
                ...state,
                recipes: puntaje
                }
           case GET_NAME_RECIPE:
            return{ 
                ...state,
                recipes:payload 
            }
        case POST_REC:
            return{
                ...state
            }
        case GET_TYPES:
            return{
                ...state,
                types:payload 
            } 
        case GET_DETAILS:
            /* state.details = undefined */
        
            return {...state, details : payload }
            
            default :
        return state;
    }

}
export default rootR;