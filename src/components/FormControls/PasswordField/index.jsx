import { FormHelperText } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useState } from 'react';
import { Controller } from 'react-hook-form';

PasswordField.propTypes = {};

function PasswordField(props) {
    const { control, name, errors, label } = props;
    const hasError = errors[name]; /* && touchedFields[name]*/
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword((x) => !x);
    };

    return (
        <div>
            <FormControl
                error={!!hasError}
                fullWidth
                margin="normal"
                variant="outlined"
            >
                {/* htmlFor={name} nhac lai lich su */}
                <InputLabel>{label}</InputLabel>
                <Controller
                    name={name}
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <OutlinedInput
                            id={name}
                            type={showPassword ? 'text' : 'password'}
                            label={label}
                            onChange={onChange}
                            onBlur={onBlur}
                            selected={value}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={toggleShowPassword}
                                        edge="end"
                                    >
                                        {' '}
                                        {showPassword ? (
                                            <Visibility />
                                        ) : (
                                            <VisibilityOff />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    )}
                />

                <FormHelperText error={!!hasError}>
                    {errors[name]?.message}
                </FormHelperText>
            </FormControl>
        </div>
    );
}

export default PasswordField;
