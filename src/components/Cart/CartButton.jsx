import { useDispatch, useSelector } from 'react-redux';
import { showCartChange } from '../../store/cartSlice';

import classes from './CartButton.module.css';

const CartButton = props => {
    const { items } = useSelector(state => state.cart);
    const dispatch = useDispatch();

    let totalItemNum = 0;
    items.forEach(item => (totalItemNum += item.quantity));

    const showCartChangeHandler = () => {
        dispatch(showCartChange());
    };

    return (
        <button className={classes.button} onClick={showCartChangeHandler}>
            <span>My Cart</span>
            <span className={classes.badge}>{totalItemNum}</span>
        </button>
    );
};

export default CartButton;
