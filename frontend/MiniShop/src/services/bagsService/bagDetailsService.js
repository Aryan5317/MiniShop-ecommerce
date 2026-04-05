const bagDetailsService = async () => {
    try {
        const response = await fetch(
            "https://minishop-ecommerce-o1yl.onrender.com/api/users/bagsDetails/bags-Details", {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionStorage.getItem("accessToken")}` // ✅ added
            },
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