const combineReducers = reducers => {
   return (state, action) => {
      return Object.keys(reducers).reduce((acc, prop) => {
         return {
            ...acc,
            ...reducers[prop]({ [prop]: acc[prop] }, action),
         };
      }, state);
   };
};
//stackoverflow.com/questions/57296549/hooks-combine-multiple-reducers-when-using-usereducer

https: const combineReducers2 = slices => (state, action) =>
   Object.keys(slices).reduce(
      // use for..in loop, if you prefer it
      (acc, prop) => ({
         ...acc,
         [prop]: slices[prop](acc[prop], action),
      }),
      state
   );
