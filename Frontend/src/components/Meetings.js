import React from 'react'
import Meeting from '../page-components/Meeting'
import {connect} from "react-redux";
import addMeeting from "../actions/addMeeting";
import deleteMeeting from "../actions/deleteMeeting";
import setMeetings from "../actions/setMeetings";
import Network from '../util/Network'
import MeetingTopbar from "../page-components/MeetingTopBar";
import "../css/Meetings.css"
class Meetings extends React.Component{
    //TODO: time stamp

    async componentDidMount() {
        const serverData = await Network.fetchMeetingsNet(this.props.user)
        this.props.setMeetings(serverData)
    }

    sortMeetings = (a,b)=>{
      let dateA = new Date(`${a.date} ${a.time}`)
      let dateB = new Date(`${b.date} ${b.time}`)
      if(dateA > dateB){
        return -1
      }
      else if(dateA < dateB){
        return 1
      }
      else{
        return 0
      }
    }




    render(){
        // return(
        //     <div className="Container">
        //         <Topbar />
        //         <h1>This is meetings page</h1>
        //     </div>
        // )
        return (
            <div className="Container">
                <MeetingTopbar/>
                <div className="InnerContainer">
                    {this.props.meetings.length === 0 ?
                        <h3>No Meeting</h3>
                        : this.props.meetings.sort(this.sortMeetings).map(
                            (meeting) =>{
                                return(
                                    <Meeting
                                        isSelected = {this.props.selected.includes(meeting._id)}
                                        meeting = {meeting}

                                    />)
                            }
                        )}
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({meetings: state.meetings, user: state.user, selected: state.selected}),
    {setMeetings}
)(Meetings)

