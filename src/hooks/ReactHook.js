import React, { useState, useEffect, useReducer } from 'react';

// const initialState = {count: 0};

// function reducer(state, action) {
//   switch (action.type) {
//     case 'increment':
//       return {count: state.count + 1};
//     case 'decrement':
//       return {count: state.count - 1};
//     default:
//       throw new Error();
//   }
// }

// function ReactHook() {
//   const [state, dispatch] = useReducer(reducer, initialState);
//   return (
//     <>
//       Count: {state.count}
//       <button onClick={() => dispatch({type: 'decrement'})}>-</button>
//       <button onClick={() => dispatch({type: 'increment'})}>+</button>
//     </>
//   );
// }


function ReactHook() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
  });


  return (
    <div>
      <p>You clicked {count} times</p>
      <button className="btn btn-info" onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

export default ReactHook;