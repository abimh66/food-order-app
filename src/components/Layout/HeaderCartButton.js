import { useState, useContext, useEffect } from 'react';

import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {
  const [btnIsBump, setBtnIsBump] = useState(false);
  const cartCtx = useContext(CartContext);

  const numberOfCartItems = cartCtx.items.reduce(
    (curNumber, item) => curNumber + +item.amount,
    0
  );

  const btnClass = `${classes.button} ${btnIsBump && classes.bump}`;

  useEffect(() => {
    if (cartCtx.items.length === 0) return;
    setBtnIsBump(true);

    const timer = setTimeout(() => setBtnIsBump(false), 300);

    return () => clearTimeout(timer);
  }, [cartCtx.items]);

  return (
    <button className={btnClass} onClick={props.onShowCart}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
