const clothDetailsService = async () => {
  try {
    const response = await fetch(
      "http://localhost:5000/api/users/clothesDetails/clothes-Details", {
      method: "GET",
      credentials: "include",
    })
    console.log("Response from Clothes data is: ", response)
    const data = await response.json()
    console.log("Data from clothes details service: ", data)
    return data;
  }
  catch (err) {
    console.log("Error while fetching clothes details: ", err)
  }
}

export default clothDetailsService
