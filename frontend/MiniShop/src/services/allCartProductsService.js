const allCartProductsService = async () => {
    try {
        const response = await fetch(
            "https://minishop-ecommerce-o1yl.onrender.com/api/users/cartDetails/cart-product", {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
        })
        console.log("Response is: ", response)
        const data = await response.json();
        if(!response.ok){
            console.log("Response data from cart details fetched: ", data.message || data)
            throw new Error(data.message || data)
        }
        return data;
    } catch (error) {
        console.log("Error while fetchting all cart products: ", error)
        throw error;
    }
}

export default allCartProductsService
