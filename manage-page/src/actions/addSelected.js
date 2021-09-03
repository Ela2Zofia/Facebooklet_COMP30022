function addSelected(id) {
  return (
    {
      type: "ADD_SELECTED",
      payload: id
    }
  )
}

export default addSelected
