import {Schema} from "mongoose";

export interface Day {
  _id?: string;
  date: Date;
  isThereSchool: boolean;
  alternation: String;
}

export interface Week {
  _id?: string;
  weekdays: Schema.Types.ObjectId;
  weekNumber: Number;
}

export interface Calendar {
  _id?: string;
  weeks: Schema.Types.ObjectId;
  startDate: Date;
  endDate: Date;
  vacationWeek: Schema.Types.ObjectId;
}
