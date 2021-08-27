import React from 'react';
import PropTypes from 'prop-types';
import { Box, makeStyles } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { formatPrice } from '../../../utils';

ProductInfo.propTypes = {
    product: PropTypes.object,
};

const useStyles = makeStyles((theme) => ({
    root: {
        borderBottom: `1px solid ${theme.palette.grey[300]}`,
        paddingBottom: theme.spacing(2),
    },

    description: {
        margin: theme.spacing(2, 0),
    },

    priceBox: {
        backgroundColor: theme.palette.grey[200],
        padding: theme.spacing(2),
    },

    salePrice: {
        fontWeight: 'bold',
        fontSize: theme.typography.h4.fontSize,
    },

    originalPrice: {
        textDecoration: 'line-through',
        opacity: 0.7,
        margin: '0 16px',
    },

    promotionPercent: {},
}));

function ProductInfo({ product = {} }) {
    const classes = useStyles();
    const { name, shortDescription, salePrice, originalPrice, promotionPercent } =
        product;

    return (
        <Box className={classes.root}>
            <Typography component="h1" variant="h4">
                {name}
            </Typography>
            <Typography variant="body2" className={classes.description}>
                {shortDescription}
            </Typography>
            <Box className={classes.priceBox}>
                <Box component="span" className={classes.salePrice}>
                    {formatPrice(salePrice)}
                </Box>
                {promotionPercent > 0 && (
                    <>
                        <Box component="span" className={classes.originalPrice}>
                            {formatPrice(originalPrice)}
                        </Box>
                        <Box component="span" className={classes.promotionPercent}>
                            {`-${promotionPercent}%`}
                        </Box>
                    </>
                )}
            </Box>
        </Box>
    );
}

export default ProductInfo;
