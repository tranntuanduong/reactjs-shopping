import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import QuantityField from '../../../components/FormControls/QuantityField';

AddToCartForm.propTypes = {
    onSubmit: PropTypes.func,
};

const schema = yup.object().shape({
    quantity: yup
        .number()
        .required('Please enter quantity')
        .min(1, 'Minimum value is 1')
        .typeError('Please enter a number'),
});

function AddToCartForm({ onSubmit = null }) {
    const {
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
        setValue,
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            quantity: 1,
        },
    });

    const handleSubmitForm = async (data, e) => {
        if (onSubmit) {
            await onSubmit(data);
        }
    };

    return (
        <form onSubmit={handleSubmit(handleSubmitForm)}>
            <QuantityField
                control={control}
                errors={errors}
                name="quantity"
                label="Quantity"
                setValue={setValue}
            />
            <Button
                disabled={isSubmitting}
                type="submit"
                variant="contained"
                color="primary"
                size="large"
            >
                Add to cart
            </Button>
        </form>
    );
}

export default AddToCartForm;
