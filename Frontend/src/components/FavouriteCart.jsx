import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styles from '../styles/favouriteCart.module.css'
import '../styles/cartAnimation.css'

export default function FavouriteCart(props) {
  return (
    <div className={styles.wrapper}>
      <div className='border border-1 rounded p-2'>
        <div className={`border-bottom border-2 ${styles.cartTitle}`}>Улюблене</div>
        <div className='pt-2'>
          <TransitionGroup>
            {props.products &&
              props.products.map((element) => {
                const nodeRef = React.createRef(null);
                return (
                  <CSSTransition key={element.id} nodeRef={nodeRef} classNames="product" timeout={500}>
                    <div ref={nodeRef}>
                      <div className={styles.cartItemTitle}>Назва:</div> {element.name}
                      <br />
                      <button
                        type='button'
                        className='btn btn-danger mb-3'
                        onClick={() => props.deleteProduct(element.id)}
                      >
                        Видалити
                      </button>
                    </div>
                  </CSSTransition>
                );
              })}
          </TransitionGroup>
        </div>
      </div>
    </div>
  );
}