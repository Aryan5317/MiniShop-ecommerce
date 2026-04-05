const activeLocationService = async (id) => {
    console.log("Default location id: ", id)
    const dataToSend = {
        id: id
    }
    console.log("Data to send: ", dataToSend)
    try {
        const response = await fetch(
            "https://minishop-ecommerce-o1yl.onrender.com/api/users/default-location", {
            method: "PATCH",
            credentials: "include",
            body: JSON.stringify(dataToSend),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionStorage.getItem("accessToken")}` // ✅ added
            },
        })
        const data = await response.json()
        console.log("Data from backend is: ", data)
        if (!response.ok) {
            console.log("Error is: ", data.message || data)
            throw new Error(data.message || data)
        }
        return data
    } catch (error) {
        console.log("Error while setting default location: ", error)
        throw error
    }
}

export default activeLocationService