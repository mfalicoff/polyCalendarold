import { calendarModel, dayModel, weekModel } from '@models/calendar.model';

class calendarService {
  public calendar = calendarModel;
  public week = weekModel;
  public day = dayModel;

  public async getCalendar(): Promise<any> {
    return this.calendar.find({}).populate({
      path: 'weeks',
      populate: {
        path: 'weekdays',
      },
    });
  }
}

export default calendarService;
