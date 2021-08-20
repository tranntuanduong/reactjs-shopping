import { Box, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import Product from './Product';

ProductList.propTypes = {
    data: PropTypes.array,
};

ProductList.defaultProps = {
    data: [],
};

function ProductList({ data }) {
    return (
        <Box>
            <Grid container>
                {data.map((product) => (
                    <Grid item key={product.id} xs={12} sm={2} md={3}>
                        <Product product={product}></Product>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default ProductList;
