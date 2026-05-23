function addToCart(productInfo) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find((item) => item.id === productInfo.id);
    if (existingProduct) {
        existingProduct.quantity += productInfo.quantity;
    } else {
        cart.push(productInfo);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
}
function handleAddToCart(productInfo) {
    addToCart(productInfo);
    alert(`Added ${productInfo.name} to the cart!`);
}