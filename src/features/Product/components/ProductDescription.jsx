import { makeStyles, Paper } from '@material-ui/core';
import DOMPurify from 'dompurify';
import PropTypes from 'prop-types';
import React from 'react';

ProductDescription.propTypes = {
    product: PropTypes.object,
};

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}));

function ProductDescription({ product = {} }) {
    const safeDescription = DOMPurify.sanitize(product.description);
    const classes = useStyles();
    return (
        <Paper elevation={0} className={classes.root}>
            <div dangerouslySetInnerHTML={{ __html: safeDescription }}></div>;
        </Paper>
    );
}

export default ProductDescription;
