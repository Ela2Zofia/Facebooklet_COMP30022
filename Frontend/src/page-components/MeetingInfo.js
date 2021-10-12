import React from "react";
import {connect} from 'react-redux'
import reactDom from "react-dom";
import {RiCloseLine} from "react-icons/ri";
import MeetingForm from "./MeetingForm";

class MeetingInfo extends React.Component{
    state = {
        isEdit:false
    }



    render(){
        let meeting = this.props.meeting
        if (this.props.open){
            if(!this.state.isEdit){
                return reactDom.createPortal(
                    <div className="ContactInfoBackground">

                        <div className="ContactInfo">

                            <div className="CloseButton">
                                <RiCloseLine className="button" onClick={ this.props.onClose } size={ 30 } />
                            </div>

                            <div className="ContactInfoInnerWrap">
                                <div className="MeetingDetail">

                                    <div className="Topic">{meeting.topic}</div>

                                    <div>Meeting Number: {meeting.meetingNumber}</div>
                                    <div>Password: {meeting.password}</div>
                                    <div><span>Link: </span> <a href={meeting.link}>{meeting.link}</a></div>
                                    <div>Date: {meeting.date}</div>
                                    <div>Start Time: {meeting.time}</div>
                                    <div>Duration: {meeting.duration} minutes</div>
                                    <div>Description: { meeting.description }</div>

                                    <div className="Participants">Participants: &nbsp;
                                        {meeting.participants.map((tag, key) => {
                                            if (key > 2) {
                                                return ""
                                            }
                                            return (
                                                <div key={key} className="Participant">{`${tag.firstName} ${tag.lastName}`}</div>
                                            )
                                        })}
                                    </div>

                                </div>

                                <button onClick={()=>{this.setState({isEdit:true})}}>Edit</button>
                            </div>
                        </div>

                    </div>
                    , document.getElementById( "portal" )
                )
            }
            else{
                return (<MeetingForm open = {this.state.isEdit} onClose = {()=>{this.setState({isEdit:false})}} meeting = {this.props.meeting}/>)
            }


        }
        else{
            return null
        }

    }
}


export default connect()(MeetingInfo)