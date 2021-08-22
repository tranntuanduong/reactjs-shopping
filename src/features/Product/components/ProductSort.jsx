import React from 'react';
import PropTypes from 'prop-types';
import { Box, makeStyles, Tabs } from '@material-ui/core';
import { Tab } from '@material-ui/core';

ProductSort.propTypes = {
    currentSort: PropTypes.string.isRequired,
    onChange: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
    root: {
        borderBottom: `1px solid ${theme.palette.grey[300]}`,
        paddingRight: theme.spacing(2),
        paddingLeft: theme.spacing(2),
    },
}));

function ProductSort({ currentSort, onChange }) {
    const classes = useStyles();
    const handleSortChange = (event, newValues) => {
        if (onChange) onChange(newValues);
    };

    return (
        <Box className={classes.root}>
            <Tabs
                value={currentSort}
                indicatorColor="primary"
                textColor="primary"
                onChange={handleSortChange}
                aria-label="disabled tabs example"
            >
                <Tab label="Giá thấp tới cao" value="salePrice:ASC" />
                <Tab label="Giá cao tới thấp" value="salePrice:DESC" />
            </Tabs>
        </Box>
    );
}

export default ProductSort;
