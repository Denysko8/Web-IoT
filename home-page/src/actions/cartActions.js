export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const UPDATE_CART_ITEM_AMOUNT = 'UPDATE_CART_ITEM_AMOUNT';
export const SET_CART_ITEMS = 'SET_CART_ITEMS';
export const CLEAR_CART = 'CLEAR_CART';

let cartItemIdCounter = 0;

export const addToCart = (item) => ({
    type: ADD_TO_CART,
    payload: { ...item, cartItemId: `${item.id}-${Date.now()}-${cartItemIdCounter++}` }, // Generate a unique ID for each cart item
});

export const removeFromCart = (cartItemId) => ({
    type: REMOVE_FROM_CART,
    payload: cartItemId,
});

export const updateCartItemAmount = (cartItemId, amount) => ({
    type: UPDATE_CART_ITEM_AMOUNT,
    payload: { cartItemId, amount },
});

export const setCartItems = (items) => ({
    type: SET_CART_ITEMS,
    payload: items,
});

export const clearCart = () => ({
    type: CLEAR_CART,
});