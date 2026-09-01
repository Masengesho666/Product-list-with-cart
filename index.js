

const products = [

    {
        id: 1,
        name: "Waffle with Berries",
        category: "Waffle",
        price: 6.50,
        image: "./assets//images/image-waffle-thumbnail.jpg"

    },

    {
        id: 2,
        name: "Vanilla Bean Crème Brûlée",
        category: "Crème Brûlée",
        price: 7.00,
        image: "./assets/images/image-creme-brulee-thumbnail.jpg"
    },

    {
        id: 3,
        name: "Macaron Mix of Five",
        category: "Macaron",
        price: 8.00,
        image: "./assets/images/image-brownie-thumbnail.jpg"
    },

    {
        id: 4,
        name: "Classic Tiramisu",
        category: "Tiramisu",
        price: 5.50,
        image: "./assets/images/image-tiramisu-thumbnail.jpg"
    },

    {
        id: 5,
        name: "Pistachio Baklava",
        category: "Baklava",
        price: 4.00, image: "./assets/images/image-macaron-thumbnail.jpg"

    },

    {
        id: 6,
        name: "Lemon Meringue Pie",
        category: "Pie",
        price: 5.00, image: "./assets/images/image-macaron-thumbnail.jpg"

    },

    {
        id: 7,
        name: "Red Velvet Cake",
        category: "Cake",
        price: 4.50, image: "./assets/images/image-macaron-thumbnail.jpg"

    },

    {
        id: 8,
        name: "Salted Caramel Brownie",
        category: "Brownie",
        price: 5.50,
        image: "./assets/images/image-brownie-thumbnail.jpg"
    },

    {
        id: 9,
        name: "Vanilla Panna Cotta",
        category: "Panna Cotta",
        price: 6.50,
        image: "./assets/images/image-panna-cotta-thumbnail.jpg"
    }

];




let cart = [];




const productsContainer =
    document.getElementById("products");

const cartCount =
    document.getElementById("cart-count");

const emptyCart =
    document.getElementById("empty-cart");

const cartItems =
    document.getElementById("cart-items");

const cartSummary =
    document.getElementById("cart-summary");

const orderTotal =
    document.getElementById("order-total");

const confirmOrderButton =
    document.getElementById("confirm-order");

const modal =
    document.getElementById("modal");

const confirmedItems =
    document.getElementById("confirmed-items");

const confirmedTotal =
    document.getElementById("confirmed-total");

const newOrderButton =
    document.getElementById("new-order");

const modalBackdrop =
    document.querySelector("[data-close-modal]");




function addToCart(productId) {

    const existingProduct =
        cart.find(item => item.id === productId);


    if (existingProduct)  {

        existingProduct.quantity++;

    } else {

        const product =
            products.find(item => item.id === productId);


        if (!product) {
            return;
        }


        cart.push({

            ...product,

            quantity: 1

        });

    }


    updateCart();

}




function increaseQuantity(productId) {

    const item =
        cart.find(item => item.id === productId);


    if (item) {

        item.quantity++;

    }


    updateCart();

}



function decreaseQuantity(productId) {

    const item =
        cart.find(item => item.id === productId);


    if (!item) {
        return;
    }


    item.quantity--;


    // Remove when quantity reaches 0
    if (item.quantity <= 0) {

        cart =
            cart.filter(item => item.id !== productId);

    }


    updateCart();

}




function removeFromCart(productId) {

    cart =
        cart.filter(item => item.id !== productId);


    updateCart();

}




function getCartCount() {

    return cart.reduce(

        (total, item) => {

            return total + item.quantity;

        },

        0

    );

}




function getCartTotal() {

    return cart.reduce(

        (total, item) => {

            return total + (item.price * item.quantity);

        },

        0

    );

}




function updateCart() {

    const count =
        getCartCount();

    const total =
        getCartTotal();




    cartCount.textContent =
        `(${count})`;




    orderTotal.textContent =
        `$${total.toFixed(2)}`;




    if (cart.length === 0) {

        emptyCart.hidden = false;

        cartItems.hidden = true;

        cartSummary.hidden = true;

    } else {

        emptyCart.hidden = true;

        cartItems.hidden = false;

        cartSummary.hidden = false;

    }




    renderCart();



    updateProductButtons();

}




