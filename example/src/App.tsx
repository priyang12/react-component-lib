import React, { useState } from 'react';
import reactLogo from './assets/react.svg';
import { Button, Ring } from 'react-component-lib';
import 'react-component-lib/dist/index.css';

// import '../../dist/index.css';

function App() {
   const [count, setCount] = useState(0);
   const [selectedDate, setSelectedDate] = React.useState(new Date());

   return (
      <div className="App">
         <Ring>
            <Button>asdsad</Button>
         </Ring>
         <div>
            <a href="https://vitejs.dev" target="_blank">
               <img src="/vite.svg" className="logo" alt="Vite logo" />
            </a>
            <a href="https://reactjs.org" target="_blank">
               <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
         </div>
         <h1>Vite + React</h1>
         <div className="card">
            <button onClick={() => setCount(count => count + 1)}>
               count is {count}
            </button>
            <p>
               Edit <code>src/App.tsx</code> and save to test HMR
            </p>
         </div>
         <p className="read-the-docs">
            Click on the Vite and React logos to learn more
         </p>
      </div>
   );
}

export default App;
