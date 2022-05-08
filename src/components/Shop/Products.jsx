import ProductItem from './ProductItem';
import classes from './Products.module.css';

const SEED = [
    {
        id: 'item01',
        title: 'Test Item 1',
        price: 6,
        description: 'For testing purposes!',
    },
    {
        id: 'item02',
        title: 'Test Item 2',
        price: 20,
        description: 'For testing purposes!',
    },
    {
        id: 'item03',
        title: 'Test Item 3',
        price: 1,
        description: 'For testing purposes!',
    },
];

const Products = props => {
    const itemsList = SEED.map(item => (
        <ProductItem key={item.id} item={item} />
    ));

    return (
        <section className={classes.products}>
            <h2>Buy your favorite products</h2>
            <ul>{itemsList}</ul>
        </section>
    );
};

export default Products;
