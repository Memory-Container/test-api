let listProductState = {
    allProducts: [],
    products: [],
};

const listProduct = document.getElementsByClassName("listProduct")[0];
function renderCardGrid(cardList) {   
    listProducts.innerHTML = "";
    if (cardList.length === 0) {
        listProducts.innerHTML = `
            <div class="container text-center py-5">
                <h5 class="text-muted"><i class="fa-solid fa-box-open"></i>No products found.</h5>
            </div>
        `;
        return;
    }
    for (Element of cardList) {
        renderCard(Element);
    }
}
function renderCard(product) {
    let card = document.createElement("div");
    card.className = "card cardProduct h-100 shadow-sm border-0";
    card.innerHTML = `
        <img src="${product.imageURL}" class="card-img-top" style="height: 250px; object-fit: cover;">
        <div class="card-body d-flex flex-column">
            <h5 class="card-title fw-bold" style="font-size: 1.1rem;">${product.name}</h5>
            <p class="card-text text-muted">${product.description}</p>
            <div class="mt-auto d-flex justify-content-between align-items-center">
                <span class="text-danger fw-bold fs-5">$${product.price}</span>
            </div>
            <div class="d-flex gap-2 justify-content-between">
                    <button class="btn btn-primary btn-sm viewDetail " data-id="${product.id}">See Details</button>
                    <button class="btn btn-outline-primary btn-sm addToCart"
                        data-id="${product.id}" 
                        data-name="${product.name}" 
                        data-price="${product.price}"
                        data-image="${product.imageURL}">
                        <i class="fa-solid fa-cart-plus"></i> Add to Cart
                    </button>
            </div>
        </div>
    `;
    listProducts.appendChild(card);
}
async function initializeListProduct() {
    if (!listProduct) return;
    listProductState.allProduct = await getProductsList()
    renderCardGrid(listProductState.allProduct);

    const addToCartBtns = listProduct.querySelectorAll(".addToCart");
    addToCartBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            const productInfo = {
                id: btn.getAttribute("data-id"),
                name: btn.getAttribute("data-name"),
                price: parseInt(btn.getAttribute("data-price")),
                image: btn.getAttribute("data-image"),
                quantity: 1,
            };

            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            const existingProduct = cart.find((item) => item.id === productInfo.id);
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                cart.push(productInfo);
            }
            localStorage.setItem("cart", JSON.stringify(cart));
            alert(`Đã thêm ${productInfo.name} vào giỏ hàng!`);
        });
    });

    const viewDetailBtns = listProduct.querySelectorAll(".viewDetail");
    viewDetailBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            const productId = btn.getAttribute("data-id");
            window.location.href = `../detailproductpage/detailproductpage.html?id=${productId}`;
        });
    });
}

initializeListProduct()