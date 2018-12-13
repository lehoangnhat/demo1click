import initialState from './initialState';

/**
 * Takes an empty array as initial state, then like the todo-example: either spreads
 * and adds a new item to the cart array, or removes the object with the specified ID
 */
export default function cart(state = initialState.cart, action) {
    switch (action.type) {
        case 'ADD':
            //If 'ADD' from 'cartActions.js', spread the previous state, and
            //add the new item. This will result in a new array with an added item
            return [...state, action.item];
        case 'REMOVE':
            //If 'REMOVE' from 'cartActions.js', return a new array without the
            //item with the ID we clicked on. filter returns a new array, don't
            //have to spread here
            let newCart = [...state];
            newCart.splice(action.item, 1);
            return newCart;
            //return state.filter( i => i.id !== action.item.id);
        case 'CHECKOUT':

            return [];
        default:
            return state;
    }
};