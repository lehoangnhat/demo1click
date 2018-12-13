export const loadState = () => {
    try {
      const serializedState = sessionStorage.getItem('state');
      if (serializedState === null) {
        return {cart:[],
                products:[]};
      }
      console.log("abc")
      return JSON.parse(serializedState);
    } catch (err) {
      return null;
    }
  };

  export const saveState = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      sessionStorage.setItem('state', serializedState);
      console.log("save State");

    } catch (err) {
      // Ignore write errors.
    }
  };