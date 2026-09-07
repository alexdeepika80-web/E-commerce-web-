const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        category: "electronics",
        price: 2499,
        image: "🎧",
        rating: 5
    },
    {
        id: 2,
        name: "Smart Watch",
        category: "electronics",
        price: 3499,
        image: "⌚",
        rating: 4
    },
    {
        id: 3,
        name: "Men's T-Shirt",
        category: "fashion",
        price: 799,
        image: "👕",
        rating: 5
    },
    {
        id: 4,
        name: "Women's Handbag",
        category: "accessories",
        price: 1899,
        image: "👜",
        rating: 4
    },
    {
        id: 5,
        name: "Running Shoes",
        category: "shoes",
        price: 2999,
        image: "👟",
        rating: 5
    },
    {
        id: 6,
        name: "Sunglasses",
        category: "accessories",
        price: 999,
        image: "🕶️",
        rating: 4
    },
    {
        id: 7,
        name: "Gaming Laptop",
        category: "electronics",
        price: 74999,
        image: "💻",
        rating: 5
    },
    {
        id: 8,
        name: "Casual Sneakers",
        category: "shoes",
        price: 2199,
        image: "👞",
        rating: 4
    }
];

let cart = [];


// Display products

function displayProducts(productList) {

    const productGrid = document.getElementById("product-grid");

    productGrid.innerHTML = "";

    if (productList.length === 0) {
        productGrid.innerHTML = `
            <p style="grid-column: 1/-1; text-align:center;">
                No products found.
            </p>
        `;

        return;
    }

    productList.forEach(product => {

        const stars = "★".repeat(product.rating) +
                      "☆".repeat(5 - product.rating);

        productGrid.innerHTML += `
            <div class="product-card">

                <div class="product-image">
                    ${product.image}
                </div>

                <div class="product-info">

                    <p class="product-category">
                        ${product.category}
                    </p>

                    <h3 class="product-name">
                        ${product.name}
                    </h3>

                    <div class="rating">
                        ${stars}
                    </div>

                    <div class="product-bottom">

                        <span class="price">
                            ₹${product.price.toLocaleString("en-IN")}
                        </span>

                        <button
                            class="add-btn"
                            onclick="addToCart(${product.id})"
                        >
                            Add +
                        </button>

                    </div>

                </div>

            </div>
        `;
    });
}


// Filter products

function filterProducts(category) {

    if (category === "all") {
        displayProducts(products);
        return;
    }

    const filtered = products.filter(
        product => product.category === category
    );

    displayProducts(filtered);
}


// Search products

function searchProducts() {

    const searchValue =
        document.getElementById("search").value.toLowerCase();

    const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchValue) ||
        product.category.toLowerCase().includes(searchValue)
    );

    displayProducts(filtered);
}


// Add product to cart

function addToCart(productId) {

    const product = products.find(
        product => product.id === productId
    );

    const existingItem = cart.find(
        item => item.id === productId
    );

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCart();

    openCart();
}


// Update cart

function updateCart() {

    const cartItems = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");

    cartItems.innerHTML = "";

    let total = 0;
    let itemCount = 0;

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Your cart is empty.
            </p>
        `;

    } else {

        cart.forEach(item => {

            total += item.price * item.quantity;
            itemCount += item.quantity;

            cartItems.innerHTML += `
                <div class="cart-item">

                    <div class="cart-item-image">
                        ${item.image}
                    </div>

                    <div class="cart-item-info">

                        <h4>${item.name}</h4>

                        <p>
                            ₹${item.price.toLocaleString("en-IN")}
                        </p>

                        <div class="quantity">

                            <button
                                onclick="changeQuantity(${item.id}, -1)"
                            >
                                −
                            </button>

                            <span>${item.quantity}</span>

                            <button
                                onclick="changeQuantity(${item.id}, 1)"
                            >
                                +
                            </button>

                        </div>

                    </div>

                    <button
                        class="remove-btn"
                        onclick="removeFromCart(${item.id})"
                    >
                        ✕
                    </button>

                </div>
            `;
        });
    }

    cartCount.textContent = itemCount;

    cartTotal.textContent =
        "₹" + total.toLocaleString("en-IN");
}


// Change quantity

function changeQuantity(productId, amount) {

    const item = cart.find(
        item => item.id === productId
    );

    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        updateCart();
    }
}


// Remove product

function removeFromCart(productId) {

    cart = cart.filter(
        item => item.id !== productId
    );

    updateCart();
}


// Open cart

function openCart() {

    document
        .getElementById("cart-sidebar")
        .classList.add("active");

    document
        .getElementById("cart-overlay")
        .classList.add("active");
}


// Close cart

function closeCart() {

    document
        .getElementById("cart-sidebar")
        .classList.remove("active");

    document
        .getElementById("cart-overlay")
        .classList.remove("active");
}


// Checkout

function checkout() {

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    alert(
        "Thank you for your order! This is a demo checkout."
    );

    cart = [];

    updateCart();

    closeCart();
}


// Load products when page opens

displayProducts(products);
