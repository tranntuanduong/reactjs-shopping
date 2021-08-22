import { TextField } from '@material-ui/core';
import React from 'react';
import { Controller } from 'react-hook-form';

InputField.propTypes = {};

function InputField(props) {
    const { control, name, errors, label } = props;
    const hasError = errors[name]; /* && touchedFields[name]*/
    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, onBlur, value } }) => (
                <TextField
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    onChange={onChange}
                    onBlur={onBlur}
                    selected={value}
                    error={!!hasError}
                    // nhac lich su
                    // id="standard-error-helper-text"
                    label={label}
                    helperText={errors[name]?.message}
                />
            )}
        />
    );
}

export default InputField;
