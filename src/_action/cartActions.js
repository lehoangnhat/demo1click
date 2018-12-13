
/**
 * We don't have to use the variable 'payload', we can also just name it: 'item'
 * @param {Object} item 
 */
export function addToCart(item) {
  return {
      type: 'ADD',
      item: item
  };
}

export function removeFromCart(item) {
  return {
      type: 'REMOVE',
      item: item
  };
}

export function cartCheckout() {
  return {
      type: 'CHECKOUT',
      
  }
}