function renderCart() {

    cartItems.innerHTML = "";


    cart.forEach(item => {

        const cartItem =
            document.createElement("div");


        cartItem.classList.add("cart-item");


        cartItem.innerHTML = `

            <img
                src="${item.image}"
                alt="${item.name}"
                class="cart-item-image"
            >


            <div class="cart-item-info">

                <h3>
                    ${item.name}
                </h3>


                <div class="cart-item-details">

                    <span class="quantity">
                        ${item.quantity}x
                    </span>


                    <span class="unit-price">
                        @$${item.price.toFixed(2)}
                    </span>


                    <strong>
                        $${(
                item.price *
                item.quantity
            ).toFixed(2)}
                    </strong>

                </div>

            </div>


            <button
                class="remove-button"
                type="button"
                aria-label="Remove ${item.name}"
                data-remove="${item.id}"
            >
                ×
            </button>

        `;


        cartItems.appendChild(cartItem);

    });

}




function updateProductButtons() {



    const buttons =
        document.querySelectorAll(
            ".product-card .add-button"
        );


    buttons.forEach(button => {

        const productId =
            Number(button.dataset.id);


        const cartItem =
            cart.find(item => item.id === productId);


        if (cartItem) {


            button.classList.add(
                "quantity-control"
            );


            button.innerHTML = `

                <span
                    class="quantity-decrease"
                    data-decrease="${productId}"
                >
                    −
                </span>


                <span class="quantity-number">
                    ${cartItem.quantity}
                </span>


                <span
                    class="quantity-increase"
                    data-increase="${productId}"
                >
                    +
                </span>

            `;

        } else {

            button.classList.remove(
                "quantity-control"
            );


            button.innerHTML =
                "Add to Cart";

        }

    });

}




productsContainer.addEventListener(
    "click",
    function (event) {

        const button =
            event.target.closest("button");


        if (!button) {
            return;
        }




        if (
            button.dataset.action === "add"
        ) {

            const productId =
                Number(button.dataset.id);


            addToCart(productId);

        }




        if (
            event.target.dataset.increase
        ) {

            const productId =
                Number(
                    event.target.dataset.increase
                );


            increaseQuantity(productId);

        }




        if (
            event.target.dataset.decrease
        ) {

            const productId =
                Number(
                    event.target.dataset.decrease
                );


            decreaseQuantity(productId);

        }

    }
);



cartItems.addEventListener(
    "click",
    function (event) {

        const removeButton =
            event.target.closest(
                "[data-remove]"
            );


        if (!removeButton) {
            return;
        }


        const productId =
            Number(
                removeButton.dataset.remove
            );


        removeFromCart(productId);

    }
);




confirmOrderButton.addEventListener(
    "click",
    function () {

        if (cart.length === 0) {
            return;
        }


        // Clear previous items

        confirmedItems.innerHTML = "";


        // Add each cart item

        cart.forEach(item => {

            const confirmedItem =
                document.createElement("div");


            confirmedItem.classList.add(
                "confirmed-item"
            );


            confirmedItem.innerHTML = `

                <img
                    src="${item.image}"
                    alt="${item.name}"
                    class="confirmed-item-image"
                >


                <div>

                    <strong>
                        ${item.name}
                    </strong>


                    <p>
                        ${item.quantity}x
                        @ $${item.price.toFixed(2)}
                    </p>

                </div>


                <strong>
                    $${(
                    item.price *
                    item.quantity
                ).toFixed(2)}
                </strong>

            `;


            confirmedItems.appendChild(
                confirmedItem
            );

        });


        // Update confirmed total

        confirmedTotal.textContent =
            `$${getCartTotal().toFixed(2)}`;


        modal.hidden = false;


        document.body.classList.add(
            "modal-open"
        );




        const modalCard =
            modal.querySelector(
                ".modal-card"
            );


        modalCard.focus();

    }
);




newOrderButton.addEventListener(
    "click",
    function () {



        cart = [];




        updateCart();




        modal.hidden = true;


        document.body.classList.remove(
            "modal-open"
        );

    }
);




modalBackdrop.addEventListener(
    "click",
    function () {

        modal.hidden = true;


        document.body.classList.remove(
            "modal-open"
        );

    }
);



document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape" &&
            !modal.hidden
        ) {

            modal.hidden = true;


            document.body.classList.remove(
                "modal-open"
            );

        }

    }
);




updateCart();