const watchDetailsService = async() => {
    try {
        const response = await fetch(
            "http://localhost:5000/api/users/watchDetails/watch-Details", {
            method: "GET",
            credentials: "include",
        })
        console.log("Response from watches data is: ", response)
        const data = await response.json()
        console.log("Data from watch details service: ", data)
        return data;
    }
    catch (err) {
        console.log("Error while fetching watch details: ", err)
    }
}

export default watchDetailsService
