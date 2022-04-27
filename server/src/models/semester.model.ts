import { Document, model, Schema } from 'mongoose';
import { Calendar } from '@interfaces/calendar.interface';

const calendarSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  calendar: {
    type: Schema.Types.ObjectId,
    ref: 'Calendar',
  },
});

const semesterModel = model<Calendar & Document>('Semester', calendarSchema);

export default semesterModel;
