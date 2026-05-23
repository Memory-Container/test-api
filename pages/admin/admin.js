let productList = {
    allProduct: [],
    product: [],
    searchTerm: "",
    filterType: "All",
}
let productIDToDelete = null;
let fileImage = document.querySelector("#fileImage");
let currentFileData = null;
function encodeImageFileAsURL(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
        return reader.result;
    };
}
productList.allProduct =  localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []
productList.product = productList.allProduct;
fileImage.addEventListener('change', (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onloadend = () => {
    currentFileData = reader.result;
  };
  if (file) {
    reader.readAsDataURL(file);
  }
});
function renderProductTable(products) {
    const tableBody = document.querySelector("#cartTable");
    if (!products || products.length === 0) {
        tableBody.innerHTML = "<tr><td colspan='7' class='text-center'>No products available</td></tr>";
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
            <button class="btn btn-sm btn-danger removeItemBtn align-self-center" onclick="setProductIDToDelete('${products?.id}')" data-bs-toggle="modal" data-bs-target="#confirmDeleteModal">
                <i class="fa-solid fa-trash"></i>
            </button>
        </td>
    `;
    tableBody.appendChild(row);
}
function setProductIDToDelete(id) {
    productIDToDelete = id;
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
            productList.filterType = element.textContent;
            element.className = "btn btn-sm btn-dark"
            filterProducts();
            renderProductTable(productList.product);
        })
    })
    searchInput.addEventListener("input", () => {
        productList.searchTerm = searchInput.value.toLowerCase();
        filterProducts();
        renderProductTable(productList.product);
    })
}
function filterProducts() {
    productList.product = productList.allProduct.filter(product => 
            (product.type === productList.filterType || productList.filterType === "All") && product.name.toLowerCase().includes(productList.searchTerm)
    );
}
function addProduct(product) {
    if (validateProduct(product)) {
        alert("Please fill in all fields correctly.");
        return;
    }
    productList.allProduct.push(product);
    productList.product = productList.allProduct;
    filterProducts();
    createProduct(product);
    renderProductTable(productList.product);
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
function validateProductDescription(description) {
    return description?.trim() === "" || description?.length > 500;
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
        name: formData.get("productName"),
        price: parseFloat(formData.get("productPrice")),
        description: formData.get("productDescription"),
        type: formData.get("productType"),
        imageURL: currentFileData
    };
    console.log(newProduct);
    addProduct(newProduct);
    alert("Product added successfully!");
    productForm.reset();
});

function removeProduct() {
    if (productIDToDelete) {
        deleteProduct(productIDToDelete);
        productList.allProduct = productList.allProduct.filter(product => product.id !== productIDToDelete);
        productList.product = productList.allProduct;
        filterProducts();
        renderProductTable(productList.product);
        productIDToDelete = null;
    }
}