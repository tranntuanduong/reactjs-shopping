import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, makeStyles } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

ProductSkeletonList.propTypes = {
    length: PropTypes.number,
};

ProductSkeletonList.defaultProps = {
    length: 6,
};

const useStyles = makeStyles((theme) => ({
    root: {},

    left: {
        marginRight: '8px',
    },
    right: {
        flex: '1',
    },
}));

function ProductSkeletonList({ length }) {
    const classes = useStyles();

    return (
        <Box>
            <Grid container>
                {Array.from(new Array(length)).map((x, index) => (
                    <Grid item key={index} xs={12} sm={2} md={3}>
                        <Box padding={2}>
                            <Skeleton
                                variant="rect"
                                width="100%"
                                height={200}
                            />
                            <Box mt={1}>
                                <Grid container>
                                    <Grid item className={classes.left}>
                                        <Skeleton
                                            variant="circle"
                                            width="40px"
                                            height="40px"
                                        />
                                    </Grid>
                                    <Grid item className={classes.right}>
                                        <Skeleton />
                                        <Skeleton width="60%" />
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default ProductSkeletonList;
