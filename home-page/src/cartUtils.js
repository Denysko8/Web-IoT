export const getCartKey = (userEmail) => {
    return `cart_${userEmail}`;
};

export const saveCartToStorage = (userEmail, cartItems) => {
    if (!userEmail) return;
    localStorage.setItem(getCartKey(userEmail), JSON.stringify(cartItems));
};

export const loadCartFromStorage = (userEmail) => {
    if (!userEmail) return [];
    const savedCart = localStorage.getItem(getCartKey(userEmail));
    return savedCart ? JSON.parse(savedCart) : [];
};

export const clearUserCart = (userEmail) => {
    if (!userEmail) return;
    localStorage.removeItem(getCartKey(userEmail));
};

// Add these functions to maintain compatibility
export const getCart = () => {
    const userEmail = localStorage.getItem('user');
    return loadCartFromStorage(userEmail);
};

export const addToCart = (item) => {
    const userEmail = localStorage.getItem('user');
    if (!userEmail) return;
    
    const currentCart = loadCartFromStorage(userEmail);
    
    // Check if item already exists in cart
    const existingItemIndex = currentCart.findIndex(cartItem => cartItem.id === item.id);
    
    if (existingItemIndex !== -1) {
        // Update existing item
        currentCart[existingItemIndex] = {
            ...currentCart[existingItemIndex],
            amount: currentCart[existingItemIndex].amount + item.amount
        };
    } else {
        // Add new item
        currentCart.push(item);
    }
    
    saveCartToStorage(userEmail, currentCart);
    return currentCart;
};