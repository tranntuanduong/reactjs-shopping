import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import InputField from '../../../../components/FormControls/InputField';

const schema = yup.object().shape({
    name: yup.string().required('please enter title').min(5, 'Title is too short'),
    thumbnailUrl: yup.string(),
});

TodoForm.propTypes = {
    onSubmit: PropTypes.func,
};

TodoForm.defaultProps = {
    onSubmit: null,
};

function TodoForm(props) {
    const {
        handleSubmit,
        control,
        formState: { errors, touchedFields },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            thumbnailUrl: 'https://huyhoanhotel.com/wp-content/uploads/2016/05/765-default-avatar-320x320.png',
        },
    });

    const handleSubmitForm = (data, e) => {
        const { onSubmit } = props;
        if (onSubmit) {
            onSubmit(data);
        }
        // reset form values to default
        reset();

        // reset value of input tag
        e.target.reset();
    };

    return (
        <form onSubmit={handleSubmit(handleSubmitForm)}>
            <InputField
                control={control}
                name="name"
                errors={errors}
                touchedFields={touchedFields}
                label="Title"
            ></InputField>
            <InputField
                control={control}
                name="thumbnailUrl"
                errors={errors}
                touchedFields={touchedFields}
                label="Image"
            ></InputField>

            <input type="submit" />
        </form>
    );
}

export default TodoForm;
