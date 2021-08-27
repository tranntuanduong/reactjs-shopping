import {
    Box,
    FormHelperText,
    IconButton,
    makeStyles,
    Typography,
} from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import { Controller } from 'react-hook-form';

QuantityField.propTypes = {};

const useStyles = makeStyles((theme) => ({
    root: {},

    box: {
        maxWidth: '100px',
        height: '38px',
    },

    mb8: {
        paddingBottom: theme.spacing(1),
    },
}));

function QuantityField(props) {
    const { control, name, errors, label, setValue } = props;
    const hasError = errors[name]; /* && touchedFields[name]*/

    const classes = useStyles();

    const changeValue = (value, x) => {
        if (!value) value = 0;
        let newValue = Number.parseInt(value) + x;
        if (newValue <= 0) newValue = 1;
        return newValue;
    };
    // console.log(value);
    return (
        <div>
            <FormControl error={!!hasError} fullWidth margin="normal" variant="outlined">
                {/* htmlFor={name} nhac lai lich su */}
                <InputLabel>{}</InputLabel>
                <Typography className={classes.mb16}>{label}</Typography>
                <Controller
                    name={name}
                    control={control}
                    render={({ field: { onChange, onBlur, value = 1, name } }) => (
                        <Box>
                            <IconButton
                                onClick={() => setValue(name, changeValue(value, -1))}
                            >
                                <RemoveCircleOutlineIcon />
                            </IconButton>
                            <OutlinedInput
                                className={classes.box}
                                id={name}
                                type="number"
                                value={value}
                                onChange={onChange}
                                onBlur={onBlur}
                            />
                            <IconButton
                                onClick={() => setValue(name, changeValue(value, 1))}
                            >
                                <AddCircleOutlineIcon />
                            </IconButton>
                        </Box>
                    )}
                />

                <FormHelperText error={!!hasError}>
                    {errors[name]?.message}
                </FormHelperText>
            </FormControl>
        </div>
    );
}

export default QuantityField;
