import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_CART_ITEM_AMOUNT, SET_CART_ITEMS } from '../actions/cartActions';

const initialState = {
    items: [],
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            return {
                ...state,
                items: [...state.items, action.payload],
            };
        case REMOVE_FROM_CART:
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload),
            };
        case UPDATE_CART_ITEM_AMOUNT:
            return {
                ...state,
                items: state.items.map(item =>
                    item.id === action.payload.id ? { ...item, amount: action.payload.amount } : item
                ),
            };
        case SET_CART_ITEMS:
            return {
                ...state,
                items: action.payload,
            };
        default:
            return state;
    }
};

export default cartReducer;