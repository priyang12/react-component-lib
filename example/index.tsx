import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Button, Ring } from '../dist';

import '../dist/react-component-lib.cjs.development.css';

const App = () => {
   return (
      <div>
         <Ring>
            <Button variant="secondary">Hello</Button>
         </Ring>
      </div>
   );
};

ReactDOM.render(<App />, document.getElementById('root'));
