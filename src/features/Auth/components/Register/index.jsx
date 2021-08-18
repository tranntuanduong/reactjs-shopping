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
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import InputField from '../../../../components/FormControls/InputField';
import PasswordField from '../../../../components/FormControls/PasswordField';
import { register } from '../../userSlice';

const schema = yup.object().shape({
    fullName: yup
        .string()
        .required('Please enter your name')
        .test(
            'should has at least tow words',
            'Please enter at least tow words.',
            (value) => {
                return value.trim().split(' ').length >= 2;
            }
        ),
    email: yup
        .string()
        .email('Email is invalid')
        .required('Please enter your email'),
    password: yup
        .string()
        .required('Password is require')
        .min(6, 'Enter at least 6 characters'),
    retypePassword: yup
        .string()
        .required('Please retype your password')
        .oneOf([yup.ref('password')], 'Password does not match'),
});

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: theme.spacing(4),
        position: 'relative',
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

Register.propTypes = {
    onSubmit: PropTypes.func,
};

Register.defaultProps = {
    onSubmit: null,
};

function Register(props) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const {
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            fullName: '',
            email: '',
            password: '',
            retypePassword: '',
        },
    });

    const handleSubmitForm = async (data, e) => {
        try {
            data.username = data.email;

            console.log('Submit form register:', data);
            const action = register(data);
            const resultAction = await dispatch(action);
            const user = unwrapResult(resultAction);
            console.log('newuserL', user);

            // reset form values to default
            reset();
            // reset value of input tag
            e.target.reset();
        } catch (error) {
            console.log('Failed to register:', error.message);
        }
    };

    return (
        <div className={classes.root}>
            {isSubmitting && <LinearProgress className={classes.progress} />}
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography className={classes.title} component="h3" variant="h5">
                Create an Account
            </Typography>
            <form onSubmit={handleSubmit(handleSubmitForm)}>
                <InputField
                    control={control}
                    name="fullName"
                    errors={errors}
                    label="Full Name"
                ></InputField>
                <InputField
                    control={control}
                    name="email"
                    errors={errors}
                    label="Email"
                ></InputField>
                <PasswordField
                    control={control}
                    name="password"
                    errors={errors}
                    label="Password"
                ></PasswordField>
                <PasswordField
                    control={control}
                    name="retypePassword"
                    errors={errors}
                    label="Retype Password"
                ></PasswordField>
                <Button
                    disabled={isSubmitting}
                    type="submit"
                    className={classes.submit}
                    fullWidth
                    variant="contained"
                    color="primary"
                >
                    Create an Account
                </Button>
            </form>
        </div>
    );
}

export default Register;
