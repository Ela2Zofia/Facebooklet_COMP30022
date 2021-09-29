function setMeetings(meetings) {
  
  return (
    {
      type: "SET_MEETING",
      payload: meetings
    }
  )
}

export default setMeetings
