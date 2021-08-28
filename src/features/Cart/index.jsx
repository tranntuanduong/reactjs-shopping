import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { cartTotalSelecttor } from './selectors';

CartFeature.propTypes = {};

function CartFeature(props) {
    const cartTotalCount = useSelector(cartTotalSelecttor);
    return <div>Total: {cartTotalCount}VND</div>;
}

export default CartFeature;
