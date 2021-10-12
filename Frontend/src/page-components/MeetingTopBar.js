import {VideoCameraAddOutlined} from '@ant-design/icons';
import MeetingForm from "./MeetingForm";
import { useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import "../css/MeetingTopBar.css";
import toggleEdit from "../actions/toggleEdit"
import clearSelected from "../actions/clearSelected";
import deleteMeeting from "../actions/deleteMeeting";
import Network from "../util/Network";

function MeetingTopbar() {

    const [ isOpen, setIsOpen ] = useState( false );

    const dispatch = useDispatch();
    const isEdit = useSelector( state => state.isEdit );
    const selected = useSelector( state => state.selected );
    const user = useSelector( state => state.user );


    // delete all selected contacts
    async function deleteSelected() {
        console.log("deletSelected")

        // delete selected contacts from both front and backend
        for ( let i in selected ) {
            await Network.delMeetingNet( user, selected[ i ] );
            dispatch( deleteMeeting( selected[ i ] ) );
        }

        dispatch( clearSelected() );

    }


    return (
        <div className="MeetingTopbar">
            <p>5Silvers</p>

            <Router>
                <Switch>
                    <Route path="/meetings">
                        <div id="AddMeeting">
                            <VideoCameraAddOutlined onClick={ () => setIsOpen( true ) } />

                            <MeetingForm open={ isOpen } onClose={ () => setIsOpen( false ) }></MeetingForm>

                        </div>

                        <div>
                            <button id="Manage" onClick={
                                () => {
                                    dispatch( toggleEdit() );
                                    dispatch( clearSelected() );
                                }
                            }>Manage</button>
                            {
                                isEdit
                                    ?
                                    <button id="Delete" onClick={ () => { deleteSelected();} }>Delete</button>

                                    : ""
                            }
                        </div>
                    </Route>

                </Switch>

            </Router>




        </div>
    )
}

export default MeetingTopbar
