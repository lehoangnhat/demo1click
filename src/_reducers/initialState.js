/**
 * This is an object that represents the state, it can be a good idea to
 * put it in a separate file so you can reference it easier. It returns the 
 * default products and an empty array as the cart, initialstate for 'cart'
 */
import {loadState, saveState} from '../_helper/localStorage';

const persistedState = loadState();

export default {
  
  cart: persistedState.cart,
  products: persistedState.products,
  
}