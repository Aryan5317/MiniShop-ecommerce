const updateDetailsService = async (details) => {
    console.log("Details are: ", details)
    
    const dataToSend = {}
        if(details.userName) dataToSend.name = details.userName
    if(details.newPassword) dataToSend.newPassword = details.newPassword
    if(details.confirmPassword) dataToSend.confirmPassword = details.confirmPassword

    console.log("Data to send: ", dataToSend);
    try {
        const response = await fetch(
            "http://localhost:5000/api/users/update-details",
            {
                method: "PATCH",
                credentials: "include",
                body: JSON.stringify(dataToSend),
                headers: {
                    "Content-Type": "application/json"
                }
            })
        console.log("Response is: ", response)
        const data = await response.json()
        console.log("Data recived from backend is: ", data)
        if (!response.ok) {
            console.log("Error while updating details: ", data.message || data)
            throw new Error(data.message)
        }
        return data.message
    } catch (error) {
        console.log("Error while updating details is: ", error)
        throw error
    }
}

export default updateDetailsService