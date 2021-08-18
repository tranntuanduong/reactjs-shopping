import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CodeIcon from '@material-ui/icons/Code';
import React, { useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Register from '../../features/Auth/components/Register';

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
}));

export default function Header() {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
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
                        to="/albums"
                        activeClassName="active-menu"
                    >
                        <Button color="inherit"> Albums</Button>
                    </NavLink>

                    <Button color="inherit" onClick={handleClickOpen}>
                        Register
                    </Button>
                </Toolbar>
            </AppBar>

            <Dialog open={open} aria-labelledby="form-dialog-title">
                <DialogContent>
                    <Register></Register>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
