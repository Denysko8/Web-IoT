import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/cartActions';

const initialState = {
    items: [],
};

const cartReducer = (state = initialState, action) => {
    console.log('Current state:', state);
    console.log('Action:', action);

    switch (action.type) {
        case ADD_TO_CART:
            console.log('Adding to cart:', action.payload);
            const newState = {
                ...state,
                items: [...state.items, action.payload],
            };
            console.log('New state:', newState);
            return newState;

        case REMOVE_FROM_CART:
            console.log('Removing from cart:', action.payload);
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload),
            };

        default:
            return state;
    }
};

export default cartReducer;