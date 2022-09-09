import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Button, Input, Label, FormControl } from '../dist';

import '../dist/react-component-lib.cjs.development.css';

const App = () => {
   return (
      <div>
         <FormControl overlay>
            <Label htmlFor="Search" size="medium" alert="Alert">
               Search
            </Label>
            <Input type="text" id="Search" InputSize="large" />
            <Button fontSize="3xl">Search</Button>
         </FormControl>
      </div>
   );
};

ReactDOM.render(<App />, document.getElementById('root'));
