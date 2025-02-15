let ParseProduct = null
let storedProduct = localStorage.getItem('currentProduct')

if(storedProduct && storedProduct!== undefined){
    ParseProduct = storedProduct ? JSON.stringify(storedProduct) : null
}

let InitialState = {
        product : ParseProduct
}

let currentProductReducer = (state=InitialState, action) => {
    switch(action.type){
        case 'SET_CURRENT_PRODUCT' :
            localStorage.setItem('currentProduct', JSON.stringify(action.payload))
            return {
                ...state,
                product : action.payload
            }
        default : 
            return state
    }
}

export default currentProductReducer

