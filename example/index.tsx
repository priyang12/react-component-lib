import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Button, TextArea, Input, Label } from '../dist';

import '../dist/react-component-lib.cjs.development.css';

const App = () => {
   return (
      <div>
         <Label htmlFor="input-1">Label</Label>
         <TextArea />

         <Input type="password" disabled InputSize="medium" />
         <Button variant="secondary" ellipsis={true}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa illo
            nam id eligendi cumque consequatur ad eos exercitationem explicabo
            deleniti nobis dolorum molestiae architecto animi a magni ducimus
            error excepturi ratione vel, enim voluptatem accusantium! Laudantium
            ut neque quasi distinctio! Necessitatibus, quam sit nisi tempora
            quaerat earum ipsum magnam nobis illum explicabo aliquid?
            Accusantium corrupti mollitia exercitationem, porro officiis a
            inventore hic cupiditate, enim officia numquam, aut voluptates
            minima adipisci unde. Nesciunt perferendis ad velit fugit vitae
            laudantium, fugiat similique! Sapiente porro voluptatem nisi eius
            dignissimos, laborum voluptatibus hic ab eaque ipsam. Dolores nemo,
            neque placeat ipsam architecto debitis ad.
         </Button>
      </div>
   );
};

ReactDOM.render(<App />, document.getElementById('root'));
