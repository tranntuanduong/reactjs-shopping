import { Box } from '@material-ui/core';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import ListPage from './pages/ListPage';
import ProductDetail from './pages/ProductDetail';

ProductFeature.propTypes = {};

function ProductFeature(props) {
    const match = useRouteMatch();
    return (
        <Box pt={4}>
            <Switch>
                <Route path={match.url} component={ListPage} exact></Route>
                <Route path={`${match.url}/:productId`} component={ProductDetail}></Route>
            </Switch>
        </Box>
    );
}

export default ProductFeature;
