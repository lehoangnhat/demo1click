import { combineReducers } from 'redux';
import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import cart from './cartReducer';
import products from './productsReducer';

const rootReducer = combineReducers({
    authentication,
    registration,
    cart,
    products,
});

export default rootReducer;
