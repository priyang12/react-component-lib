import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Button, TextArea, Input, Label, FormInput } from '../dist';

import '../dist/react-component-lib.cjs.development.css';

const App = () => {
   return (
      <div>
         <FormInput>
            <Label htmlFor="Search" size="medium" alert="Alert">
               Search
            </Label>
            <Input type="text" id="Search" InputSize="large" />
            <Button fontSize="3xl">Search</Button>
         </FormInput>
      </div>
   );
};

ReactDOM.render(<App />, document.getElementById('root'));
