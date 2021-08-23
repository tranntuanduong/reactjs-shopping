import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Box, makeStyles } from '@material-ui/core';
import { Chip } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        listStyleType: 'none',
        paddingLeft: '8px',
        '& > li': {
            margin: 0,
            paddingLeft: theme.spacing(1),
        },
    },
}));

const FILTER_LIST = [
    {
        id: 1,
        getLabel: () => 'Giao hàng miễn phí',
        isActive: (filters) => filters.isFreeShip,
        isVisible: () => true,
        isRemovable: false,
        onRemove: () => {},
        onToggle: (filters) => {
            const newFilters = { ...filters };
            if (filters.isFreeShip) {
                delete newFilters.isFreeShip;
            } else {
                newFilters.isFreeShip = true;
            }
            return newFilters;
        },
    },
    {
        id: 2,
        getLabel: (filters, categories) => {
            const category = categories.find((x) => {
                return x.id === Number.parseInt(filters['category.id']);
            });
            return category ? category.name : 'Loading...';
        },
        isActive: (filters) => true,
        isVisible: (filters) => Object.keys(filters).includes('category.id'),
        isRemovable: true,
        onRemove: (filters) => {
            const newFilters = { ...filters };
            delete newFilters['category.id'];
            return newFilters;
        },
        onToggle: (filters) => {},
    },
    {
        id: 3,
        getLabel: (filters) => {
            const salePriceGte = new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
            }).format(filters.salePrice_gte);

            const salePriceLte = new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
            }).format(filters.salePrice_lte);

            if (filters.salePrice_gte > 0)
                return `Từ ${salePriceGte} đến ${salePriceLte}`;
            else return `Dưới ${salePriceLte}`;
        },

        isActive: (filters) => true,
        isVisible: (filters) => filters.salePrice_lte,
        isRemovable: true,
        onRemove: (filters) => {
            const newFilters = { ...filters };

            delete newFilters.salePrice_lte;
            delete newFilters.salePrice_gte;

            return newFilters;
        },

        onToggle: (filters) => {},
    },
    {
        id: 4,
        getLabel: () => 'Có khuyễn mãi',
        isActive: (filters) => filters.isPromotion,
        isVisible: (filters) => filters.isPromotion,
        isRemovable: true,
        onRemove: (filters) => {
            const newFilters = { ...filters };
            delete newFilters.isPromotion;

            return newFilters;
        },
        onToggle: (filters) => {},
    },
];

FilterViewer.propTypes = {
    onChange: PropTypes.func,
    filters: PropTypes.object,
    categories: PropTypes.array,
};

function FilterViewer({ onChange, filters = {}, categories }) {
    const classes = useStyles();
    const visibleFilters = useMemo(() => {
        return FILTER_LIST.filter((x) => x.isVisible(filters));
    }, [filters]);

    return (
        <Box component="ul" className={classes.root}>
            {visibleFilters.map((x) => (
                <li key={x.id}>
                    <Chip
                        size="small"
                        label={x.getLabel(filters, categories)}
                        color={x.isActive(filters) ? 'primary' : 'default'}
                        clickable={!x.isRemovable}
                        onClick={
                            x.isRemovable
                                ? null
                                : () => {
                                      if (!onChange) return;

                                      const newFilters = x.onToggle(filters);
                                      onChange(newFilters);
                                  }
                        }
                        onDelete={
                            x.isRemovable
                                ? () => {
                                      if (!onChange) return;

                                      const newFilters = x.onRemove(filters);
                                      onChange(newFilters);
                                  }
                                : null
                        }
                    />
                </li>
            ))}
        </Box>
    );
}

export default FilterViewer;
