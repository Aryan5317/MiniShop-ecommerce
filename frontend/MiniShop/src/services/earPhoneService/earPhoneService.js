const earPhoneService = async () => {
    try {
        const response = await fetch(
            "https://minishop-ecommerce-o1yl.onrender.com/api/users/earPhoneDetails/earPhones-Details", {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionStorage.getItem("accessToken")}` // ✅ added
            },
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