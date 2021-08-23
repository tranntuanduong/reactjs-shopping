import { Box, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import categoryApi from '../../../api/categoryApi';
import productApi from '../../../api/productApi';
import FilterViewer from '../components/FilterViewer';
import ProductFilters from '../components/ProductFilters';
import ProductList from '../components/ProductList';
import ProductSkeletonList from '../components/ProductSkeletonList';
import ProductSort from '../components/ProductSort';
import queryString from 'query-string';
import { useMemo } from 'react';

ListPage.propTypes = {};

const useStyles = makeStyles((theme) => ({
    paper: {
        paddingBottom: theme.spacing(4),
    },
    left: {
        width: '250px',
    },
    right: {
        flex: '1',
    },
    Pagination: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '16px',
    },
}));

function ListPage(props) {
    // console.log('render products');
    const classes = useStyles();

    const history = useHistory();
    const location = useLocation();
    const queryParams = useMemo(() => {
        const params = queryString.parse(location.search);
        console.log('params', params.isPromotion);

        const queryParams = {
            ...params,
            _page: Number.parseInt(params._page) || 1,
            _limit: Number.parseInt(params._limit) || 12,
            _sort: params._sort || 'salePrice:ASC',
            isPromotion: params.isPromotion === 'true',
            isFreeShip: params.isFreeShip === 'true',
        };
        if (queryParams.isPromotion === false) delete queryParams.isPromotion;
        if (queryParams.isFreeShip === false) delete queryParams.isFreeShip;

        return queryParams;
    }, [location.search]);

    const [productList, setProductList] = useState([]);
    const [categories, setCategories] = useState([]);
    const [categoiesLoading, setCategoiesLoading] = useState(true);
    const [pagination, setPagination] = useState({
        page: 1,
        total: 1,
        limit: 12,
    });
    const [loading, setLoading] = useState(true);
    // const [filters, setFilters] = useState(() => {
    //     return {
    //         ...queryParams,
    //         _page: Number.parseInt(queryParams._page) || 1,
    //         _limit: Number.parseInt(queryParams._limit) || 12,
    //         _sort: queryParams._sort || 'salePrice:ASC',
    //     };
    // });
    // console.log({
    //     ...queryParams,
    //     _page: Number.parseInt(queryParams._page) || 1,
    //     _limit: Number.parseInt(queryParams._limit) || 12,
    //     _sort: queryParams._sort || 'salePrice:ASC',
    // });

    // useEffect(() => {
    //     history.push({
    //         pathname: history.location.pathname,
    //         search: queryString.stringify(filters),
    //     });
    // }, [history, filters]);

    useEffect(() => {
        (async () => {
            try {
                const { data, pagination } = await productApi.getAll(queryParams);
                setProductList(data);
                setPagination(pagination);
                // console.log(data, pagination);
            } catch (error) {
                console.log('Failed to fetch product list');
            }
            setLoading(false);
        })();
    }, [queryParams]);

    useEffect(() => {
        (async () => {
            try {
                const categories = await categoryApi.getAll();

                setCategories(
                    categories.map((x) => ({
                        id: x.id,
                        name: x.name,
                    }))
                );
                setCategoiesLoading(false);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    const handlePageChange = (e, page) => {
        setLoading(true);
        // setFilters((prevFilters) => ({
        //     ...prevFilters,
        //     _page: page,
        // }));
        const filters = {
            ...queryParams,
            _page: page,
        };

        history.push({
            pathname: history.location.pathname,
            search: queryString.stringify(filters),
        });
    };

    const handleSortChange = (newValues) => {
        setLoading(true);
        // setFilters((prevFilters) => ({
        //     ...prevFilters,
        //     _page: 1,
        //     _sort: newValues,
        // }));
        const filters = {
            ...queryParams,
            _sort: newValues,
        };

        history.push({
            pathname: history.location.pathname,
            search: queryString.stringify(filters),
        });
    };

    const handleFiltersChange = (newFilters) => {
        setLoading(true);
        // setFilters((prevFilters) => ({
        //     ...prevFilters,
        //     ...newFilters,
        // }));
        const filters = {
            ...queryParams,
            ...newFilters,
        };

        history.push({
            pathname: history.location.pathname,
            search: queryString.stringify(filters),
        });
    };

    const setNewFilters = (newFilters) => {
        setLoading(true);
        // setFilters(newFilters);

        history.push({
            pathname: history.location.pathname,
            search: queryString.stringify(newFilters),
        });
    };

    return (
        <Box>
            <Container maxWidth="lg">
                <Grid container spacing={1}>
                    <Grid item className={classes.left}>
                        <Paper elevation={0}>
                            <ProductFilters
                                onChange={handleFiltersChange}
                                categoiesLoading={categoiesLoading}
                                filters={queryParams}
                                categories={categories}
                            ></ProductFilters>
                        </Paper>
                    </Grid>
                    <Grid item className={classes.right}>
                        <Paper elevation={0} className={classes.paper}>
                            <ProductSort
                                currentSort={queryParams._sort}
                                onChange={handleSortChange}
                            ></ProductSort>
                            <FilterViewer
                                categories={categories}
                                filters={queryParams}
                                onChange={setNewFilters}
                            />
                            {loading ? (
                                <ProductSkeletonList length={pagination.limit} />
                            ) : (
                                <ProductList data={productList} />
                            )}
                            <Pagination
                                color="primary"
                                page={pagination.page}
                                count={Math.ceil(pagination.total / pagination.limit)}
                                className={classes.Pagination}
                                onChange={handlePageChange}
                            ></Pagination>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default ListPage;
