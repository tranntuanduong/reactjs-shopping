import { createSelector } from '@reduxjs/toolkit';

const cartItemsSelector = (state) => state.cart.cartItems;

// count number of product in cart
export const cartItemsCountSelector = createSelector(cartItemsSelector, (cartItems) =>
    cartItems.reduce((count, item) => count + item.quantity, 0)
);

// calculate total of cart
export const cartTotalSelecttor = createSelector(cartItemsSelector, (cartItems) =>
    cartItems.reduce((total, item) => total + item.quantity * item.product.salePrice, 0)
);
