import React from 'react'
import Meeting from '../page-components/Meeting'
import {connect} from "react-redux";
import clearSelected from '../actions/clearSelected';
import setMeetings from "../actions/setMeetings";
import endEdit from '../actions/endEdit';
import Network from '../util/Network'
import MeetingTopbar from "../page-components/MeetingTopBar";
import "../css/Meetings.css"
class Meetings extends React.Component{
    //TODO: time stamp
    

    async componentDidMount() {
        const serverData = await Network.fetchMeetingsNet(this.props.user)
        this.props.setMeetings(serverData)
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
                        : this.props.meetings.map(
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

