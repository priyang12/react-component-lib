import { FormControl, Input, Label } from 'react-component-lib';
import 'react-component-lib/dist/index.css';

import { Button } from 'react-component-lib/dist/lib/Components/Button';
import {
   Badge,
   BadgeContainer,
} from 'react-component-lib/dist/lib/Components/Badge';
import 'react-component-lib/dist/Components/Badge/index.css';
import 'react-component-lib/dist/Components/Button/index.css';

// global css
import 'react-component-lib/dist/global.css';

function App() {
   return (
      <div className="flex flex-col items-center justify-center w-[100vw] h-full">
         {/* <FormControl className="flex flex-col">
            <Label htmlFor="Search" size="medium">
               Search
            </Label>
            <Input type="text" id="Search" InputSize="medium" />
            <Button text="Submit" variant="primary" isLoading={false} />
         </FormControl> */}

         <BadgeContainer>
            <div className="p-5 border-2 border-solid border-red-400 bg-[var(--bg-surface)]">
               <Badge
                  anchorOriginHorizontal="left"
                  anchorOriginVertical="top"
                  BadgeContent="1"
               />
               <p>container</p>
            </div>
         </BadgeContainer>
      </div>
   );
}

export default App;
