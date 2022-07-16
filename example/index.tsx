import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Button } from '../dist';

import '../dist/priyang-react-component-lib.cjs.development.css';

const App = () => {
   return (
      <div>
         <Button variant="primary">Hello</Button>
      </div>
   );
};

ReactDOM.render(<App />, document.getElementById('root'));
