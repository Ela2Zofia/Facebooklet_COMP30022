function removeSelected(id) {
  return (
    {
      type: "REMOVE_SELECTED",
      payload: id
    }
  )
}

export default removeSelected
