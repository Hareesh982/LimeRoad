const InitialState = {
    cartItems : [],
    cartCounter : 0,
    totalPrice : 0,
    deliveryCharges : 50,
    taxes : 0,
    grandTotal : 0
}

const cartReducer = (state = InitialState,action) => {
    switch(action.type){
        case 'ADD_TO_CART' : 
            const existingItemIndex = state.cartItems.findIndex(item => item.id === action.payload.id);
            if(existingItemIndex !== -1){
                const updateCartItems = state.cartItems.map((item,index) => {
                    if(index === existingItemIndex){
                        return {...item, quantity : item.quantity + 1, total_item_price : (item.quantity + 1) * item.price}
                    }
                    return item
                });
                return {
                    ...state,
                    cartItems : updateCartItems,
                    cartCounter : state.cartCounter + 1,
                    totalPrice : state.totalPrice + action.payload.price,
                    taxes : (state.totalPrice + action.payload.price) * 0.18,
                    grandTotal : state.totalPrice + state.taxes + action.payload.price
                }
            }
            else{
                return {
                    ...state,
                    cartItems : [...state.cartItems, {...action.payload, quantity : 1, total_item_price : action.payload.price}],
                    cartCounter : state.cartCounter + 1,
                    totalPrice : state.totalPrice + action.payload.price,
                    taxes : (state.totalPrice + action.payload.price) * 0.18,
                    grandTotal : state.totalPrice + state.taxes + action.payload.price
                }
            }
        case "REMOVE_FROM_CART" : 
            const updateCartItems = state.cartItems.filter(item => item.id !== action.payload.id);
            const removedItem = state.cartItems.find(item => item.id === action.payload.id);
            return {
                ...state,
                cartItems : updateCartItems,
                cartCounter : state.cartCounter - removedItem.quantity,
                totalPrice : state.totalPrice - (removedItem.price * removedItem.quantity),
                taxes : (state.totalPrice + action.payload.price) * 0.18,
                grandTotal : state.totalPrice + state.taxes + action.payload.price
            };
        default :
            return state
    }
}

export default cartReducer