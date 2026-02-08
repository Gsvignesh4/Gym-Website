function toggleMenu() {
    document.querySelector(".nav-links").classList.toggle("show");
}


/*PRICING */
function selectPlan(planName) {
    localStorage.setItem("selectedPlan", planName);
    window.location.href = "contact.html";
}

/*SHOW SELECTED PLAN (CONTACT)*/
let planDisplay = document.getElementById("chosenPlan");
if (planDisplay) {
    let plan = localStorage.getItem("selectedPlan");
    if (plan) {
        planDisplay.innerText = "Selected Plan: " + plan;
    }
}

/**CONTACT FORM STORAGE**/
let contactForm = document.querySelector(".contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        let name = document.getElementById("name").value;
        let email = document.getElementById("email").value;
        let message = document.getElementById("message").value;

        localStorage.setItem("contactName", name);
        localStorage.setItem("contactEmail", email);
        localStorage.setItem("contactMessage", message);

        alert("Thank you! We will contact you soon.");
        contactForm.reset();
    });
}

/***BACK TO TOP BUTTON****/
let topBtn = document.getElementById("topBtn");

if (topBtn) {
    window.addEventListener("scroll", function () {
        if (document.documentElement.scrollTop > 200) {
            topBtn.style.display = "block";
        } else {
            topBtn.style.display = "none";
        }
    });

    topBtn.onclick = function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
}

/**ADD TO CART**/
function addToCart(name, price, image) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: name,
            price: price,
            image: image,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(name + " added to cart");
}

/**DISPLAY CART + TOTAL**/
function displayCart() {
    let cartItems = document.getElementById("cartItems");
    let totalBox = document.getElementById("cartTotal");

    if (!cartItems) return;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartItems.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty</p>";
        if (totalBox) totalBox.innerText = "";
        return;
    }

    cart.forEach((item, index) => {
        total += item.price * item.quantity;

        cartItems.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}">
                <div class="cart-details">
                    <h3>${item.name}</h3>
                    <p>₹${item.price}</p>

                    <div class="qty-box">
                        <button onclick="changeQty(${index}, -1)">−</button>
                        <span>${item.quantity}</span>
                        <button onclick="changeQty(${index}, 1)">+</button>
                    </div>
                </div>
                <button class="btn" onclick="removeItem(${index})">Remove</button>
            </div>
        `;
    });

    if (totalBox) {
        totalBox.innerText = "Total Amount: ₹" + total;
    }
}

/**CHANGE QUANTITY**/
function changeQty(index, change) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart[index].quantity += change;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

/*REMOVE ITEM**/
function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

/*CLEAR CART*/
function clearCart() {
    localStorage.removeItem("cart");
    displayCart();
}

/*BUY NOW**/
function buyNow() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    alert("Order placed successfully! Our team will contact you.");
    localStorage.removeItem("cart");
    displayCart();
}

displayCart();
