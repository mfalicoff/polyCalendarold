import { Document, Schema, model } from 'mongoose';
import { Day, Week, Calendar } from '@interfaces/calendar.interface';

const daySchema: Schema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  isThereSchool: {
    type: Boolean,
    required: true,
  },
  alternation: {
    type: String,
    required: false,
  },
});

const weekSchema: Schema = new Schema({
  weekdays: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Day',
    },
  ],
  weekNumber: {
    type: Number,
    required: true,
  },
});

const calendarSchema: Schema = new Schema({
  weeks: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Week',
    },
  ],
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  vacationWeek: {
    type: Schema.Types.ObjectId,
    ref: 'Week',
    required: true,
  },
});

export const dayModel = model<Day & Document>('Day', daySchema);
export const weekModel = model<Week & Document>('Week', weekSchema);
export const calendarModel = model<Calendar & Document>('Calendar', calendarSchema);
