import { Box, makeStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { STATIC_HOST, THUMBNAIL_PLACEHOLDER } from '../../../constants';

Product.propTypes = {
    product: PropTypes.object,
};

Product.defaultProps = {
    product: {},
};

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'relative',
    },

    salePercent: {
        position: 'absolute',
        top: '16px',
        right: '16px',
        backgroundColor: '#ff424e',
        color: '#fff',
        padding: '2px 4px',
        borderRadius: '5px',
        fontWeight: 'bold',
    },

    fontWeight: {
        fontWeight: 'bold',
    },
}));

function Product({ product }) {
    const classes = useStyles();

    const thumbnailUrl = product.thumbnail
        ? `${STATIC_HOST}${product.thumbnail?.url}`
        : THUMBNAIL_PLACEHOLDER;

    return (
        <Box padding={1} className={classes.root}>
            <Box>
                <img src={thumbnailUrl} alt={product.name} width="100%"></img>
            </Box>
            <Typography className={classes.fontWeight}>
                {product.name}
            </Typography>
            <Typography className={classes.fontWeight}>
                {new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                }).format(product.salePrice)}
            </Typography>
            <Box>
                {product.promotionPercent > 0 ? (
                    <Typography className={classes.salePercent}>
                        -{product.promotionPercent}%
                    </Typography>
                ) : (
                    ''
                )}
            </Box>
        </Box>
    );
}

export default Product;
