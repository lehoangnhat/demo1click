import initialState from './initialState';

/**
 * This is so we could extend the product array of the state,
 * this reducer takes the products array from 'initialState.js'
 * and returns it, nothing more. Not listening to any actions
 * at the moment. This will populate the state
 */
export default function products(state = initialState.products, action){
     return state;
};