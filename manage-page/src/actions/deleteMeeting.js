
function deleteMeeting(id) {
  return (
    {
      type: "DELETE_MEETING",
      payload: id
    }
  )
}

export default deleteMeeting
