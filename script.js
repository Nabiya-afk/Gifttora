/* =========================================
   GIFTORA JAVASCRIPT
========================================= */


/* PRODUCTS */

const products = [

    {
        id: 1,
        name: "Chocolate Cake",
        category: "Cakes",
        price: 599,
        emoji: "🎂",
        description: "Delicious chocolate cake perfect for birthdays and celebrations."
    },

    {
        id: 2,
        name: "Red Velvet Cake",
        category: "Cakes",
        price: 699,
        emoji: "🍰",
        description: "Soft and creamy red velvet cake made for special moments."
    },

    {
        id: 3,
        name: "Pink Rose Bouquet",
        category: "Flowers",
        price: 499,
        emoji: "🌹",
        description: "A beautiful bouquet of fresh pink roses."
    },

    {
        id: 4,
        name: "Sunflower Bouquet",
        category: "Flowers",
        price: 549,
        emoji: "🌻",
        description: "Bright sunflowers to make someone's day special."
    },

    {
        id: 5,
        name: "Birthday Gift Box",
        category: "Gifts",
        price: 799,
        emoji: "🎁",
        description: "A beautifully packed gift box for birthdays."
    },

    {
        id: 6,
        name: "Cute Teddy Bear",
        category: "Gifts",
        price: 899,
        emoji: "🧸",
        description: "A soft and adorable teddy bear for your loved ones."
    },

    {
        id: 7,
        name: "Luxury Chocolates",
        category: "Chocolate",
        price: 449,
        emoji: "🍫",
        description: "Premium chocolates packed beautifully for gifting."
    },

    {
        id: 8,
        name: "Heart Chocolate Box",
        category: "Chocolate",
        price: 599,
        emoji: "❤️",
        description: "Heart-shaped chocolate box perfect for expressing love."
    }

];


/* =========================================
   CART
========================================= */

let cart = JSON.parse(localStorage.getItem("giftoraCart")) || [];


/* SAVE CART */

function saveCart() {

    localStorage.setItem(
        "giftoraCart",
        JSON.stringify(cart)
    );

    updateCartCount();

}


/* CART COUNT */

function updateCartCount() {

    const count = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    // Supports both cart counter IDs.

    const cartCount =
        document.getElementById("cartCount") ||
        document.getElementById("cart-count");

    if (cartCount) {

        cartCount.textContent = count;

    }

}


/* ADD TO CART */

function addToCart(productId) {

    const product = products.find(
        p => p.id === productId
    );

    if (!product) return;

    const existing = cart.find(
        item => item.id === productId
    );

    if (existing) {

        existing.quantity++;

        // Make sure the image is saved
        existing.image = product.image;

    } else {

        cart.push({
            ...product,
            image: product.image,
            quantity: 1
        });

    }

    saveCart();

    alert(product.name + " added to cart! 🛒");

}


/* =========================================
   DISPLAY PRODUCTS
========================================= */

function createProductCard(product) {

    return `
        <div class="product-card">

            <div class="product-image">
                ${product.emoji}
            </div>

            <div class="product-info">

                <span class="category-name">
                    ${product.category}
                </span>

                <h3>${product.name}</h3>

                <div class="price">
                    ₹${product.price}
                </div>

                <div class="product-buttons">

                    <button
                        class="small-btn"
                        onclick="addToCart(${product.id})">

                        Add to Cart

                    </button>

                    <a
                        href="product-details.html?id=${product.id}"
                        class="details-btn">

                        View

                    </a>

                </div>

            </div>

        </div>
    `;

}


/* DISPLAY ALL PRODUCTS */

function displayProducts(category = "All", button = null) {

    const container =
        document.getElementById("productsContainer");

    if (!container) return;

    if (button) {

        document
            .querySelectorAll(".filter-btn")
            .forEach(btn => {

                btn.classList.remove("active-filter");

            });

        button.classList.add("active-filter");

    }

    let filteredProducts = products;

    if (category !== "All") {

        filteredProducts = products.filter(
            product => product.category === category
        );

    }

    container.innerHTML =
        filteredProducts.map(createProductCard).join("");

}


/* =========================================
   FEATURED PRODUCTS
========================================= */

function displayFeaturedProducts() {

    const container =
        document.getElementById("featuredProducts");

    if (!container) return;

    const featured = products.slice(0, 4);

    container.innerHTML =
        featured.map(createProductCard).join("");

}


/* =========================================
   PRODUCT DETAILS
========================================= */

function showProductDetails() {

    const container =
        document.getElementById("productDetails");

    if (!container) return;

    const params =
        new URLSearchParams(window.location.search);

    const id =
        parseInt(params.get("id"));

    const product =
        products.find(p => p.id === id);

    if (!product) {

        container.innerHTML = `

            <div class="empty-cart">

                <h2>Product not found</h2>

                <br>

                <a href="products.html" class="btn">
                    Back to Products
                </a>

            </div>

        `;

        return;

    }

    container.innerHTML = `

        <div class="details-image">
            ${product.emoji}
        </div>

        <div class="details-content">

            <span class="category-name">
                ${product.category}
            </span>

            <h1>${product.name}</h1>

            <div class="price">
                ₹${product.price}
            </div>

            <p>
                ${product.description}
            </p>

            <p>
                Perfect for birthdays, anniversaries,
                celebrations and special moments.
            </p>

            <input
                type="number"
                id="productQuantity"
                class="quantity"
                value="1"
                min="1"
            >

            <button
                class="btn"
                onclick="addProductFromDetails(${product.id})">

                Add to Cart

            </button>

        </div>

    `;

}


