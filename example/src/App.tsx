import React, { useState } from 'react';
import reactLogo from './assets/react.svg';
import { FormControl, Input, Label } from 'react-component-lib';
import type { Badge } from 'react-component-lib';
import 'react-component-lib/dist/index.css';

// import '../../dist/index.css';

function App() {
   const [count, setCount] = useState(0);
   const [selectedDate, setSelectedDate] = React.useState(new Date());

   return (
      <div className="App">
         <FormControl className="flex flex-col">
            <Label htmlFor="Search" size="medium">
               Search
            </Label>
            <Input type="text" id="Search" InputSize="medium" />
         </FormControl>
      </div>
   );
}

export default App;
