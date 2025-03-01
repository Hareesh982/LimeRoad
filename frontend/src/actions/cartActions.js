export const addToCart = (item) => ({
    type : "ADD_TO_CART",
    payload : item
})

export const RemoveFromCart = (item) => ({
    type : "REMOVE_FROM_CART",
    payload : item
})

export const incrementCartCounter = (item) => ({
    type : "INCREMENT_CART_COUNTER",
    payload : item
})

export const decrementCartCounter = (item) => ({
    type : "DECREMENT_CART_COUNTER",
    payload : item
})

