import React from 'react';
import PropTypes from 'prop-types';
import { Tabs } from '@material-ui/core';
import { Tab } from '@material-ui/core';

ProductSort.propTypes = {
    currentSort: PropTypes.string.isRequired,
    onChange: PropTypes.func,
};

function ProductSort({ currentSort, onChange }) {
    const handleSortChange = (event, newValues) => {
        if (onChange) onChange(newValues);
    };

    return (
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
    );
}

export default ProductSort;
