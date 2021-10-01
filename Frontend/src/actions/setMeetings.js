function setMeetings(meetings) {
  
  return (
    {
      type: "SET_MEETINGS",
      payload: meetings
    }
  )
}

export default setMeetings