/* ADD FROM DETAILS */

function addProductFromDetails(id) {

    const quantity = parseInt(
        document.getElementById("productQuantity").value
    );

    const product =
        products.find(p => p.id === id);

    if (!product || !Number.isInteger(quantity) || quantity < 1) {

        alert("Please enter a valid quantity.");

        return;

    }

    const existing =
        cart.find(item => item.id === id);

    if (existing) {

        existing.quantity += quantity;

    } else {

        cart.push({
            ...product,
            quantity: quantity
        });

    }

    saveCart();

    alert("Product added to cart! 🛒");

}


/* =========================================
   CART PAGE
========================================= */

function displayCart() {

    const container =
        document.getElementById("cartContainer");

    if (!container) return;

    if (cart.length === 0) {

        container.innerHTML = `

            <div class="empty-cart">

                <h2>Your cart is empty 🛒</h2>

                <p>
                    Add something special to your cart.
                </p>

                <br>

                <a href="products.html" class="btn">
                    Shop Now
                </a>

            </div>

        `;

        return;

    }

    let total = 0;

    const items = cart.map(item => {

        const itemTotal =
            item.price * item.quantity;

        total += itemTotal;

        return `

            <div class="cart-item">

                <div class="cart-item-image">
                    ${item.emoji}
                </div>

                <div class="cart-item-info">

                    <h3>${item.name}</h3>

                    <p>
                        ₹${item.price} each
                    </p>

                </div>

                <div class="cart-quantity">

                    <button
                        class="qty-btn"
                        onclick="changeQuantity(${item.id}, -1)">

                        −

                    </button>

                    <span>${item.quantity}</span>

                    <button
                        class="qty-btn"
                        onclick="changeQuantity(${item.id}, 1)">

                        +

                    </button>

                </div>

                <strong>
                    ₹${itemTotal}
                </strong>

                <button
                    class="remove-btn"
                    onclick="removeFromCart(${item.id})">

                    Remove

                </button>

            </div>

        `;

    }).join("");

    container.innerHTML = `

        ${items}

        <div class="cart-summary">

            <div class="cart-total">
                Total: ₹${total}
            </div>

            <button
                class="btn"
                onclick="checkout()">

                Proceed to Checkout

            </button>

        </div>

    `;

}


/* CHANGE QUANTITY */

function changeQuantity(id, amount) {

    const item =
        cart.find(item => item.id === id);

    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {

        cart = cart.filter(
            item => item.id !== id
        );

    }

    saveCart();

    displayCart();

}


/* REMOVE PRODUCT */

function removeFromCart(id) {

    cart = cart.filter(
        item => item.id !== id
    );

    saveCart();

    displayCart();

}


/* CHECKOUT */

function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;

    }

    alert(
        "Thank you for shopping with Giftora! 💝\n\n" +
        "Your order has been placed successfully."
    );

    cart = [];

    saveCart();

    displayCart();

}


/* =========================================
   LOGIN VALIDATION AND REDIRECTION
========================================= */

function setupLogin() {

    const form =
        document.getElementById("loginForm");

    if (!form) return;

    form.addEventListener("submit", function(event) {

        event.preventDefault();

        const email =
            document.getElementById("email").value.trim();

        const password =
            document.getElementById("password").value;

        const message =
            document.getElementById("loginMessage");

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;


        // EMAIL VALIDATION

        if (email === "" || !emailPattern.test(email)) {

            message.textContent =
                "Please enter a valid email address.";

            message.style.color = "red";

            return;

        }


        // PASSWORD VALIDATION

        if (password.length < 6) {

            message.textContent =
                "Password must contain at least 6 characters.";

            message.style.color = "red";

            return;

        }


        // SUCCESS MESSAGE

        message.textContent =
            "Login successful! Welcome to Giftora 💝";

        message.style.color = "green";


        // REDIRECT TO HOME PAGE

        setTimeout(function() {

            window.location.href = "index.html";

        }, 1000);

    });

}


/* =========================================
   CATEGORY FROM HOME PAGE
========================================= */

function filterCategory(category) {

    window.location.href =
        "products.html?category=" +
        encodeURIComponent(category);

}


/* =========================================
   CHECK URL CATEGORY
========================================= */

function checkCategory() {

    const params =
        new URLSearchParams(window.location.search);

    const category =
        params.get("category");

    if (category) {

        const button =
            [...document.querySelectorAll(".filter-btn")]
                .find(btn =>
                    btn.textContent.trim() === category
                );

        displayProducts(category, button);

    } else {

        displayProducts("All");

    }

}


/* =========================================
   PAGE INITIALIZATION
========================================= */

document.addEventListener("DOMContentLoaded", function() {

    updateCartCount();

    displayFeaturedProducts();

    checkCategory();

    showProductDetails();

    displayCart();

    setupLogin();

});