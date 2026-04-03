async function verifyEmailService(email) {
    const dataToSend = {
        email: email
    }
    console.log("Data to send: ", dataToSend)
    try {
        const response = await fetch(
            "https://minishop-ecommerce-o1yl.onrender.com/api/users/verify-email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(dataToSend),
        })
        const data = await response.json()
        console.log("Data recived is: ", data)
        if(!response.ok){
            console.log("Email verification failed: ", data.message || data)
            throw new Error(data.message || "Verification failed")
        }
        return data.message
    }
    catch (err) {
        console.log("Error is: ", err)
        throw err ;
    }
}

export default verifyEmailService
