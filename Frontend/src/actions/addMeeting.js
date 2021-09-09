function addMeeting(meeting) {
  return (
    {
      type: "ADD_MEETING",
      payload: meeting
    }
  )
}

export default addMeeting;
