
async function getProductsList() {
    try {
        let response = await fetch(`${API_URL}products`)
        if (!response.ok) {
            throw new Error("Failed to get product list")
        }
        response = await response.json()
        return response;
        
    }
    catch(e) {
        console.error(e)
    }
}
async function getProduct(id) {
    try {
        let response = await fetch(`${API_URL}products/${id}`)
        if (!response.ok) {
            throw new Error("Failed to get product")
        }
        response = await response.json()
        console.log(response)
        return response
    }
    catch(e) {
        console.error(e)
    }
}
async function createProduct(productData) {
    if (!productData) return;
    try {
        let response = await fetch(`${API_URL}products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(productData)
        })
        if (!response.ok) {
            throw new Error("Failed to create product")
        }
        response = await response.json()
        console.log(response)
        return response
    }
    catch(e) {
        console.error(e)
    }
}
async function deleteProduct(id) {
    console.log(id)
    if (!id) return;
    try {
        let response = await fetch(`${API_URL}products/${id}`, {
            method: "DELETE",
        })
        if (!response.ok) {
            throw new Error("Failed to create product")
        }
        response = await response.json()
        console.log(response)
        return response
    }
    catch(e) {
        console.error(e)
    }
}
function addToCard() {
    
}