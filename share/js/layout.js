const footer = document.getElementsByTagName("footer")[0] ?? [];
footer.innerHTML = `
    <div class="boxFooter">
        <div class="container d-flex justify-content-between wrapFooter">
            <div class=" d-flex flex-column blockFooter">
                <div class="titleFooter">About Night Technology</div>
                <div class="infor">
                    <span class="nameMeaning">Night Technology</span>
                    was created with the desire to bring technology closer to modern life. The website is not only a place to shop for beautiful technological equipment but also a source of inspiration to help people build a modern, comfortable and vibrant living space.                </div>
            </div>
            <div class=" d-flex flex-column blockFooter changeWidthBlock">
                <div class="titleFooter">Links</div>
                <ul class="navBarFooter flex-column">
                    <li class="navItem d-flex align-items-center ">
                        <a class="navLinkFooter" href="/pages/homepage/" id="homepage">Homepage</a>
                    </li>
                    <li class="navItem d-flex align-items-center ">
                        <a class="navLinkFooter" href="/pages/product/" id="homepage">Products</a>
                    </li>
                </ul>
            </div>
            <div class=" d-flex flex-column blockFooter">
                <div class="titleFooter">Contact</div>
                <div class="d-flex flex-column wrapInfor">
                    <div class="infor">Hotline: 123456789</div>
                    <div class="infor">Address: 12 Nguyen Van Bao, Ward 1, Go Vap District, Ho Chi Minh City, Vietnam</div>
                </div>
            </div>
        </div>
    </div>
`;
const header = document.getElementsByTagName("header")[0] ?? [];
header.innerHTML = `
    <nav class="navbar navbar-expand-lg boxHeader bg-white shadow-sm py-0">
        <div class="container flex-wrap align-items-center justify-content-between">
            
            <a class="navbar-brand logo m-0" href="/pages/homepage/" style="max-width: 50px; display: flex; align-items: center; gap: 10px; ; text-wrap: auto">
                <img src="/assets/logo/logo.png">
                <span style="font-size: 0.9rem; font-weight: 700;">Night Technology</span>
            </a>

            <button class="navbar-toggler shadow-none border-0 px-0 order-2 order-md-3 ms-auto ms-md-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse order-5 order-lg-1 gap-2" id="navbarContent">
                <ul class="navbar-nav navBar justify-content-center mx-lg-auto mb-2 mb-lg-0 gap-2 gap-lg-4 text-center">
                    <li class="navItem nav-item d-flex align-items-center justify-content-center">
                        <a class="navLink nav-link py-0" href="/pages/homepage/" id="homepage">Home</a>
                    </li>
                    <li class="navItem nav-item d-flex align-items-center justify-content-center">
                        <a class="navLink nav-link py-0" href="/pages/product/" id="productspage">Products</a>
                    </li>
                    ${adminLink()}
                </ul>
                <div class="d-flex align-items-center gap-1">
                    <div class="block btnCart p-right d-flex align-items-center gap-1" style="cursor: pointer;">
                        <i class="fa-solid fa-cart-shopping me-2"></i>
                        <span>Cart</span>
                    </div>
                    ${setHeaderUser()}
                </div>
            </div>

        </div>
    </nav>
`;
function setHeaderUser() {
    const user = localStorage.getItem("activeUser");
    if (user) {
        return `
        <div class="block p-left" id="userSection">
            <div id="user-menu" class="dropdown">
                <button class="btn btn-sm dropdown-toggle border-0 d-flex align-items-center gap-2" type="button" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="fa-solid fa-user"></i>
                    <span id="display-username">${JSON.parse(user).name}</span>
                </button>
                <ul class="dropdown-menu dropdown-menu-end shadow-sm py-0" aria-labelledby="userDropdown">
                    <li><a class="dropdown-item py-2" style="font-size:14px" href="#">User Information</a></li>
                    <li><hr class="dropdown-divider m-0"></li>
                    <li>
                        <a class="dropdown-item text-danger py-2" href="#" style="font-size:14px" id="logout" onclick="logOut()">
                            <i class="fa-solid fa-right-from-bracket me-2"></i>Log out
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        `
    } else {
        return `<div class="block p-left" id="userSection"><button class="btn btn-primary btn-sm btnLogin" onclick="window.location.href='/pages/login/'">Login</button></div>`
    }
}
function adminLink() {
    const user = localStorage.getItem("activeUser");
    if (user && JSON.parse(user).type === "admin") {
        return `
        <li class="navItem nav-item d-flex align-items-center justify-content-center">
            <a class="navLink nav-link py-0" href="/pages/admin/" id="adminpage">Admin</a>
        </li>
        `
    }
    return "";
}
const btnCart = header.querySelector(".btnCart");
btnCart.addEventListener("click", () => {
    window.location.href = `/pages/cart/`;
});
function logOut() {
    localStorage.removeItem("activeUser");
    window.location.href = "/pages/homepage/";
}