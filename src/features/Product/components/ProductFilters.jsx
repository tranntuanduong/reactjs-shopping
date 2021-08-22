import { Box, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import FilterByCategory from './Filters/FilterByCategory';
import FilterByPrice from './Filters/FilterByPrice';
import FilterByService from './Filters/FilterByService';
ProductFilters.propTypes = {
    onChange: PropTypes.func,
    filters: PropTypes.object.isRequired,
    categories: PropTypes.array,
    categoiesLoading: PropTypes.bool,
};

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}));

function ProductFilters({ filters, onChange, categories, categoiesLoading }) {
    const classes = useStyles();

    const handleCategoryChange = (newCategoryId) => {
        const newFilters = {
            'category.id': newCategoryId,
        };

        if (onChange) onChange(newFilters);
    };

    const handleChange = (values) => {
        if (onChange) onChange(values);
    };

    return (
        <Box className={classes.root}>
            <FilterByCategory
                categoiesLoading={categoiesLoading}
                categories={categories}
                onChange={handleCategoryChange}
            />
            <FilterByPrice onChange={handleChange} />
            <FilterByService filters={filters} onChange={handleChange} />
        </Box>
    );
}

export default ProductFilters;
