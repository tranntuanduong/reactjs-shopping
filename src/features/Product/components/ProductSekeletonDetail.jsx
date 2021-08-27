import { Box, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import React from 'react';

ProductSekeletonDetail.propTypes = {};

const useStyles = makeStyles((theme) => ({
    root: {},

    left: {
        marginRight: '8px',
        width: '400px',
        padding: theme.spacing(1.5),
        borderRight: `1px solid ${theme.palette.grey[200]}`,
    },
    right: {
        flex: '1',
        padding: theme.spacing(1.5),
    },
    skeleton: {
        marginTop: '8px',
    },

    skeletonForm: {
        marginTop: '280px',
    },
}));

function ProductSekeletonDetail(props) {
    const classes = useStyles();

    return (
        <Box>
            <Container>
                <Paper elevation={0}>
                    <Grid container>
                        <Grid item className={classes.left}>
                            <Skeleton variant="rect" width="100%" height={400} />
                        </Grid>
                        <Grid item className={classes.right}>
                            <Box>
                                <Skeleton variant="rect" width="100%" height={20} />
                            </Box>
                            <Box>
                                <Skeleton className={classes.skeleton} width="80%" />
                            </Box>
                            <Box>
                                <Skeleton
                                    className={classes.skeletonForm}
                                    width="30%"
                                    variant="rect"
                                    height={40}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </Box>
    );
}

export default ProductSekeletonDetail;
