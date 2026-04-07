async function resetPasswordService(passwordDetails) {
    console.log("Password recived for sending to backend is: ", passwordDetails)

    const otpToken = sessionStorage.getItem("otpToken")   // <-- fetch from sessionStorage
    const dataToSend = {
        newPassword: passwordDetails.password,
        confirmPassword: passwordDetails.confirmPassword,
        otpToken: otpToken,   // <-- add
    }
    try {
        console.log("Data to send is: ", dataToSend)
        const response = await fetch(
            "https://minishop-ecommerce-o1yl.onrender.com/api/users/reset-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(dataToSend),
        })
        const data = await response.json()
        console.log("Data is: ", data)
        if (!response.ok) {
            console.log("Error recived from backend is: ", data.message || "Authenticaton Error")
            throw new Error(data.message || "Authentication Failed")
        }
        sessionStorage.removeItem("otpToken")    // <-- clear after success
        return data.message
    }
    catch (err) {
        console.log("Errror from backend while updating password is: ", err)
        throw err;
    }
}

export default resetPasswordService