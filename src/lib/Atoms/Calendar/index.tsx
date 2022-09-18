import { withChakraProps } from '../../Utils/withChakraProps';
import {
   Calendar,
   CalendarBody,
   CalendarDays,
   CalendarFooter,
   CalendarMonths,
   CalendarTitle,
} from './Calendar';

const ChakraCalendar = withChakraProps(Calendar);
const ChakraTitle = withChakraProps(CalendarTitle);
const ChakraBody = withChakraProps(CalendarBody);
const ChakraMonths = withChakraProps(CalendarMonths);
const ChakraDays = withChakraProps(CalendarDays);
const ChakraFooter = withChakraProps(CalendarFooter);

export {
   ChakraCalendar as Calendar,
   ChakraTitle as CalendarTitle,
   ChakraBody as CalendarBody,
   ChakraMonths as CalendarMonths,
   ChakraDays as CalendarDays,
   ChakraFooter as CalendarFooter,
};
