const deleteLocationService = async (id) => {
    console.log("location id: ", id)
    const dataToSend = {
        id: id
    }
    console.log("Data to send: ", id)
    try {
        const response = await fetch(
            "https://minishop-ecommerce-o1yl.onrender.com/api/users/delete-location",
            {
                method: "PATCH",
                credentials: "include",
                body: JSON.stringify(dataToSend),
                headers: {
                    "Content-Type": "application/json"
                },
            }
        )
        const data = await response.json()
        console.log("Data recived from backend is: ", data)
        if(!response.ok){
            console.log("Error from backned is: ", data.message || data)
            throw new Error(data.message || data)
        }
        return data.message;
    } catch (error) {
        console.log("Error while deleting location: ", error)
        throw error
    }
}

export default deleteLocationService
