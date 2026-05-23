import { filterProducts } from "../listProduct/listProduct.js";
const filter = document.getElementsByClassName("filter")[0];

if (filter) {
    filter.innerHTML = `
        <div class="container containerFilter ">
            <form id="filterForm" class="row g-3 align-items-center bg-light p-3 rounded shadow-sm">
                <div class="col-12 col-md-4">
                    <input type="text" class="form-control" id="searchInput" placeholder="Search products...">
                </div>
                <div class="col-12 col-md-3 justify-content-start d-flex gap-1">
                    <button class="btn btn-sm btn-dark">All</button>
                    <button class="btn btn-sm btn-outline-dark">Mouse</button>
                    <button class="btn btn-sm btn-outline-dark">Keyboard</button>
                    <button class="btn btn-sm btn-outline-dark">Accessories</button>
                </div>
                </div>
            </form>
        </div>
    `;

    const filterForm = filter.querySelector("#filterForm");
    const searchInput = filter.querySelector("#searchInput");
    const categorySelect = filter.querySelector("#categorySelect");
    const priceSelect = filter.querySelector("#priceSelect");

    // Lấy tên danh mục từ URL (nếu có) và cập nhật giao diện Select
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get("category");
    if (categoryParam) {
        categorySelect.value = categoryParam;
    }

    if (filterForm) {
        const handleFilter = () => {
            const filters = {
                keyword: searchInput.value.trim(),
                category: categorySelect.value,
                price: priceSelect.value,
            };
            filterProducts(filters);
        };

        let debounceTimer;
        const debounceHandleFilter = () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(handleFilter, 300); // Lọc sau khi ngừng gõ 300ms
        };

        searchInput.addEventListener("input", debounceHandleFilter);
        categorySelect.addEventListener("change", handleFilter);
        priceSelect.addEventListener("change", handleFilter);

        filterForm.addEventListener("submit", (e) => {
            e.preventDefault();
        });

        filterForm.addEventListener("reset", () => {
            setTimeout(() => {
                filterProducts({ keyword: "", category: "", price: "" });
            }, 0);
        });
    }
}
