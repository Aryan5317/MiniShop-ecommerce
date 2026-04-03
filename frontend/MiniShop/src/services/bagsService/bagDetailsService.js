const bagDetailsService = async () => {
    try {
        const response = await fetch(
            "http://localhost:5000/api/users/bagsDetails/bags-Details", {
            method: "GET",
            credentials: "include",
        })
        console.log("Response from bags data is: ", response)
        const data = await response.json()
        console.log("Data from bags details service: ", data)
        return data;
    }
    catch (err) {
        console.log("Error while fetching bags details: ", err)
    }
}

export default bagDetailsService
