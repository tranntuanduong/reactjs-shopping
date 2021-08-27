import { Box, makeStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { STATIC_HOST, THUMBNAIL_PLACEHOLDER } from '../../../constants';
import { formatPrice } from '../../../utils';

Product.propTypes = {
    product: PropTypes.object,
};

Product.defaultProps = {
    product: {},
};

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'relative',
        cursor: 'pointer',
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

    image: {
        minHeight: '205px',
    },
}));

function Product({ product }) {
    const classes = useStyles();
    const history = useHistory();

    const thumbnailUrl = product.thumbnail
        ? `${STATIC_HOST}${product.thumbnail?.url}`
        : THUMBNAIL_PLACEHOLDER;

    const handleClick = () => {
        // navigate to detail page: /products/:productId
        history.push(`/products/${product.id}`);
    };

    return (
        <Box padding={2} className={classes.root} onClick={handleClick}>
            <Box className={classes.image}>
                <img src={thumbnailUrl} alt={product.name} width="100%"></img>
            </Box>
            <Typography className={classes.fontWeight}>{product.name}</Typography>
            <Typography className={classes.fontWeight}>
                {formatPrice(product.salePrice)}
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
