const clothDetailsService = async () => {
  try {
    const response = await fetch(
      "https://minishop-ecommerce-o1yl.onrender.com/api/users/clothesDetails/clothes-Details", {
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
