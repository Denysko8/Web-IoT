export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const UPDATE_CART_ITEM_AMOUNT = 'UPDATE_CART_ITEM_AMOUNT';
export const SET_CART_ITEMS = 'SET_CART_ITEMS';

export const addToCart = (item) => ({
    type: ADD_TO_CART,
    payload: item,
});

export const removeFromCart = (id) => ({
    type: REMOVE_FROM_CART,
    payload: id,
});

export const updateCartItemAmount = (id, amount) => ({
    type: UPDATE_CART_ITEM_AMOUNT,
    payload: { id, amount },
});

export const setCartItems = (items) => ({
    type: SET_CART_ITEMS,
    payload: items,
});