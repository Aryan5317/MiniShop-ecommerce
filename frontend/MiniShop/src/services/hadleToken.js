async function handleToken() {
    try {
        const token = sessionStorage.getItem("accessToken")
        if (!token) {
            console.log("No token in sessionStorage")
            return null
        }
        return true
    }
    catch (err) {
        console.log("Error: ", err)
        return null
    }
}

export default handleToken