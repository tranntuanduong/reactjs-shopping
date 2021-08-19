import { yupResolver } from '@hookform/resolvers/yup';
import {
    Avatar,
    Button,
    LinearProgress,
    makeStyles,
    Typography,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import InputField from '../../../../components/FormControls/InputField';
import PasswordField from '../../../../components/FormControls/PasswordField';
import { login } from '../../userSlice';

const schema = yup.object().shape({
    identifier: yup
        .string()
        .email('Email is invalid')
        .required('Please enter your email'),
    password: yup.string().required('Password is require'),
});

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: theme.spacing(4),
        position: 'relative',
        width: '500px',
    },
    avatar: {
        backgroundColor: theme.palette.secondary.main,
        margin: '0 auto',
    },
    title: {
        textAlign: 'center',
        margin: theme.spacing(2, 0, 2, 0),
    },

    submit: {
        margin: theme.spacing(3, 0, 2, 0),
    },
    progress: {
        position: 'absolute',
        top: theme.spacing(1),
        left: 0,
        right: 0,
    },
}));

Login.propTypes = {
    closeDialog: PropTypes.func,
};

Login.defaultProps = {
    closeDialog: null,
};

function Login(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const { closeDialog } = props;

    const {
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            identifier: '',
            password: '',
        },
    });

    const handleSubmitForm = async (data, e) => {
        try {
            const action = login(data);
            const resultAction = await dispatch(action);
            const user = unwrapResult(resultAction);
            console.log('newuser', user);

            reset();
            e.target.reset();
            if (closeDialog) {
                closeDialog();
            }
        } catch (error) {
            enqueueSnackbar(error.message, { variant: 'error' });
        }
    };

    return (
        <div className={classes.root}>
            {isSubmitting && <LinearProgress className={classes.progress} />}
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography className={classes.title} component="h3" variant="h5">
                Sign In
            </Typography>
            <form onSubmit={handleSubmit(handleSubmitForm)}>
                <InputField
                    control={control}
                    name="identifier"
                    errors={errors}
                    label="Email"
                ></InputField>
                <PasswordField
                    control={control}
                    name="password"
                    errors={errors}
                    label="Password"
                ></PasswordField>

                <Button
                    disabled={isSubmitting}
                    type="submit"
                    className={classes.submit}
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="large"
                >
                    Sign in
                </Button>
            </form>
        </div>
    );
}

export default Login;
