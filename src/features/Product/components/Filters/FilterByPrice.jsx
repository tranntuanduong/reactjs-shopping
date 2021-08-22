import { Box, Button, makeStyles, TextField, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

FilterByPrice.propTypes = {
    onChange: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
    root: {
        borderTop: `1px solid ${theme.palette.grey[300]}`,
        paddingTop: theme.spacing(2),
        marginTop: theme.spacing(2),
    },

    range: {
        display: 'flex',
        flexFlow: 'row nowrap',
        alignItems: 'center',

        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),

        '& > p': {
            marginRight: theme.spacing(1),
        },
    },

    btn: {
        marginRight: theme.spacing(1),
    },
}));

function FilterByPrice({ onChange }) {
    const classes = useStyles();
    const [values, setValues] = useState({
        salePrice_gte: 0,
        salePrice_lte: 0,
    });
    const handleSubmit = () => {
        console.log(values);
        if (onChange) {
            onChange(values);
        }
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    // const handleReset = () => {
    //     setValues({
    //         salePrice_gte: 0,
    //         salePrice_lte: 0,
    //     });
    // };

    return (
        <Box className={classes.root}>
            <Typography variant="subtitle2">KHOẢNG GIÁ</Typography>
            <Box className={classes.range}>
                <Typography variant="body1">Từ:</Typography>
                <TextField
                    name="salePrice_gte"
                    value={values.salePrice_gte}
                    onChange={handleChange}
                />
                <Typography variant="body1">đến</Typography>
                <TextField
                    name="salePrice_lte"
                    value={values.salePrice_lte}
                    onChange={handleChange}
                />
            </Box>
            <Button
                className={classes.btn}
                size="small"
                variant="outlined"
                color="primary"
                onClick={handleSubmit}
                disabled={!!parseInt(values.salePrice_lte) ? false : true}
            >
                Áp dụng
            </Button>
        </Box>
    );
}

export default FilterByPrice;
