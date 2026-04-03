async function loginService(userDetails) {
  console.log("User details recieved: ", userDetails)
  const dataToSend = {
    email: userDetails.email,
    password: userDetails.password
  }
  console.log("data to send: ", dataToSend)
  try {
    const response = await fetch(
      "https://minishop-ecommerce-o1yl.onrender.com/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(dataToSend),
    });
    const data = await response.json()
    console.log("Data is: ", data)
    if (!response.ok) {
      console.log("Login failed: ", data.message || data)
      throw new Error(data.message || "Authentication Failed")
    }
    return data.message
  }
  catch (err) {
    console.log("Error while login is: ", err)
    throw err
  }
}

export default loginService
