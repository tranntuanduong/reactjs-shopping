import { Box, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { addToCart } from '../../Cart/cartSlice';
import AddToCartForm from '../components/AddToCartForm';
import ProductAdditional from '../components/ProductAdditional';
import ProductDescription from '../components/ProductDescription';
import ProductInfo from '../components/ProductInfo';
import ProductMenu from '../components/ProductMenu';
import ProductReviews from '../components/ProductReviews';
import ProductSekeletonDetail from '../components/ProductSekeletonDetail';
import ProductThumbnail from '../components/ProductThumbnail';
import useProductDetail from '../hooks/useProductDetail';

ProductDetail.propTypes = {};

const useStyles = makeStyles((theme) => ({
    paper: {
        width: '400px',
        paddingBottom: theme.spacing(4),
    },
    left: {
        width: '400px',
        minHeight: '400px',
        padding: theme.spacing(1.5),
        borderRight: `1px solid ${theme.palette.grey[300]}`,
    },
    right: {
        flex: '1',
        padding: theme.spacing(1.5),
    },
}));

function ProductDetail(props) {
    const classes = useStyles();
    const {
        params: { productId },
        url,
    } = useRouteMatch();

    const { product, loading } = useProductDetail(productId);
    const dispatch = useDispatch();

    if (loading) {
        return <ProductSekeletonDetail />;
    }

    const handleAddToCartForm = (formValues) => {
        const action = addToCart({
            id: product.id,
            product,
            quantity: formValues.quantity,
        });
        dispatch(action);
    };

    return (
        <Box>
            <Container>
                <Paper elevation={0}>
                    <Grid container>
                        <Grid item className={classes.left}>
                            <ProductThumbnail product={product} />
                        </Grid>
                        <Grid item className={classes.right}>
                            <ProductInfo product={product} />
                            <AddToCartForm onSubmit={handleAddToCartForm} />
                        </Grid>
                    </Grid>
                </Paper>
                <ProductMenu />
                <Switch>
                    <Route exact path={url}>
                        <ProductDescription product={product} />
                    </Route>
                    <Route exact path={`${url}/additional`}>
                        <ProductAdditional product={product} />
                    </Route>
                    <Route exact path={`${url}/reviews`}>
                        <ProductReviews product={product} />
                    </Route>
                </Switch>
            </Container>
        </Box>
    );
}

export default ProductDetail;
