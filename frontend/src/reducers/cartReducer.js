const InitialState = JSON.parse(localStorage.getItem("cartState")) || {
    cartItems: [],
    cartCounter: 0,
    totalPrice: 0,
    deliveryCharges: 50,
    taxes: 0,
    grandTotal: 0
};

const saveToLocalStorage = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('cartState', serializedState);
    } catch (e) {
        console.error("Could not save state", e);
    }
};

const calculateTotals = (cartItems) => {
    const totalPrice = cartItems.reduce((total, item) => total + item.total_item_price, 0);
    const cartCounter = cartItems.reduce((total, item) => total + item.quantity, 0);
    const taxes = totalPrice * 0.18;
    const grandTotal = totalPrice + taxes + InitialState.deliveryCharges;
    return { totalPrice, cartCounter, taxes, grandTotal };
};

const cartReducer = (state = InitialState, action) => {
    let updatedCartItems;
    switch(action.type){
        case 'ADD_TO_CART' : 
            const existingProduct = state.cartItems.find(item => item.id === action.payload.id);
            if(existingProduct){
                updatedCartItems = state.cartItems.map(item => 
                    item.id === action.payload.id 
                    ? { ...item, quantity: item.quantity + 1, total_item_price: (item.quantity + 1) * item.price } 
                    : item
                );
            } else {
                updatedCartItems = [...state.cartItems, { ...action.payload, quantity: 1, total_item_price: action.payload.price }];
            }
            const newStateAdd = { ...state, cartItems: updatedCartItems, ...calculateTotals(updatedCartItems) };
            saveToLocalStorage(newStateAdd);
            return newStateAdd;


        case "REMOVE_FROM_CART" : 
            updatedCartItems = state.cartItems.filter(item => item.id !== action.payload);
            const newStateRemove = { ...state, cartItems: updatedCartItems, ...calculateTotals(updatedCartItems) };
            saveToLocalStorage(newStateRemove);
            return newStateRemove;
            
        case "UPDATE_QUANTITY" : 
            const { id, quantity } = action.payload;
            updatedCartItems = state.cartItems.map(item => 
                item.id === id 
                ? { ...item, quantity, total_item_price: quantity * item.price } 
                : item
            );
            const newStateUpdate = { ...state, cartItems: updatedCartItems, ...calculateTotals(updatedCartItems) };
            saveToLocalStorage(newStateUpdate);
            return newStateUpdate;
        default :
            return state;
    }
};

export default cartReducer;
