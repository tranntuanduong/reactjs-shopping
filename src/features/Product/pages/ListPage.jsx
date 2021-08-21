import { Box, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import productApi from '../../../api/productApi';
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
    const [pagination, setPagination] = useState({
        page: 1,
        total: 1,
        limit: 10,
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
                console.log(data, pagination);
            } catch (error) {
                console.log('Failed to fetch product list');
            }
            setLoading(false);
        })();
    }, [filters]);

    const handlePageChange = (e, page) => {
        setLoading(true);
        setFilters((prevFilters) => ({
            ...prevFilters,
            _page: page,
        }));
    };

    const handleSortChange = (newValues) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            _page: 1,
            _sort: newValues,
        }));
    };

    return (
        <Box>
            <Container maxWidth="lg">
                <Grid container spacing={1}>
                    <Grid item className={classes.left}>
                        <Paper elevation={0}>LEFT</Paper>
                    </Grid>
                    <Grid item className={classes.right}>
                        <ProductSort
                            currentSort={filters._sort}
                            onChange={handleSortChange}
                        ></ProductSort>
                        <Paper elevation={0} className={classes.paper}>
                            {loading ? (
                                <ProductSkeletonList
                                    length={pagination.limit}
                                />
                            ) : (
                                <ProductList data={productList} />
                            )}
                            <Pagination
                                color="primary"
                                page={pagination.page}
                                count={Math.ceil(
                                    pagination.total / pagination.limit
                                )}
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
