import { createSlice } from '@reduxjs/toolkit';

const initialCartState = {
    isChanged: false,
    isShowCart: true,
    items: [],
    notification: null,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialCartState,
    reducers: {
        fetchCartItems: (state, action) => {
            let { items } = action.payload;
            items ? (state.items = items) : (state.items = []);
        },
        showCartChange: state => {
            state.isShowCart = !state.isShowCart;
        },
        addCartItem: (state, action) => {
            state.isChanged = true;
            let targetItem = state.items.find(
                item => item.id === action.payload.id
            );

            if (!targetItem) {
                let { id, title, price } = action.payload.item;
                state.items.push({
                    id,
                    title,
                    quantity: 1,
                    price,
                    total: price,
                });
            } else {
                targetItem.quantity++;
                targetItem.total += targetItem.price;
            }
        },
        removeCartItem: (state, action) => {
            state.isChanged = true;
            let targetItem = state.items.find(
                item => item.id === action.payload.id
            );

            if (targetItem.quantity === 1) {
                state.items = state.items.filter(
                    item => item.id !== action.payload.id
                );
            } else {
                targetItem.quantity--;
                targetItem.total -= targetItem.price;
            }
        },
        showNotification: (state, action) => {
            let { status, title, message } = action.payload;
            state.notification = { status, title, message };
        },
    },
});

export const {
    fetchCartItems,
    showCartChange,
    addCartItem,
    removeCartItem,
    showNotification,
} = cartSlice.actions;

export default cartSlice.reducer;
