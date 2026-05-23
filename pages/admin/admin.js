const fileImg = document.querySelector("#fileImg");
fileImg.addEventListener("change", encodeImageFileAsURL);
let productList = {
    allProduct: [],
    product: [],
}
function encodeImageFileAsURL(element = document.querySelector("#import-product-image")) {
    var file = element.files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
        console.log(reader.result);
        return reader.result;
    };
    reader.readAsDataURL(file);
}
let listProductState = {
    allProduct: [],
    product: [],
    searchTerm: "",
    filterType: "All",
}
listProductState.allProduct =  localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []
listProductState.product = listProductState.allProduct;
function renderProductTable(products) {
    const tableBody = document.querySelector("#cartTable");
    if (!products || products.length === 0) {
        tableBody.innerHTML = "<tr><td colspan='7' class='text-center'>Your cart is empty</td></tr>";
        return;
    }
    tableBody.innerHTML = "";
    for(element of products) {
        renderProductRow(element);
    }
}
function renderProductRow(products) {
    const tableBody = document.querySelector("#cartTable");
    let row = document.createElement("tr");
    row.innerHTML = `
        <td>
            <img src="${products?.imageURL}"style="max-width: 40px" class="img-fluid align-self-center m-auto" alt="${products?.name}">
        </td>
        <td>${products?.name}</td>
        <td>${products?.id}</td>
        <td>${products?.type}</td>
        <td>$${products?.price}</td>
        <td>${products?.description}</td>
        <td class="justify-content-center d-flex gap-1">
            <button class="btn btn-sm align-self-center" data-id="${products?.id}">
                <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button class="btn btn-sm btn-danger removeItemBtn align-self-center" data-id="${products?.id}">
                <i class="fa-solid fa-trash"></i>
            </button>
        </td>
    `;
    tableBody.appendChild(row);
}
function initializeFilter() {
    let filter = document.querySelector("#filter").querySelectorAll(".btn")
    let searchInput = document.querySelector("#searchInput")
    filter.forEach(element => {
        if (element.className.includes("btn-primary")) {return;}
        element.addEventListener("click", () => {
            filter.forEach(element2 => {
                if (element2.className.includes("btn-primary")) {return;}
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
function addProduct(product) {
    if (validateProduct(product)) {
        alert("Please fill in all fields correctly.");
        return;
    }
    listProductState.allProduct.push(product);
    listProductState.product = listProductState.allProduct;
    filterProducts();
    createProduct(product);
    renderProductTable(listProductState.product);
}
function validateProduct(product) {
    return !product?.imageURL 
    || validateProductName(product?.name) 
    || validateProductPrice(product?.price) 
    || validateProductType(product?.type) 
    || validateProductDescription(product?.description);
}
function validateProductName(name) {
    return name?.trim() === "" || name?.length > 100;
}
function validateProductPrice(price) {
    return isNaN(price) || price <= 0;
}
function validateProductType(type) {
    const validTypes = ["Keyboard", "Mouse", "Accessory"];
    return !validTypes.includes(type);
}
function removeProduct(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter((item) => item.id !== productId);
    localStorage.setItem("cart", JSON.stringify(cart));
    listProductState.allProduct = cart;
    listProductState.product = cart;
    filterProducts();
    renderProductTable(listProductState.product);
}
window.addEventListener("pageshow", () => {
    let userType = JSON.parse(localStorage.getItem("activeUser")).type;
    if (userType !== "admin") {
        window.location.href = "/pages/homepage/";
    }
});
async function initializeAdminPage() {
    productList.allProduct =  await getProductsList();
    productList.product = productList.allProduct;
    renderProductTable(productList.product);
    initializeFilter();
}
initializeAdminPage();

let productForm = document.querySelector("#productForm");
productForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(productForm);
    const newProduct = {
        id: Date.now().toString(),
        name: formData.get("name"),
        price: parseFloat(formData.get("price")),
        type: formData.get("type"),
        description: formData.get("description"),
        imageURL: encodeImageFileAsURL(document.querySelector("#import-product-image")),
    };
    console.log(newProduct);
    productForm.reset();
});