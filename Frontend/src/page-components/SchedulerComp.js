import Paper from '@material-ui/core/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  WeekView,
  Appointments,
  Toolbar,
  DateNavigator,
  TodayButton,
  CurrentTimeIndicator
} from '@devexpress/dx-react-scheduler-material-ui';

function SchedulerComp() {
  const currentDate = new Date().toISOString().slice( 0, 10 );
  const schedulerData = [
    { startDate: '2018-11-01T09:45', endDate: '2018-11-01T11:00', title: 'Meeting' },
    { startDate: '2018-11-01T12:00', endDate: '2018-11-01T13:30', title: 'Go to a gym' },
  ];



  return (
    <Paper className="Paper">
      <Scheduler
        data={ schedulerData }
      >
        <ViewState
          defaultCurrentDate={ currentDate }
        />
        <WeekView
          startDayHour={ 6 }
          endDayHour={ 19 }
        />
        <Toolbar />
        <DateNavigator />
        <TodayButton />
        <Appointments />
        <CurrentTimeIndicator
          shadePreviousCells={ true }
          shadePreviousAppointments={ true }
          updateInterval={ 120000 }
        />
      </Scheduler>
    </Paper>
  );
}

export default SchedulerComp;


