import { useDispatch } from 'react-redux';

import { addCartItem } from '../../store/cartSlice';

import Card from '../UI/Card';
import classes from './ProductItem.module.css';

const ProductItem = ({ item }) => {
    const dispatch = useDispatch();

    const { id, title, price, description } = item;

    const addToCartHandler = () => {
        dispatch(addCartItem({ id, item }));
    };

    return (
        <li className={classes.item}>
            <Card>
                <header>
                    <h3>{title}</h3>
                    <div className={classes.price}>${price.toFixed(2)}</div>
                </header>
                <p>{description}</p>
                <div className={classes.actions}>
                    <button onClick={addToCartHandler}>Add to Cart</button>
                </div>
            </Card>
        </li>
    );
};

export default ProductItem;
