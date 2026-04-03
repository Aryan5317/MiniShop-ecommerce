const watchDetailsService = async() => {
    try {
        const response = await fetch(
            "https://minishop-ecommerce-o1yl.onrender.com/api/users/watchDetails/watch-Details", {
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
