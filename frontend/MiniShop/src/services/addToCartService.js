const addToCartService = async (id, category, flag) => {
    
    const dataToSend = {
        productId: id,
        category: category,
        addToCart: flag,
    };
    console.log("Data to send: ", dataToSend)
    try {
        const response = await fetch(
            "https://minishop-ecommerce-o1yl.onrender.com/api/users/cartDetails/addToCart", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionStorage.getItem("accessToken")}` // ✅ added
            },
            credentials: "include",
            body: JSON.stringify(dataToSend),
        });
        const data = await response.json()
        
        if (!response.ok) {
            console.log("Add to cart details: ", data.message || data)
            throw new Error(data.message);
        }
        return data.message;
    }
    catch (err) {
        console.log("Error is from add to cart: ", err)
        throw err;
    }
}
export default addToCartService