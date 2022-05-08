import { createSlice } from '@reduxjs/toolkit';

/**
 * https://redux-toolkit.js.org/usage/usage-guide#simplifying-slices-with-createslice
 * https://redux-toolkit.js.org/api/createAction
 * https://redux-toolkit.js.org/api/createSlice#return-value
 *
 * createSlice() will auto-generate the action types and action creators, based on the names of the reducer functions provided
 *
 * Each function defined in the reducers argument will have a corresponding action creator generated using createAction()
 * and included in the result's actions field using the same function name
 *
 * createSlice() looks at all of the functions that were defined in the reducers field,
 * and for every "case reducer" function provided, generates an action creator that uses the name of the reducer as the action type itself
 * i.e. increment reducer will become action type of 'counter/increment',
 * and the increment() action creator from counterSlice.actions will return an action of that type that takes in a payload as argument
 *
 * Example of an action creator:
 *
 * const INCREMENT = 'counter/increment'
 *
 * function increment(amount) {
 *   return {
 *     type: INCREMENT,
 *     payload: amount,
 *   }
 * }
 *
 * const action = increment(3) // output: { type: 'counter/increment', payload: 3 }
 */

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
