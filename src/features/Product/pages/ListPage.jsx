import { Box, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import productApi from '../../../api/productApi';
import ProductList from '../components/ProductList';
import ProductSkeletonList from '../components/ProductSkeletonList';

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
    },
}));

function ListPage(props) {
    const classes = useStyles();
    const [productList, setProductList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const { data } = await productApi.getAll({
                    _page: 1,
                    _limit: 10,
                });
                setProductList(data);
            } catch (error) {
                console.log('Failed to fetch product list');
            }
            setLoading(false);
        })();
    }, []);

    return (
        <Box>
            <Container maxWidth="lg">
                <Grid container spacing={1}>
                    <Grid item className={classes.left}>
                        <Paper elevation={0}>LEFT</Paper>
                    </Grid>
                    <Grid item className={classes.right}>
                        <Paper elevation={0} className={classes.paper}>
                            {loading ? (
                                <ProductSkeletonList length={10} />
                            ) : (
                                <ProductList data={productList} />
                            )}
                            <Pagination
                                color="primary"
                                page={2}
                                count={5}
                                className={classes.Pagination}
                            ></Pagination>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default ListPage;
