const shoesDetailsService = async () => {
    try {
        const response = await fetch(
            "https://minishop-ecommerce-o1yl.onrender.com/api/users/shoesDetails/shoes-Details", {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionStorage.getItem("accessToken")}` // ✅ added
            },
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