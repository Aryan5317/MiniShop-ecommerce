async function verifyOtpService(forgetDetails) {
    console.log("Otp recived for verification is: ", forgetDetails)
    const dataToSend = {
        email: forgetDetails.email,
        otp: forgetDetails.otp
    }
    console.log("Data to send is: ", dataToSend)
    try {
        const response = await fetch(
            "http://localhost:5000/api/users/verify-otp",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(dataToSend)
            }
        )
        const data = await response.json()
        console.log("Data is: ",data)
        if(!response.ok){
            console.log("Authentication failed: ", data.method || data)
            throw new Error(data.message || "Authentication Failed")
        }
        return data.message
    }
    catch (err) {
        console.log("Error recived from backend during otp verification is: ", err)
        throw err;
    }
}

export default verifyOtpService