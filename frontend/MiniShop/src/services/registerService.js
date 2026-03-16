async function registerService(userDetails) {
    const dataToSend = {
        username: userDetails.username,
        email: userDetails.email,
        password: userDetails.password
    }
    console.log("Form Data is: ", dataToSend)
    try {
        const response = await fetch(
            "http://localhost:5000/api/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(dataToSend),
        });
        const data = await response.json()
        console.log("Data from backend: ", data)
        if (!response.ok) {
            console.log("Registeration failed: ", data.message || data)
            throw new Error(data.message || "Registration failed");
        }
        return data.message;
    }
    catch (err) {
        console.log("Error while register user: ", err)
        throw err 
    }
}

export default registerService
