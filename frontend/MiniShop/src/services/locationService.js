const locationService = async () => {
    try {
        const response = await fetch(
            "https://minishop-ecommerce-o1yl.onrender.com/api/users/locations", {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionStorage.getItem("accessToken")}` // ✅ added
            },
        })
        const data = await response.json()
        console.log("Data is: ", data)
        if (!response.ok) {
            console.log("Error from backend is: ", data.message || data)
            throw new Error(data.message || data)
        }
        return data;
    } catch (error) {
        console.log("Error from backend while fetching location: ", error)
        throw error
    }
}

export default locationService