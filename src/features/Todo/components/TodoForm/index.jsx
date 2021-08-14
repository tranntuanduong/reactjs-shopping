import React from 'react';
import PropTypes from 'prop-types';
import InputField from '../../../../components/FormControls/InputField';
import { useForm } from 'react-hook-form';

TodoForm.propTypes = {
    onSubmit: PropTypes.func,
};

TodoForm.defaultProps = {
    onSubmit: null,
};

function TodoForm(props) {
    const form = useForm({
        defaultValues: {
            title: '',
        },
    });

    const handleSubmit = (values) => {
        console.log('Todo form:', values);
    };

    return (
        <form onSubmit={form.handleSubmit(handleSubmit)}>
            Todo Form
            <InputField name="title" lable="todo" form={form}></InputField>
        </form>
    );
}

export default TodoForm;
