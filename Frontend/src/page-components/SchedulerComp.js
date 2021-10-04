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
import { useSelector, useDispatch } from 'react-redux';
import Network from "../util/Network";
import setMeetings from '../actions/setMeetings';
import { useEffect } from 'react';

function SchedulerComp() {

  const dispatch = useDispatch();
  const user = useSelector( state => state.user );
  const meetings = useSelector( state => state.meetings );


  useEffect( () => {
    async function getMeetings() {
      const data = await Network.fetchMeetingsNet( user );
      dispatch( setMeetings( data ) );
    }

    getMeetings();

  }, [] )

  const currentDate = new Date().toISOString().slice( 0, 10 );


  const schedulerData = meetings.map( ( meeting ) => {
    console.log(meeting)
    const startDate = new Date( meeting.date + "T" + meeting.time );

    const endDate = new Date( startDate );
    endDate.setMinutes( endDate.getMinutes() + parseInt( meeting.duration ) );

    return {
      startDate: startDate.toJSON(),
      endDate: endDate.toJSON(),
      title: meeting.topic
    }
  } );


  return (
    <Paper className="Paper">
      <Scheduler
        data={ schedulerData }
      >
        <ViewState
          defaultCurrentDate={ currentDate }
        />
        <WeekView
          startDayHour={ 0 }
          endDayHour={ 24 }
          cellDuration={ 60 }
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


