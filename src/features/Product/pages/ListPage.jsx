import { Box, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import categoryApi from '../../../api/categoryApi';
import productApi from '../../../api/productApi';
import FilterViewer from '../components/FilterViewer';
import ProductFilters from '../components/ProductFilters';
import ProductList from '../components/ProductList';
import ProductSkeletonList from '../components/ProductSkeletonList';
import ProductSort from '../components/ProductSort';

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
    console.log('render products');
    const classes = useStyles();
    const [productList, setProductList] = useState([]);
    const [categories, setCategories] = useState([]);
    const [categoiesLoading, setCategoiesLoading] = useState(true);
    const [pagination, setPagination] = useState({
        page: 1,
        total: 1,
        limit: 12,
    });
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        _page: 1,
        _limit: 12,
        _sort: 'salePrice:ASC',
    });

    useEffect(() => {
        (async () => {
            try {
                const { data, pagination } = await productApi.getAll(filters);
                setProductList(data);
                setPagination(pagination);
                // console.log(data, pagination);
            } catch (error) {
                console.log('Failed to fetch product list');
            }
            setLoading(false);
        })();
    }, [filters]);

    useEffect(() => {
        (async () => {
            try {
                const categories = await categoryApi.getAll();
                console.log(categories);
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
        setFilters((prevFilters) => ({
            ...prevFilters,
            _page: page,
        }));
    };

    const handleSortChange = (newValues) => {
        setLoading(true);
        setFilters((prevFilters) => ({
            ...prevFilters,
            _page: 1,
            _sort: newValues,
        }));
    };

    const handleFiltersChange = (newFilters) => {
        setLoading(true);
        setFilters((prevFilters) => ({
            ...prevFilters,
            ...newFilters,
        }));
    };

    const setNewFilters = (newFilters) => {
        setLoading(true);
        setFilters(newFilters);
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
                                filters={filters}
                                categories={categories}
                            ></ProductFilters>
                        </Paper>
                    </Grid>
                    <Grid item className={classes.right}>
                        <Paper elevation={0} className={classes.paper}>
                            <ProductSort
                                currentSort={filters._sort}
                                onChange={handleSortChange}
                            ></ProductSort>
                            <FilterViewer
                                categories={categories}
                                filters={filters}
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
