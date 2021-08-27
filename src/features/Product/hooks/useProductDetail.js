import { useEffect, useState } from 'react';
import productApi from '../../../api/productApi';

export default function useProductDetail(productId) {
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const result = await productApi.get(productId);
                setProduct(result);
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        })();
    }, [productId]);

    return {
        product,
        loading,
    };
}
