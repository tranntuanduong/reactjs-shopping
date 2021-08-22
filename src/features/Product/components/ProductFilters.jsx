import { Box } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import FilterByCategory from './Filters/FilterByCategory';
import FilterByPrice from './Filters/FilterByPrice';
import { makeStyles } from '@material-ui/core';
ProductFilters.propTypes = {
    onChange: PropTypes.func,
    filters: PropTypes.object.isRequired,
};

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}));

function ProductFilters({ filters, onChange }) {
    const classes = useStyles();

    const handleCategoryChange = (newCategoryId) => {
        const newFilters = {
            'category.id': newCategoryId,
        };

        if (onChange) onChange(newFilters);
    };

    const handlePriceChange = (newPrice) => {
        console.log(newPrice);
        if (onChange) onChange(newPrice);
    };

    return (
        <Box className={classes.root}>
            <FilterByCategory onChange={handleCategoryChange} />
            <FilterByPrice onChange={handlePriceChange} />
        </Box>
    );
}

export default ProductFilters;
