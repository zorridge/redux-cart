import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchCartItems, showNotification } from './store/cartSlice';

import Notification from './components/UI/Notification';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';

let firstMount = true;

function App() {
    const { isChanged, isShowCart, items, notification } = useSelector(
        state => state.cart
    );
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchCartDataRequest = async () => {
            const response = await fetch(
                'https://react-reactcha-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json'
            );

            if (!response.ok) {
                throw new Error('Sending cart data failed...');
            }

            const responseData = await response.json();
            dispatch(fetchCartItems({ items: responseData }));
        };

        fetchCartDataRequest().catch(err => {
            dispatch(
                showNotification({
                    status: 'failure',
                    title: 'Failed...',
                    message: 'Failed to fetch cart data!',
                })
            );
        });
    }, [dispatch]);

    useEffect(() => {
        const sendCartDataRequest = async () => {
            if (firstMount || !isChanged) {
                firstMount = false;
                return;
            }

            dispatch(
                showNotification({
                    status: 'pending',
                    title: 'Sending...',
                    message: 'Uploading cart data!',
                })
            );

            const response = await fetch(
                'https://react-reactcha-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json',
                {
                    method: 'PUT',
                    body: JSON.stringify(items),
                }
            );

            if (!response.ok) {
                throw new Error('Sending cart data failed...');
            }

            dispatch(
                showNotification({
                    status: 'success',
                    title: 'Success...',
                    message: 'Successfully uploaded cart data!',
                })
            );
        };

        sendCartDataRequest().catch(err => {
            dispatch(
                showNotification({
                    status: 'failure',
                    title: 'Failed...',
                    message: 'Failed to upload cart data!',
                })
            );
        });
    }, [items, isChanged, dispatch]);

    return (
        <>
            {notification && <Notification notification={notification} />}
            <Layout>
                {isShowCart && <Cart />}
                <Products />
            </Layout>
        </>
    );
}

export default App;
