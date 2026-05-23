let listProductState = {
    allProducts: [],
    products: [],
    filterType: "All",
    searchTerm: "",
};

const listProduct = document.getElementById("productList");
function renderCardGrid(cardList) {   
    listProduct.innerHTML = "";
    if (cardList.length === 0) {
        listProduct.innerHTML = `
            <div class="container text-center py-5">
                <h5 class="text-muted">No products found.</h5>
            </div>
        `;
        return;
    }
    for (Element of cardList) {
        renderCard(Element);
    }
    const viewDetailBtns = listProduct.querySelectorAll(".viewDetail");
    viewDetailBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            const productId = btn.getAttribute("data-id");
            window.location.href = `../productDetails/index.html?id=${productId}`;
        });
    });
}
function renderCard(product) {
    let card = document.createElement("div");
    card.className = "card cardProduct h-100 shadow-sm border-0";
    card.innerHTML = `
        <img src="${product?.imageURL}" class="card-img-top" style="height: 250px; object-fit: cover;">
        <div class="card-body d-flex flex-column">
            <h5 class="card-title fw-bold" style="font-size: 1.1rem;">${product?.name}</h5>
            <p class="card-text text-muted">${product?.description}</p>
            <div class="mt-auto d-flex justify-content-between align-items-center">
                <span class="text-danger fw-bold fs-5">$${product?.price}</span>
            </div>
            <div class="d-flex gap-2 justify-content-between">
                    <button class="btn btn-primary btn-sm viewDetail " data-id="${product?.id}">See Details</button>
                    <button class="btn btn-outline-primary btn-sm addToCart" 
                        data-id="${product?.id}" 
                        data-name="${product?.name}" 
                        data-price="${product?.price}" 
                        data-type="${product?.type}"
                    >
                        <i class="fa-solid fa-cart-plus"></i> Add to Cart
                    </button>
            </div>
        </div>
    `;
    listProduct.appendChild(card);
}
async function initializeListProduct() {
    if (!listProduct) return;
    listProductState.allProduct = await getProductsList()
    listProductState.product = listProductState.allProduct;
    renderCardGrid(listProductState.allProduct);
    const addToCartBtns = listProduct.querySelectorAll(".addToCart");
    addToCartBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            const productInfo = {
                id: btn.getAttribute("data-id"),
                name: btn.getAttribute("data-name"),
                price: parseFloat(btn.getAttribute("data-price")),
                quantity: 1,
                type: btn.getAttribute("data-type"),
            };
            handleAddToCart(productInfo);
        });
    });
    const viewDetailBtns = listProduct.querySelectorAll(".viewDetail");
    viewDetailBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            const productId = btn.getAttribute("data-id");
            window.location.href = `../productDetails/index.html?id=${productId}`;
        });
    });
}
function initializeFilter() {
    let filter = document.querySelector("#filter").querySelectorAll(".btn")
    let searchInput = document.querySelector("#searchInput")
    filter.forEach(element => {
        element.addEventListener("click", () => {
            filter.forEach(element2 => {
                element2.className = "btn btn-sm btn-outline-dark"
            });
            element.className = "btn btn-sm btn-dark"
            filterProducts();
            renderCardGrid(listProductState.product);
        })
    })
    searchInput.addEventListener("input", () => {
        filterProducts();
        renderCardGrid(listProductState.product);
    })
}
function filterProducts() {
    listProductState.searchTerm = searchInput.value.toLowerCase();
    listProductState.product = listProductState.allProduct.filter(product => 
            (product.type === listProductState.filterType || listProductState.filterType === "All") && product.name.toLowerCase().includes(listProductState.searchTerm)
    );
}
initializeFilter()
initializeListProduct()