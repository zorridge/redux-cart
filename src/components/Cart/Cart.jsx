import { useSelector } from 'react-redux';

import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';

const Cart = props => {
    const { items } = useSelector(state => state.cart);

    const cartItemsList = items.map(item => (
        <CartItem key={item.id} item={item} />
    ));

    return (
        <Card className={classes.cart}>
            <h2>Your Shopping Cart</h2>
            <ul>{cartItemsList}</ul>
        </Card>
    );
};

export default Cart;
