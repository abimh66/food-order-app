import { useContext, useState } from 'react';
import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import Checkout from './Checkout';

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

  const cartItemRemoveHandler = (item) => {
    cartCtx.removeItem(item);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item, i) => (
        <CartItem
          name={item.name}
          price={item.price}
          amount={item.amount}
          onRemove={cartItemRemoveHandler.bind(null, item)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      'https://react-project-abimh66-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json',
      {
        method: 'POST',
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }
    );

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const modalContent = (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout ? (
        <Checkout
          onCancel={() => setIsCheckout(false)}
          onSubmitOrder={submitOrderHandler}
        />
      ) : (
        <div className={classes.actions}>
          <button className={classes['button--alt']} onClick={props.onHideCart}>
            Close
          </button>
          <button
            className={classes.button}
            onClick={() => setIsCheckout(true)}>
            Order
          </button>
        </div>
      )}
    </>
  );
  const submittingModalContent = <p>Sending order data...</p>;
  const submittedModalContent = (
    <>
      <p>Successfully sent the order✅</p>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onHideCart}>
          Close
        </button>
      </div>
    </>
  );

  return (
    <Modal onHideCart={props.onHideCart}>
      {!isSubmitted && !isSubmitting && modalContent}
      {isSubmitting && submittingModalContent}
      {!isSubmitting && isSubmitted && submittedModalContent}
    </Modal>
  );
};

export default Cart;
