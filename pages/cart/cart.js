let listProductState = {
    allProduct: [],
    product: [],
    searchTerm: "",
    filterType: "All",
    totalCartPrice: 0,
}
listProductState.allProduct =  localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []
listProductState.product = listProductState.allProduct;
function renderProductTable(products) {
    const tableBody = document.querySelector("#cartTable");
    const totalCartPriceElement = document.getElementById("totalCartPrice");
    if (!products || products.length === 0) {
        tableBody.innerHTML = "<tr><td colspan='6' class='text-center'>Your cart is empty</td></tr>";
        listProductState.totalCartPrice = 0;
        updateTotalCartPrice(0);
        return;
    }
    listProductState.totalCartPrice = 0;
    tableBody.innerHTML = "";
    for(element of products) {
        renderProductRow(element);
    }
}
function renderProductRow(products) {
    const tableBody = document.querySelector("#cartTable");
    const totalCartPriceElement = document.getElementById("totalCartPrice");
    let row = document.createElement("tr");
    row.innerHTML = `
        <td>${products?.name}</td>
        <td>${products?.type}</td>
        <td>$${products?.price}</td>
        <td>${products?.quantity}</td>
        <td>$${(products?.price * products?.quantity).toFixed(2)}</td>
        <td class="justify-content-center d-flex"><button class="btn btn-sm btn-danger removeItemBtn align-self-center" data-id="${products?.id}">Remove</button></td>
    `;
    tableBody.appendChild(row);
    listProductState.totalCartPrice += products?.price * products?.quantity;
    updateTotalCartPrice(listProductState.totalCartPrice);
    const removeItemBtn = row.querySelector(".removeItemBtn");
    removeItemBtn.addEventListener("click", () => {
        removeFromCart(products?.id);
    });
}
function updateTotalCartPrice(price) {
    const totalCartPriceElement = document.getElementById("totalCartPrice");
    totalCartPriceElement.textContent = `$${price.toFixed(2)}`;
}
function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter((item) => item.id !== productId);
    localStorage.setItem("cart", JSON.stringify(cart));
    listProductState.allProduct = cart;
    listProductState.product = cart;
    filterProducts();
    renderProductTable(listProductState.product);
}
function clearCart() {
    localStorage.removeItem("cart");
    listProductState.allProduct = [];
    listProductState.product = [];
    updateTotalCartPrice(0);
    renderProductTable();
}
function initializeFilter() {
    let filter = document.querySelector("#filter").querySelectorAll(".btn")
    let searchInput = document.querySelector("#searchInput")
    filter.forEach(element => {
        if (element.className.includes("btn-danger")) {return;}
        element.addEventListener("click", () => {
            filter.forEach(element2 => {
                if (element2.className.includes("btn-danger")) {return;}
                element2.className = "btn btn-sm btn-outline-dark"
            });
            element.className = "btn btn-sm btn-dark"
            filterProducts();
            renderProductTable(listProductState.product);
        })
    })
    searchInput.addEventListener("input", () => {
        filterProducts();
        renderProductTable(listProductState.product);
    })
}
function filterProducts() {
    listProductState.searchTerm = searchInput.value.toLowerCase();
    listProductState.product = listProductState.allProduct.filter(product => 
            (product.type === listProductState.filterType || listProductState.filterType === "All") && product.name.toLowerCase().includes(listProductState.searchTerm)
    );
}
renderProductTable(listProductState.product);
initializeFilter();