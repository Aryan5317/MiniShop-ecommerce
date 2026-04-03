const earPhoneService = async () => {
    try {
        const response = await fetch(
            "http://localhost:5000/api/users/earPhoneDetails/earPhones-Details", {
            method: "GET",
            credentials: "include",
        })
        console.log("Response from earphone data is: ", response)
        const data = await response.json()
        console.log("Data from earphone details service: ", data)
        return data;
    }
    catch (err) {
        console.log("Error while fetching earphone details: ", err)
    }
}

export default earPhoneService
