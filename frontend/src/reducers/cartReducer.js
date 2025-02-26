import axios from 'axios';

const defaultState = {
    cartItems: [],
    cartCounter: 0,
    totalPrice: 0,
    deliveryCharges: 50,
    taxes: 0,
    grandTotal: 0
};

const fetchInitialState = async () => {
    if (localStorage.getItem('token')) {
        try {
            const response = await axios.get('http://127.0.0.1:3005/api/cartData', {
                headers: {
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.data) {
                return response.data;
            }
        } catch (e) {
            console.error("Could not fetch initial state from database", e);
        }
    } else {
        const localState = localStorage.getItem("cartState");
        if (localState) {
            console.log(JSON.parse(localState));
            return JSON.parse(localState);
        }
    }
    return defaultState;
};

let InitialState = await fetchInitialState();

const saveToLocalStorage = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('cartState', serializedState);
    } catch (e) {
        console.error("Could not save state", e);
    }
};

const saveToDatabase = async (state) => {
    let token = localStorage.getItem('token');
    try {
        console.log('Saving state to database:', state);
        const response = await axios.post('http://127.0.0.1:3005/api/cart', state, {
            headers: {
                Authorization : `Bearer ${token}`
            }
        });
        if (response.status !== 201) {
            throw new Error('Failed to save state to database');
        }
        console.log('State saved to database successfully');
    } catch (e) {
        console.error("Could not save state to database", e);
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
        case 'ADD_TO_CART':
            const existingProduct = state.cartItems.find(item => item._id === action.payload._id && item.selectedSize === action.payload.selectedSize);
            if(existingProduct){
                updatedCartItems = state.cartItems.map(item => 
                    item._id === action.payload._id && item.selectedSize === action.payload.selectedSize
                    ? { ...item, quantity: item.quantity + 1, total_item_price: (item.quantity + 1) * item.price } 
                    : item
                );
            } else {
                updatedCartItems = [...state.cartItems, { ...action.payload, quantity: 1, total_item_price: action.payload.price }];
            }
            const newStateAdd = { ...state, cartItems: updatedCartItems, ...calculateTotals(updatedCartItems) };
            if (localStorage.getItem('token')) {
                saveToDatabase(newStateAdd);
            } else {
                saveToLocalStorage(newStateAdd);
            }
            return newStateAdd;

        case "REMOVE_FROM_CART":
            updatedCartItems = state.cartItems.filter(item => !(item._id === action.payload._id && item.selectedSize === action.payload.selectedSize));
            const newStateRemove = { ...state, cartItems: updatedCartItems, ...calculateTotals(updatedCartItems) };
            if (localStorage.getItem('token')) {
                saveToDatabase(newStateRemove);
            } else {
                saveToLocalStorage(newStateRemove);
            }
            return newStateRemove;
            
        case "UPDATE_QUANTITY":
            const { _id, selectedSize, quantity } = action.payload;
            updatedCartItems = state.cartItems.map(item => 
                item._id === _id && item.selectedSize === selectedSize
                ? { ...item, quantity, total_item_price: quantity * item.price } 
                : item
            );
            const newStateUpdate = { ...state, cartItems: updatedCartItems, ...calculateTotals(updatedCartItems) };
            if (localStorage.getItem('token')) {
                saveToDatabase(newStateUpdate);
            } else {
                saveToLocalStorage(newStateUpdate);
            }
            return newStateUpdate;
        default:
            return state;
    }
};

export default cartReducer;
