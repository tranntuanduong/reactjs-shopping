import { Box, makeStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import FilterSkeletons from './FilterSkeletons';

FilterByCategory.propTypes = {
    onChange: PropTypes.func,
    categoiesLoading: PropTypes.bool,
    categories: PropTypes.array,
};

const useStyles = makeStyles((theme) => ({
    menu: {
        padding: 0,
        margin: 0,
        listStyleType: 'none',
        '& > li': {
            marginTop: theme.spacing(1),
            transition: 'all 0.25s',
            '&:hover': {
                cursor: 'pointer',
                color: theme.palette.primary.main,
            },
        },
    },
}));

function FilterByCategory({ onChange, categoiesLoading, categories }) {
    // const [categories, setCategories] = useState([]);
    // const [loading, setLoading] = useState(true);
    const classes = useStyles();

    // useEffect(() => {
    //     (async () => {
    //         try {
    //             const categories = await categoryApi.getAll();
    //             console.log(categories);
    //             setCategories(
    //                 categories.map((x) => ({
    //                     id: x.id,
    //                     name: x.name,
    //                 }))
    //             );
    //             setLoading(false);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     })();
    // }, []);

    const handleCategoryClick = (category) => {
        if (onChange) onChange(category.id);
    };

    return (
        <>
            {categoiesLoading && <FilterSkeletons />}
            {!categoiesLoading && (
                <Box>
                    <Typography variant="subtitle2">DANH MỤC SẢN PHẨM</Typography>
                    <ul className={classes.menu}>
                        {categories.map((category) => (
                            <li
                                key={category.id}
                                onClick={() => handleCategoryClick(category)}
                            >
                                <Typography variant="body2"> {category.name}</Typography>
                            </li>
                        ))}
                    </ul>
                </Box>
            )}
        </>
    );
}

export default FilterByCategory;
