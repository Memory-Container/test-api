let bestSellerState = {
    products: [],
    currentIndex: 0,
};

const bestSeller = document.getElementsByClassName("bestSeller")[0] ?? [];

const listProducts = bestSeller.querySelector(".wrapBestSeller");
const btnPrev = bestSeller.querySelector("#btnPrevBestSeller");
const btnNext = bestSeller.querySelector("#btnNextBestSeller");
function renderCardGrid(cardList) {   
    for (element of cardList) {
        renderCard(element);
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
                <button class="btn btn-primary btn-sm viewDetail" data-id="${product.id}">See Details</button>
                <button class="btn btn-outline-primary btn-sm addToCart"
                    data-id="${product.id}"
                    data-name="${product.name}"
                    data-price="${product.price}"
                    data-type="${product.type}"
                >
                    <i class="fa-solid fa-cart-plus"></i> Add to Cart
                </button>
            </div>
        </div>
    `;
    listProducts.appendChild(card);
}
async function initializeBestSeller() {
    if (!listProducts) return;
    bestSellerState.products = await getProductsList();
    renderCardGrid(bestSellerState.products);
    if (listProducts.children.length > 0) {
        const cardWidth = listProducts.children[0].offsetWidth + 20;
        listProducts.style.transform = `translateX(-${bestSellerState.currentIndex * cardWidth}px)`;
    }
    const addToCartBtns = listProducts.querySelectorAll(".addToCart");
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

    const viewDetailBtns = listProducts.querySelectorAll(".viewDetail");
    viewDetailBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            const productId = btn.getAttribute("data-id");
            window.location.href = `../productDetails/index.html?id=${productId}`;
        });
    });
}

if (btnNext) {
    btnNext.addEventListener("click", () => {
        const cardWidth = listProducts.children[0].offsetWidth + 20;
        const visibleCards = Math.floor(listProducts.parentElement.offsetWidth / cardWidth);

        if (bestSellerState.currentIndex < bestSellerState.products.length - visibleCards - 1) {
            bestSellerState.currentIndex++;
            listProducts.style.transform = `translateX(-${bestSellerState.currentIndex * cardWidth}px)`;
        }
    });
}
if (btnPrev) {
    btnPrev.addEventListener("click", () => {
        const cardWidth = listProducts.children[0].offsetWidth + 20;
        const visibleCards = Math.floor(listProducts.parentElement.offsetWidth / cardWidth);
        if (bestSellerState.currentIndex > 0) {
            bestSellerState.currentIndex--;
            console.log("Current Index:", bestSellerState.currentIndex);
            listProducts.style.transform = `translateX(-${bestSellerState.currentIndex * cardWidth}px)`;
        }
    });
}

initializeBestSeller()