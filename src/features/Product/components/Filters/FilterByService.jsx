import React from 'react';
import PropTypes from 'prop-types';
import { Box, Checkbox, FormControlLabel, makeStyles } from '@material-ui/core';
import { Typography } from '@material-ui/core';

FilterByService.propTypes = {
    onChange: PropTypes.func,
    filters: PropTypes.object,
};

const useStyles = makeStyles((theme) => ({
    root: {
        borderTop: `1px solid ${theme.palette.grey[300]}`,
        paddingTop: theme.spacing(2),
        marginTop: theme.spacing(2),
    },
    serviceList: {
        padding: 0,
        margin: 0,
        listStyleType: 'none',

        '& > li': {
            margin: 0,
        },
    },
}));

function FilterByService({ onChange, filters = {} }) {
    const classes = useStyles();
    const handleChange = (e) => {
        if (!onChange) return;
        const { name, checked } = e.target;

        onChange({ [name]: checked });
    };

    const services = [
        {
            value: 'isPromotion',
            label: 'Có khuyến mãi',
        },
        {
            value: 'isFreeShip',
            label: 'Miễn phí vận chuyển',
        },
    ];

    return (
        <Box className={classes.root}>
            <Typography variant="subtitle2">DỊCH VỤ</Typography>
            <ul className={classes.serviceList}>
                {services.map((service) => (
                    <li key={service.value}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={Boolean(filters[service.value])}
                                    onChange={handleChange}
                                    name={service.value}
                                    color="primary"
                                />
                            }
                            label={service.label}
                        />
                    </li>
                ))}
            </ul>
        </Box>
    );
}

export default FilterByService;
