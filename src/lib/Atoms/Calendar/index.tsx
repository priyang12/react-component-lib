import { withChakraProps } from '../../Utils/withChakraProps';
import {
   Calendar,
   CalendarBody,
   CalendarDays,
   CalendarFooter,
   CalendarWeeks,
   CalendarTitle,
} from './Calendar';

const ChakraCalendar = withChakraProps(Calendar);
const ChakraTitle = withChakraProps(CalendarTitle);
const ChakraBody = withChakraProps(CalendarBody);
const ChakraWeeks = withChakraProps(CalendarWeeks);
const ChakraDays = withChakraProps(CalendarDays);
const ChakraFooter = withChakraProps(CalendarFooter);

export {
   ChakraCalendar as Calendar,
   ChakraTitle as CalendarTitle,
   ChakraBody as CalendarBody,
   ChakraWeeks as CalendarMonths,
   ChakraDays as CalendarDays,
   ChakraFooter as CalendarFooter,
};
