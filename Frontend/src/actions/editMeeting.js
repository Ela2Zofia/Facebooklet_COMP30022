export default function editMeeting(meeting){
    return (
        {
            type: "EDIT_MEETING",
            payload: meeting
        }
    )
}
