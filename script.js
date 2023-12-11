//filter for product
function filterObjects(category) {
    const elements = document.getElementsByClassName('box');

    if (category === 'All') {
        for (let i = 0; i < elements.length; i++) {
            elements[i].style.display = 'block';
        }
    } else {
        for (let i = 0; i < elements.length; i++) {
            const elementCategory = elements[i].classList;
            if (elementCategory.contains(category)) {
                elements[i].style.display = 'block';
            } else {
                elements[i].style.display = 'none';
            }
        }
    }
}



//cart for product
let cart = [];

function addToCart(product, price, productName) {
    // Check if the product is already in the cart
    const existingItem = cart.find(item => item.product === product);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ product, price, quantity: 1, extensions: ['png', 'jpg'], productName });

    }

    Swal.fire({
        position: 'middle',
        icon: 'success',
        title: `"${productName}" added to the cart!`,
        showConfirmButton: false,
        timer: 1500
    });

    updateCart();
}

function openCartModal() {
    const modal = document.getElementById('cart-modal');
    modal.style.display = 'block';
}

function closeCartModal() {
    const modal = document.getElementById('cart-modal');
    modal.style.display = 'none';
}

function removeFromCart(product) {
    cart = cart.filter(item => item.product !== product);
    updateCart();
}

function decreaseQuantity(product) {
    const item = cart.find(item => item.product === product);

    if (item && item.quantity > 1) {
        item.quantity -= 1;
    } else {
        removeFromCart(product);
    }

    updateCart();
}

function increaseQuantity(product) {
    const item = cart.find(item => item.product === product);

    if (item) {
        item.quantity += 1;
        updateCart();
    }
}

function updateCart() {
    const cartItemsElement = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');

    // Clear the cart display
    cartItemsElement.innerHTML = '';

    // Display each item in the cart
    cart.forEach(item => {
        const listItem = document.createElement('li');

        // Iterate over extensions
        for (const extension of item.extensions) {
            const imageSource = `Images/Products/${item.product.toLowerCase()}.${extension}`;

            // Check if the image exists
            if (imageExists(imageSource)) {
                // Add product image, name, quantity, and remove button
                listItem.innerHTML = `
                    <img src="${imageSource}" alt="${item.productName}">
                    <span>${item.productName} - RM${item.price.toFixed(2)} x ${item.quantity}</span>
                    <button class="quantity-btn" onclick="decreaseQuantity('${item.product}')">-</button>
                    <button class="quantity-btn" onclick="increaseQuantity('${item.product}')">+</button>
                    <button class="remove-btn" onclick="removeFromCart('${item.product}')">Remove</button>
                `;
                break; // Exit the loop if image exists
            }
        }

        cartItemsElement.appendChild(listItem);
    });

    // Calculate and display the total
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    cartTotalElement.textContent = total.toFixed(2);
}

// Function to check if an image exists
function imageExists(url) {
    const image = new Image();
    image.src = url;
    return image.complete;
}

// Function to handle the checkout
function checkout() {
    // Display an alert to notify the user
    alert('Checkout successful! Thank you for shopping with us.');

    // Clear the cart and update the display
    cart = [];
    updateCart();
    closeCartModal();
}



//slideshow
let slider = document.querySelector('.slider .list');
let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let dots = document.querySelectorAll('.slider .dots li');

let lengthItems = items.length - 1;
let active = 0;
let refreshInterval = setInterval(() => { next.click() }, 3000);

next.onclick = function () {
    active = active + 1 <= lengthItems ? active + 1 : 0;
    reloadSlider();
}

prev.onclick = function () {
    active = active - 1 >= 0 ? active - 1 : lengthItems;
    reloadSlider();
}

dots.forEach((li, key) => {
    li.addEventListener('click', () => {
        active = key;
        reloadSlider();
    })
});

function reloadSlider() {
    slider.style.left = -items[active].offsetLeft + 'px';

    let lastActiveDot = document.querySelector('.slider .dots li.active');
    lastActiveDot.classList.remove('active');
    dots[active].classList.add('active');

    clearInterval(refreshInterval);
    refreshInterval = setInterval(() => { next.click() }, 3000);
}

window.onresize = function (event) {
    reloadSlider();
};

//menu 
function toggleMenu() {
    var dropdown = document.getElementById("myDropdown");
    dropdown.classList.toggle("clicked");
}
