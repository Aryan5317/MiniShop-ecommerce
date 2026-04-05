async function phoneDetailsService() {
    try {
        const response = await fetch(
            "https://minishop-ecommerce-o1yl.onrender.com/api/users/phoneDetails/phone-Details", {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionStorage.getItem("accessToken")}` // ✅ added
            },
        })
        const data = await response.json()
        console.log("Data from phone details service: ", data)
        return data;
    }
    catch (err) {
        console.log("Error while fetching mobile details: ", err)
    }
}

export default phoneDetailsService