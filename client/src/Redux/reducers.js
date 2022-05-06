import{
    GET_ALL_REC ,
    GET_DETAILS ,
    GET_NAME_RECIPE ,
    GET_TYPES ,
    FILTER_REC ,
    ORDER_NAME ,
    ORDER_SCORE ,
    POST_REC
}from './actions'

    const initialState = {
    allRecipes : [],
    recipes : [],
    details : [],
    types : [],
}



function rootR (state = initialState , action){
    switch(action.type){
        case GET_ALL_REC :
            return{
                ...state,
                recipes : action.payload,
                allRecipes : action.payload

            }
        case FILTER_REC: //filtramos los tipos de dieta
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
             return sol.includes(action.payload) ===true? 
                 fix.push(e):null})
                console.log(fix)
            return{
                    ...state,
                    recipes:action.payload === 'All'? allRecipes: fix 
                }
        case ORDER_NAME :
            let arrayOrdenau = action.payload === 'asc'?
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
                recipes : arrayOrdenau
            }
        case ORDER_SCORE : 
        let puntaje = action.payload === 'high'?
        state.recipes.sort(function(a,b){
            if(a.score> b.score){
                return 1;
            }
            if(b.score>a.score){
                return -1;
            }
            return 0;
        }) :
        state.recipes.sort(function(a,b){
            if(a.score>b.score){
                return -1;
            }
            if(b.score> a.score){
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
                recipes:action.payload
            }
        case POST_REC:
            return{
                ...state
            }
        case GET_TYPES:
            return{
                ...state,
                types: action.payload 
            } 
        case GET_DETAILS:
            return{
                ...state,
                details:action.payload
                }
        
        default :
        return state;
    }

}
export default rootR;