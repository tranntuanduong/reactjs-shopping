import { Badge, Box, IconButton, Menu, MenuItem } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { AccountCircle, Close } from '@material-ui/icons';
import CodeIcon from '@material-ui/icons/Code';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useHistory } from 'react-router-dom';
import Login from '../../features/Auth/components/Login';
import Register from '../../features/Auth/components/Register';
import { logout } from '../../features/Auth/userSlice';
import {
    cartItemsCountSelector,
    cartTotalSelecttor,
} from '../../features/Cart/selectors';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    link: {
        textDecoration: 'none',
        color: 'white',
    },
    closeButton: {
        position: 'absolute',
        top: theme.spacing(1),
        right: theme.spacing(1),
        color: theme.palette.grey[500],
        zIndex: 1,
    },
}));

const MODE = {
    LOGIN: 'login',
    REGISTER: 'register',
};

export default function Header() {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState(MODE.LOGIN);
    const [anchorEl, setAnchorEl] = useState(null);
    const loggedInUser = useSelector((state) => state.user.current);
    const cartItemsCount = useSelector(cartItemsCountSelector);

    const isLoggedIn = !!loggedInUser.id;
    const dispatch = useDispatch();
    const history = useHistory();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleUserClick = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleLogoutClick = () => {
        const action = logout();
        dispatch(action);
        setAnchorEl(null);
    };

    const handleCartClick = () => {
        history.push('/cart');
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <CodeIcon className={classes.menuButton}></CodeIcon>

                    <Typography className={classes.title} variant="h6">
                        <Link to="/" className={classes.link}>
                            EZ SHOP
                        </Link>
                    </Typography>

                    <NavLink
                        className={classes.link}
                        to="/todos"
                        activeClassName="active-menu"
                    >
                        <Button color="inherit"> Todos</Button>
                    </NavLink>
                    <NavLink
                        className={classes.link}
                        to="/products"
                        activeClassName="active-menu"
                    >
                        <Button color="inherit"> Products</Button>
                    </NavLink>

                    <NavLink
                        className={classes.link}
                        to="/albums"
                        activeClassName="active-menu"
                    >
                        <Button color="inherit"> Albums</Button>
                    </NavLink>
                    {!isLoggedIn && (
                        <Button color="inherit" onClick={handleClickOpen}>
                            Login
                        </Button>
                    )}

                    {isLoggedIn && (
                        <div onClick={handleUserClick}>
                            <IconButton color="inherit">
                                <AccountCircle />
                            </IconButton>
                            <Button color="inherit">
                                {loggedInUser.email.split('@')[0]}
                            </Button>
                        </div>
                    )}

                    <MenuItem>
                        <IconButton
                            aria-label="show 4 new mails"
                            color="inherit"
                            onClick={handleCartClick}
                        >
                            <Badge badgeContent={cartItemsCount} color="secondary">
                                <ShoppingCartIcon />
                            </Badge>
                        </IconButton>
                    </MenuItem>
                </Toolbar>
            </AppBar>
            <Menu
                keepMounted
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                getContentAnchorEl={null}
            >
                <MenuItem onClick={handleCloseMenu}>My account</MenuItem>
                <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
            </Menu>

            <Dialog open={open} aria-labelledby="form-dialog-title">
                <IconButton onClick={handleClose} className={classes.closeButton}>
                    <Close />
                </IconButton>
                <DialogContent>
                    {mode === MODE.LOGIN && (
                        <>
                            <Login closeDialog={handleClose}></Login>
                            <Box textAlign="center">
                                <Button
                                    color="primary"
                                    onClick={() => setMode(MODE.REGISTER)}
                                >
                                    Don't have an account. Register here
                                </Button>
                            </Box>
                        </>
                    )}
                    {mode === MODE.REGISTER && (
                        <>
                            <Register closeDialog={handleClose}></Register>
                            <Box textAlign="center">
                                <Button
                                    color="primary"
                                    onClick={() => setMode(MODE.LOGIN)}
                                >
                                    Already have an account. Login here
                                </Button>
                            </Box>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
