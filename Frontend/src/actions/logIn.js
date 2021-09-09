function logIn(user) {
  return (
    {
      type: "LOG_IN",
      payload: user
    }
  )
}

export default logIn
