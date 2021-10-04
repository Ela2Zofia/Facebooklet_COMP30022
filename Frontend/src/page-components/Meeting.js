import React from "react";
import {connect} from 'react-redux'
import {RiMoreLine} from "react-icons/ri";
import addSelected from "../actions/addSelected";
import removeSelected from "../actions/removeSelected";
import MeetingInfo from "./MeetingInfo";


class Meeting extends React.Component {

    state = {
        isOpen: false
    }

    changeSelected = () => {

        if (!this.props.isSelected){
            this.props.addSelected(this.props.meeting._id);
        }else{
            this.props.removeSelected(this.props.meeting._id);
        }
    }

    checkEdit = () => {
        if ( this.props.isEdit ) {
            return (<input
                type="checkbox"
                style={ { transform: "scale(2.5)" } }
                onChange={ () => { this.changeSelected() } }
                checked={ this.props.isSelected } />)
        } else {
            return <RiMoreLine onClick={ ()=>{this.setState({isOpen:true}) } } size={ 30 } className="more" />
        }
    }

    render() {
        const {meeting} = this.props;

        return <div className="Meeting">

                <div className="MeetingHeader">
                    <div className="Topic">{meeting.topic}</div>
                    <div className="MeetingID">{meeting.meetingNumber}</div>
                    <div className="Participants">
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

                <a className="link" target="_blank" rel="noopener noreferrer" href={meeting.link}>Meeting Link</a>

                { this.checkEdit()}
                <MeetingInfo open={ this.state.isOpen } meeting = { this.props.meeting } onClose={ () => this.setState( {isOpen:false} ) } />
            </div>
    }
}

export default connect(
    (state) => ({isEdit:state.isEdit,meetings:state.meetings,contacts:state.contacts}),
    {addSelected,removeSelected}

)(Meeting)
