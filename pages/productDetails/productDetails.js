const productDetail = document.getElementsByClassName("productDetail")[0];
let product = null;
async function initializeProductDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");
    if (productId) {
        product = await getProduct(productId);
        renderProductDetail(product);
    } else {
        location.href = "/pages/product/";
    }   
}
async function renderProductDetail(product) {
    if (!productDetail) return;
    if (!product) {
        productDetail.innerHTML = `
            <div class="d-flex flex-column align-items-center justify-content-center" style="height: 300px;">
                <h3 class="text-muted">Product not found</h3>
                <button class="btn btn-primary mt-3" onclick="window.location.href='/pages/product/'">Back to Products</button>
            </div>
        `;
        return;
    }
    productDetail.innerHTML = `
        <div class="container">
            <div class="row g-4">
                <div class="col-md-6">
                    <img src="${product?.imageURL}" class="img-fluid rounded shadow-sm">
                </div>
                <div class="col-md-6 d-flex flex-column boxInforProduct">
                    <h2 class="fw-bold">${product?.name}</h2>
                    <h4 class="text-danger fw-bold">$${product?.price}</h4>
                    <p class="text-muted">${product?.description}</p>
                    <div class="d-flex align-items-center">
                        <span class="fw-bold">Amount:</span>
                        <input type="number" class="form-control w-25 ms-2" value="1" min="1" id="quantityInput">
                    </div>
                    <div class="total">Total Amount: <span id="totalAmount" class="text-danger fw-bold">$${product?.price}</span></div>
                    <div class="d-flex gap-3 align-items-center mb-4">
                        <button class="btn btn-primary btn-lg btnBuy" onclick="alert('Item bought successfully!')">Buy</button>
                        <button class="btn btn-outline-primary btn-lg addToCart" 
                            data-id="${product?.id}" 
                            data-name="${product?.name}" 
                            data-price="${product?.price}" 
                            data-type="${product?.type}"
                        >
                            <i class="fa-solid fa-cart-plus"></i> Add to Card
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    const addToCartBtn = productDetail.querySelector(".addToCart");
    const quantityInput = productDetail.querySelector("#quantityInput");
    quantityInput.addEventListener("input", updateTotalAmount);
    addToCartBtn.addEventListener("click", () => {
        const productInfo = {
            id: addToCartBtn.getAttribute("data-id"),
            name: addToCartBtn.getAttribute("data-name"),
            price: parseFloat(addToCartBtn.getAttribute("data-price")),
            type: addToCartBtn.getAttribute("data-type"),
            quantity: parseInt(quantityInput.value) || 1,
        };
        handleAddToCart(productInfo);
    });
}
function updateTotalAmount() {
    const quantity = parseInt(quantityInput.value) || 1;
    const totalAmount = quantity * product.price;
    const totalAmountElement = productDetail.querySelector("#totalAmount");
    totalAmountElement.textContent = `$${totalAmount}`;
}
initializeProductDetail();