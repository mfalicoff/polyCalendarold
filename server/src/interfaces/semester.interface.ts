import { Calendar } from '@interfaces/calendar.interface';

export interface Semester {
  _id?: string;
  name: string;
  calendar: Calendar;
}
