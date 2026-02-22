async function registerService(userDetails) {
    console.log("UserDetails is: ", userDetails)
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
    }
    catch(err){
        console.log("Error while register user: ", err)
    }
}

export default registerService
