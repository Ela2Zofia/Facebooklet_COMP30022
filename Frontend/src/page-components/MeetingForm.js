import "../css/PhoneInput.css";
import React from "react";
import reactDom from "react-dom";
import {RiCloseLine} from "react-icons/ri"
import {connect} from "react-redux";
import addMeeting from "../actions/addMeeting";
import Network from "../util/Network";
import { Select } from 'antd';
// import "antd/dist/antd.css";
import "../css/AntStyle.css";
import setContacts from "../actions/setContacts";
import editMeeting from "../actions/editMeeting";



class MeetingForm extends React.Component{
    state = {
        topic:'Untitled',
        meetingNumber: '',
        password: '',
        link:'',
        date:'',
        time:'',
        duration:0,
        participants:[],
        description: ''
    }

    saveTopic = ( event ) => {
      this.setState({topic: event.target.value});

    }
    saveMeetingNumber = ( event ) => {
        this.setState( { meetingNumber: event.target.value } );
    }
    saveLink = ( event ) => {
        this.setState( { link: event.target.value } );
    }

    saveParticipants = (value ) => {
        this.setState( { participants: value.map((_id) => (this.props.contacts.find(contact => contact._id === _id)))});
    }
    saveDescription = (event ) => {
        this.setState( { description: event.target.value } );
    }
    saveDate = (event ) => {
        this.setState( { date: event.target.value } );
    }
    saveTime = (event ) => {
        this.setState( { time: event.target.value } );
    }
    saveHour = (event ) => {
        this.setState( { duration: this.state.duration + event.target.value*1 } );
    }
    saveMinutes = (event ) => {
        this.setState( { duration: this.state.duration + event.target.value*1 } );
    }

    savePassword = (event ) => {
      this.setState( { password: event.target.value } )
    }

    async componentDidMount() {
        const serverData = await Network.fetchContactsNet(this.props.user);
        this.props.setContacts(serverData)
        this.setState(this.props.meeting)
    }


    resetState = ()=>{
        this.setState({
            topic:'Untitled',
            meetingNumber: '',
            password:'',
            link:'',
            date:'',
            time:'',
            duration:0,
            participants:[],
            description: ''
        })
    }

    validate = (state)=>{

        if (state.meetingNumber === ''){
            alert("Please enter a meeting number");
        }
        else if(state.link === ''){
            alert("Please enter the link for your meeting");
        }
        else if(state.date === ''){
            alert("Please select a validate date")
        }
        else if(state.time === ''){
            alert("Please select a valid time")
        }
        else if(state.duration === 0){
            alert("Please select a valid duration")
        }
        else{
            return true
        }
        return false;
    }

    submitMeeting = async (event) => {
        event.preventDefault();
        if (this.validate(this.state)) {
            if (this.props.meeting) {
                const stateCopy = JSON.parse(JSON.stringify(this.state))
                //TODO: change to _id
                stateCopy._id = this.props.meeting._id
                await Network.editMeetingNet(this.props.user,stateCopy);
                this.props.editMeeting(stateCopy);
                alert("Successfully updated")
                this.props.onClose();
            }
            else{
                const data = await Network.addMeetingsNet(this.props.user, this.state);
                this.props.addMeeting(data);
                alert("Successfully added")
                this.resetState();
            }
        }

    }

    setOptions = () => {
        return this.props.contacts.map((contact) => ({label:`${contact.firstName} ${contact.lastName}`, value: contact._id}))
    }


    render(){
      //TODO: defaultValue of participants
        if (!this.props.open) return null;

        return reactDom.createPortal(
            <div className="ContactFormWrapper">
                <form className="MeetingForm" onSubmit={this.submitMeeting}>

                    <div className="TopbarCloseButton">
                        <RiCloseLine className="button" onClick={()=>{
                            this.props.onClose();
                            this.resetState()
                        }} size={30}/>
                    </div>


                    <label>Topic</label>
                    <input value = {this.state.topic} type="text" placeholder="" onChange={this.saveTopic}/>

                    <label>*Meeting Number</label>
                    <input value = {this.state.meetingNumber} type="text" placeholder="**MANDATORY**" onChange={this.saveMeetingNumber}/>

                    <label>Password</label>
                    <input value = {this.state.password} type="text" placeholder="" onChange={this.savePassword}/>

                    <label>*Meeting Link</label>
                    <input value = {this.state.link} type="text" placeholder="https://.... **MANDATORY**" onChange={this.saveLink} pattern="^(https:\/\/).*" title="Please enter a valid link starting with 'https://'"/>

                    <label>*Date</label>
                    <input value = {this.state.date} type = "date" placeholder="**MANDATORY**" onChange={this.saveDate}/>

                    <label>*Start Time</label>
                    <input value = {this.state.time} type="time" placeholder= "**MANDATORY**" onChange={this.saveTime}/>

                    <label>*Duration</label>
                    <div>
                        <label>Hour: </label>
                        <select value = {60*Math.floor(this.state.duration/60)} onChange={this.saveHour}>
                            <option value={0}>0 hour</option>
                            <option value={60}>1 hour</option>
                            <option value={120}>2 hour</option>
                            <option value={180}>3 hour</option>
                            <option value={240}>4 hour</option>
                            <option value={300}>5 hour</option>
                            <option value={360}>6 hour</option>
                            <option value={420}>7 hour</option>
                            <option value={480}>8 hour</option>
                            <option value={540}>9 hour</option>
                            <option value={600}>10 hour</option>
                            <option value={660}>11 hour</option>
                            <option value={720}>12 hour</option>
                        </select>&nbsp;

                        <label>Minutes: </label>
                        <select value = {this.state.duration - 60*Math.floor(this.state.duration/60)} onChange={this.saveMinutes}>
                            <option value={0}>0 minutes</option>
                            <option value={15}>15 minutes</option>
                            <option value={30}>30 minutes</option>
                            <option value={45}>45 minutes</option>
                        </select>
                    </div>

                    <label>Participants</label>
                    <Select ref={c=>this.select = c}
                            mode = "multiple"
                            style={{ width: '40%' }}
                            options={this.setOptions()}
                            onChange={this.saveParticipants}
                            optionFilterProp="label"
                            allowClear={true}
                    />


                    <label>Description</label>
                    <input value = {this.state.description} type="text" placeholder=" " onChange={this.saveDescription}/>

                    <button type ="submit">Save</button>
                </form>
            </div>
            , document.getElementById("portal")
        )
    }
}

export default connect(
    state => ({user: state.user,contacts:state.contacts}),
    {addMeeting,setContacts,editMeeting}
)(MeetingForm)


