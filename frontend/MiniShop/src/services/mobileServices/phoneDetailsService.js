async function phoneDetailsService() {
    try {
        const response = await fetch(
            "http://localhost:5000/api/users/phoneDetails/phone-Details", {
            method: "GET",
            credentials: "include",
        }
        )
        const data = await response.json()
        console.log("Data from phone details service: ", data)
        return data;
    }
    catch (err) {
        console.log("Error while fetching mobile details: ", err)
    }
}

export default phoneDetailsService