const activeLocationService = async (id) => {
    console.log("Default location id: ", id)
    const dataToSend = {
        id: id
    }
    console.log("Data to send: ", dataToSend)
    try {
        const response = await fetch(
            "http://localhost:5000/api/users/default-location", {
            method: "PATCH",
            credentials: "include",
            body: JSON.stringify(dataToSend),
            headers: {
                "Content-Type": "application/json"
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
