import * as React from 'react';
import styles from './CalendarSample.module.scss';
import type { ICalendarSampleProps } from './ICalendarSampleProps';
import { Calendar } from '@pnp/spfx-controls-react/lib/calendar';
import { IEvent } from '@pnp/spfx-controls-react/lib/calendar';
import * as strings from 'CalendarSampleWebPartStrings';

export default class CalendarSample extends React.Component<ICalendarSampleProps> {
  private events: IEvent[] = [
    {
      id: '1',
      title: 'Weekly Sync: Development Team',
      start: '2025-05-29T09:00:00',
      end: '2025-05-29T12:00:00',
      location: 'Microsoft Teams',
      attendees: [{ id: '', name: 'GZ', email: '' }, { id: '', name: 'Test user', email: '' }],
      category: 'Meeting',
      isOnlineMeeting: true,
    },
    {
      id: '2',
      title: 'Project Deadline',
      start: '2025-05-20T23:59:00',
      end: '2025-05-21T23:59:00',
      category: 'Deadline',
      importance: 'High',
    },
    {
      id: '3',
      title: 'Test Event',
      start: '2025-05-25T23:59:00',
      end: '2025-05-26T23:59:00',
      category: 'Test category',
      importance: 'normal',
    },
    {
      id: '4',
      title: 'Project Deadline',
      start: '2025-05-16T23:59:00',
      end: '2025-05-17T23:59:00',
      category: 'Deadline',
      importance: 'High',
    },
  ];

  public render(): React.ReactElement<ICalendarSampleProps> {
    return (
      <section className={styles.calendarSample}>
        <h3>{strings.Title}</h3>
        <Calendar
          events={this.events}
          height={800}
          onViewChange={(view) => console.log(`View changed to: ${view}`)}
          onDayChange={(date) => console.log(`Day changed to: ${date}`)}
          onWeekChange={(date) => console.log(`Week changed to: ${date}`)}
          onMonthChange={(date) => console.log(`Month changed to: ${date}`)}
          onNext={(date) => console.log(`Navigated to next date: ${date}`)}
          onPrev={(date) => console.log(`Navigated to previous date: ${date}`)}
          onDaySlotClick={(date => console.log(`Day slot clicked: ${date}`))}
        />
      </section>
    );
  }
}
