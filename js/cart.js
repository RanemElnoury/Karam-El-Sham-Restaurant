document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartContainer = document.querySelector(".cart-items");
    let totalPriceElement = document.getElementById("total-price");
    let checkoutBtn = document.getElementById("checkout-btn");
    let modal = document.getElementById("order-modal");
    let confirmOrderBtn = document.getElementById("confirm-order");
    let cancelOrderBtn = document.getElementById("cancel-order");
    let emptyCartImage = document.querySelector(".empty");

    function updateCart() {
        cartContainer.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
            if (!item.quantity) item.quantity = 1; 

            let itemElement = document.createElement("div");
            itemElement.classList.add("cart-item");
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="item-info">
                    <h4>${item.name}</h4>
                    <p>${item.price} EGP</p>
                </div>
                <div class="quantity-controls">
                    <button class="decrease-btn" data-index="${index}">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="increase-btn" data-index="${index}">+</button>
                </div>
                <button class="remove-btn" data-index="${index}"><i class="bi bi-trash"></i></button>
            `;

            cartContainer.appendChild(itemElement);
            total += Number(item.price) * item.quantity;
        });

        totalPriceElement.textContent = total;

        document.querySelectorAll(".remove-btn").forEach(button => {
            button.addEventListener("click", function () {
                let index = this.getAttribute("data-index");
                cart.splice(index, 1);
                localStorage.setItem("cart", JSON.stringify(cart));
                updateCart();
            });
        });

        document.querySelectorAll(".increase-btn").forEach(button => {
            button.addEventListener("click", function () {
                let index = this.getAttribute("data-index");
                cart[index].quantity++;
                localStorage.setItem("cart", JSON.stringify(cart));
                updateCart();
            });
        });

        document.querySelectorAll(".decrease-btn").forEach(button => {
            button.addEventListener("click", function () {
                let index = this.getAttribute("data-index");
                if (cart[index].quantity > 1) {
                    cart[index].quantity--;
                } else {
                    cart.splice(index, 1); 
                }
                localStorage.setItem("cart", JSON.stringify(cart));
                updateCart();
            });
        });

        if (cart.length === 0) {
            emptyCartImage.style.display = "block";
            checkoutBtn.style.display = "none";
        } else {
            emptyCartImage.style.display = "none";
            checkoutBtn.style.display = "block";
        }
    }

    checkoutBtn.addEventListener("click", function () {
        modal.style.display = "flex";
    });

    cancelOrderBtn.addEventListener("click", function () {
        modal.style.display = "none";
    });

    confirmOrderBtn.addEventListener("click", function () {
        localStorage.removeItem("cart");
        cart = [];
        updateCart();
        modal.style.display = "none";
    });

    updateCart();
});
