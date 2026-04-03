const shoesDetailsService = async () => {
    try {
        const response = await fetch(
            "http://localhost:5000/api/users/shoesDetails/shoes-Details", {
            method: "GET",
            credentials: "include",
        })
        console.log("Response from Shoes data is: ", response)
        const data = await response.json()
        console.log("Data from Shoes details service: ", data)
        return data;
    }
    catch (err) {
        console.log("Error while fetching shoes details: ", err)
    }
}

export default shoesDetailsService
