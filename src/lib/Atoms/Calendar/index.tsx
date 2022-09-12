import { Calendar, CalendarMounts, CalendarTitle } from './Calendar';
import { withChakraProps } from '../../Utils/withChakraProps';

const ChakraCalendar = withChakraProps(Calendar);
const ChakraCalendarMounts = withChakraProps(CalendarMounts);
const ChakraCalendarTitle = withChakraProps(CalendarTitle);

export {
   ChakraCalendar as Calendar,
   ChakraCalendarMounts as CalendarDays,
   ChakraCalendarTitle as CalendarTitle,
};
