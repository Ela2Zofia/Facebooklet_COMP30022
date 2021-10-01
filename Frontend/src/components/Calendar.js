import SchedulerComp from "../page-components/SchedulerComp";
import "../css/Calendar.css";

function Calendar() {

  // const currentDate = '2018-11-01';
  // const schedulerData = [
  //   { startDate: '2018-11-01T09:45', endDate: '2018-11-01T11:00', title: 'Meeting' },
  //   { startDate: '2018-11-01T12:00', endDate: '2018-11-01T13:30', title: 'Go to a gym' },
  // ];

  return (
    <div className="Container">
      <SchedulerComp className="Calendar"/>
    </div>
  )
}

export default Calendar;
