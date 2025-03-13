import data from './data.js';

document.addEventListener("DOMContentLoaded", function () {
    function renderMenu(category, containerId) {
        let container = document.getElementById(containerId);
        container.innerHTML = ""; 

        data.menu[category].forEach(item => {
            let isInCart = checkInCart(item.id);
            let buttonText = isInCart ? "Remove from Cart" : "Add to Cart";
            let buttonClass = isInCart ? "remove-from-cart" : "add-to-cart";

            container.innerHTML += `
                <div class="col-lg-3 col-md-4 col-sm-6">
                    <div class="food-card">
                        <img src="${item.image}" alt="${item.title}">
                        <h4>${item.title}</h4>
                        <p>${item.price} EGP</p>
                        <button class="btn ${buttonClass}" data-id="${item.id}" data-name="${item.title}" data-price="${item.price}" data-image="${item.image}">${buttonText}</button>
                    </div>
                </div>`;
        });

        attachEventListeners();
    }

    function attachEventListeners() {
        document.querySelectorAll(".add-to-cart, .remove-from-cart").forEach(button => {
            button.addEventListener("click", function () {
                let id = this.getAttribute("data-id");
                let name = this.getAttribute("data-name");
                let price = this.getAttribute("data-price");
                let image = this.getAttribute("data-image");

                if (this.classList.contains("add-to-cart")) {
                    addToCart(id, name, price, image);
                } else {
                    removeFromCart(id);
                }

                renderMenu("sandwiches", "sandwiches-container");
                renderMenu("meals", "meals-container");
                renderMenu("salads", "salads");
                renderMenu("boxes", "boxes");
            });
        });
    }

    function addToCart(id, name, price, image) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        if (!cart.some(item => Number(item.id) === Number(id))) {
            cart.push({ id: Number(id), name, price, image });
            localStorage.setItem("cart", JSON.stringify(cart));
        }
    }

    function removeFromCart(id) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart = cart.filter(item => Number(item.id) !== Number(id));
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    function checkInCart(id) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        return cart.some(item => Number(item.id) === Number(id));
    }

    renderMenu("sandwiches", "sandwiches-container");
    renderMenu("meals", "meals-container");
    renderMenu("salads", "salads");
    renderMenu("boxes", "boxes");
});
