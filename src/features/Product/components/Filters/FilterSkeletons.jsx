import { Box, makeStyles } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import PropTypes from 'prop-types';
import React from 'react';

FilterSkeletons.propTypes = {
    length: PropTypes.number,
};

FilterSkeletons.defaultProps = {
    length: 6,
};

const useStyles = makeStyles((theme) => ({
    mbt8: {
        marginBottom: theme.spacing(1),
    },
}));

function FilterSkeletons({ length }) {
    const classes = useStyles();

    return (
        <Box>
            <Skeleton className={classes.mbt8}></Skeleton>
            <Skeleton className={classes.mbt8} width="80%" />
            <Skeleton className={classes.mbt8} width="80%" />
            <Skeleton className={classes.mbt8} width="80%" />
            <Skeleton className={classes.mbt8} width="80%" />
            <Skeleton className={classes.mbt8} width="80%" />
        </Box>
    );
}

export default FilterSkeletons;
