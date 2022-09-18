import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
   Button,
   Input,
   Label,
   FormControl,
   Calendar,
   CalendarTitle,
   CalendarBody,
   CalendarMonths,
   CalendarDays,
   CalendarFooter,
} from '../dist';

import '../dist/react-component-lib.cjs.development.css';

const App = () => {
   const [selectedDate, setSelectedDate] = React.useState(new Date());

   return (
      <div>
         <FormControl overlay>
            <Label htmlFor="Search" size="medium" alert="Alert">
               Search
            </Label>
            <Input type="text" id="Search" InputSize="large" />
            <Button fontSize="3xl">Search</Button>
         </FormControl>
         <Calendar
            className="date-picker-cal glass-calendar"
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            padding={10}
         >
            <CalendarTitle selectedDate={selectedDate} id="CalendarTitle" />
            <CalendarBody>
               <CalendarMonths />
               <CalendarDays
                  id="CalendarDays"
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
               />
            </CalendarBody>
            <CalendarFooter setSelectedDate={setSelectedDate} />
         </Calendar>
      </div>
   );
};

ReactDOM.render(<App />, document.getElementById('root'));
