import { useDispatch } from 'react-redux';

import { addCartItem, removeCartItem } from '../../store/cartSlice';

import classes from './CartItem.module.css';

const CartItem = ({ item }) => {
    const dispatch = useDispatch();

    const { id, title, quantity, total, price } = item;

    const addCartItemHandler = () => {
        dispatch(addCartItem({ id }));
    };

    const removeCartItemHandler = () => {
        dispatch(removeCartItem({ id }));
    };

    return (
        <li className={classes.item}>
            <header>
                <h3>{title}</h3>
                <div className={classes.price}>
                    ${total.toFixed(2)}{' '}
                    <span className={classes.itemprice}>
                        (${price.toFixed(2)}/item)
                    </span>
                </div>
            </header>
            <div className={classes.details}>
                <div className={classes.quantity}>
                    x <span>{quantity}</span>
                </div>
                <div className={classes.actions}>
                    <button onClick={removeCartItemHandler}>-</button>
                    <button onClick={addCartItemHandler}>+</button>
                </div>
            </div>
        </li>
    );
};

export default CartItem;
