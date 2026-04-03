const removeFromCartService = async (id, flag) => {
    console.log("ID is: ", id)
    console.log("Flag for removing from cart: ", flag);
    const dataToSend = {
        ID: id,
        flag: flag,
    }
    console.log("Data to send for cart remove is: ", dataToSend);
    try {
        const response = await fetch(
            "http://localhost:5000/api/users/cartDetails/remove-cartPorduct", {
            credentials: "include",
            method: "PATCH",
            body: JSON.stringify(dataToSend),
            headers: {
                "Content-Type": "application/json"
            }
        })
        console.log("Response is: ", response);
        const data = await response.json();
        console.log("Data after removing cart is: ", data);
        if (!response.ok) {
            console.log("Error from backend while removing cart product is:  ", data.message || data)
            throw new Error(data.message || data);
        }
        return data;
    } catch (error) {
        console.log("Error while removing product from cart: ", error)
        throw error
    }
}

export default removeFromCartService
