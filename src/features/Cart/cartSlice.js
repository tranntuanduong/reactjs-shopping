import { createSlice } from '@reduxjs/toolkit';
import StorageKeys from '../../constants/storage-keys';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        showMiniCart: false,
        cartItems: JSON.parse(localStorage.getItem(StorageKeys.CART)) || [],
        // cartItem: [
        //      {
        //      id: 1,
        //      product: {},
        //      quantity: 1
        // },
        // {
        //      id: 2,
        //      product: {},
        //      quantity: 4
        // },
        // ]
    },
    reducers: {
        showMiniCart(state /*payload*/) {
            state.showMiniCart = true;
        },

        hideMiniCart(state) {
            state.showMiniCart = false;
        },

        addToCart(state, action) {
            const newItem = action.payload;
            const index = state.cartItems.findIndex((x) => x.id === newItem.id);
            if (index >= 0) {
                // inscrease quantity
                state.cartItems[index].quantity += newItem.quantity;
            } else {
                // add to cart
                state.cartItems.push(newItem);
            }
            localStorage.setItem(StorageKeys.CART, JSON.stringify(state.cartItems));
        },

        setQuantity(state, action) {
            const { id, quantity } = action.payload;
            // check product is available in cart
            const index = state.cartItems.findIndex((x) => x.id === id);
            if (index >= 0) {
                state.cartItems[index].quantity = quantity;
            }
        },

        removeFormCart(state, action) {
            const idNeedToRemove = action.payload;
            state.cartItem = state.cartItems.filter((x) => x.id !== idNeedToRemove);
        },
    },
});

const { actions, reducer } = cartSlice;
export const { showMiniCart, hideMiniCart, addToCart, setQuantity, removeFormCart } =
    actions;
export default reducer;
