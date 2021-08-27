import { Box, Link, makeStyles } from '@material-ui/core';
import React from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';

ProductMenu.propTypes = {};

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        listStyleType: 'none',
        flexFolow: 'row nowrap',
        justifyContent: 'center',

        padding: 0,
        '& > li': {
            padding: theme.spacing(2, 4),
            cursor: 'pointer',
        },

        '& > li > a': {
            color: theme.palette.grey[700],
        },

        '& > li > a.active': {
            textDecoration: 'underline',
            color: theme.palette.primary.main,
        },
    },
}));

function ProductMenu(props) {
    const { url } = useRouteMatch();
    const classes = useStyles();

    return (
        <Box component="ul" className={classes.root}>
            <li>
                <Link component={NavLink} to={url} exact>
                    Description
                </Link>
            </li>
            <li>
                <Link component={NavLink} to={`${url}/additional`} exact>
                    Additional Information
                </Link>
            </li>
            <li>
                <Link component={NavLink} to={`${url}/reviews`} exact>
                    Reviews
                </Link>
            </li>
        </Box>
    );
}

export default ProductMenu;
