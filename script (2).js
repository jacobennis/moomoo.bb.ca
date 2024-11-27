
document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefault();  // Prevent the form from submitting normally
function searchContent() {
    // Get the search query from the input field
    const query = document.getElementById('search').value.toLowerCase();

    // Get all section elements
    const sections = document.querySelectorAll('section');
    
    // Loop through each section
    sections.forEach(section => {
        // Get all text content inside each section
        const text = section.textContent.toLowerCase();
        
        // If the text content contains the search query, show the section
        if (text.includes(query) && query !== "") {
            section.style.display = "block"; // Show the section
        } else {
            section.style.display = "none"; // Hide the section
        }
    });
}
function searchContent() {
    const query = document.getElementById('search').value.toLowerCase();
    const sections = document.querySelectorAll('section');
    
    // Loop through each section
    sections.forEach(section => {
        const sectionText = section.textContent.toLowerCase();
        
        // Check if the section contains the query
        if (sectionText.includes(query) && query !== "") {
            section.style.display = "block"; // Show the section
            highlightText(section, query);  // Highlight the search term in the section
        } else {
            section.style.display = "none"; // Hide the section
            removeHighlight(section);  // Remove any existing highlights
        }
    });
}

// Function to highlight the search term
function highlightText(section, query) {
    const regex = new RegExp(query, 'gi');
    section.innerHTML = section.innerHTML.replace(regex, (match) => `<span class="highlight">${match}</span>`);
}

// Function to remove any previous highlights
function removeHighlight(section) {
    section.innerHTML = section.innerHTML.replace(/<span class="highlight">/g, '').replace(/<\/span>/g, '');
}

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    alert(`Thank you for reaching out, ${name}! We will get back to you at ${email}.`);
});
// Get the modal element and the button to show the modal
const modal = document.getElementById('login-modal');
const btn = document.getElementById('show-login');
const closeBtn = document.querySelector('.close-modal');

// When the "Admin Login" button is clicked, show the modal
btn.onclick = function() {
    modal.style.display = 'flex';  // Show the modal (flex to center it)
}

// When the close button (×) is clicked, hide the modal
closeBtn.onclick = function() {
    modal.style.display = 'none';  // Hide the modal
}

// Close the modal if the user clicks outside the modal content area
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';  // Hide the modal
    }
}
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
    const cartCount = cart.length;
    document.getElementBy
// Function to add product to cart
function addToCart(product) {
    // Retrieve the cart from localStorage, or initialize an empty array if not found
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if the product is already in the cart
    const existingProductIndex = cart.findIndex(item => item.id === product.id);

    if (existingProductIndex === -1) {
        // If the product isn't in the cart, add it with a quantity of 1
        product.quantity = 1;
        cart.push(product);
    } else {
        // If the product is already in the cart, increment its quantity
        cart[existingProductIndex].quantity += 1;
    }

    // Save the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update the cart item count in the main page
    updateCartCount();
}

// Function to update the cart count in the header
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').textContent = cartCount;
}

// Add event listeners for the "Add to Cart" buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
        const productCard = e.target.closest('.product-card');
        const productId = productCard.getAttribute('data-id');
        const productName = productCard.getAttribute('data-name');
        const productPrice = parseFloat(productCard.getAttribute('data-price'));

        // Create the product object
        const product = {
            id: productId,
            name: productName,
            price: productPrice
        };

        // Add the product to the cart
        addToCart(product);
    });
});

// Update the cart count on page load
document.addEventListener('DOMContentLoaded', updateCartCount);

// Redirect to the Cart Page when the Cart button is clicked
document.getElementById('cart-link').addEventListener('click', () => {
    window.location.href = 'cart.html'; // Redirect to the cart page
});

  // Function to render cart items
function renderCartItems() {
    const cartList = document.getElementById('cart-list');
    const totalPriceElem = document.getElementById('total-price');
    let totalPrice = 0;
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Clear previous cart items
    cartList.innerHTML = '';

    // Loop through cart items and display them
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <h4>${item.name}</h4>
            <p>Price: $${item.price}</p>
            <p>Quantity: ${item.quantity}</p>
            <p>Total: $${(item.price * item.quantity).toFixed(2)}</p>
            <button class="remove-item" data-id="${item.id}">Remove</button>
        `;
        cartList.appendChild(itemElement);

        // Update total price
        totalPrice += item.price * item.quantity;
    });

    // Update the total price display
    totalPriceElem.textContent = totalPrice.toFixed(2);
}

// Remove an item from the cart
function removeItemFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Filter out the product that matches the given productId
    cart = cart.filter(item => item.id !== productId);

    // Save the updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Re-render the cart items
    renderCartItems();
}

// Empty the cart
function emptyCart() {
    localStorage.removeItem('cart'); // Remove the cart from localStorage
    renderCartItems(); // Re-render the cart (empty it)
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    renderCartItems(); // Render cart items when the page loads

    // Handle "Remove" buttons
    document.getElementById('cart-list').addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-item')) {
            const productId = e.target.getAttribute('data-id');
            removeItemFromCart(productId);
        }
    });

    // Empty the cart when the "Empty My Cart" button is clicked
    document.getElementById('empty-cart-btn').addEventListener('click', emptyCart);

    // Show the checkout modal when the "Checkout" button is clicked
    document.getElementById('checkout-btn').addEventListener('click', () => {
        const checkoutModal = document.getElementById('checkout-modal');
        const totalPrice = document.getElementById('total-price').textContent;
        const checkoutTotalPrice = document.getElementById('checkout-total-price');
        checkoutTotalPrice.textContent = totalPrice;

        checkoutModal.style.display = 'flex';
    });

    // Close the checkout modal
    document.getElementById('close-checkout-modal').addEventListener('click', () => {
        const checkoutModal = document.getElementById('checkout-modal');
        checkoutModal.style.display = 'none';
    });

    // Handle payment form submission (mock)
    document.getElementById('payment-form').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Payment submitted successfully!');
        const checkoutModal = document.getElementById('checkout-modal');
        checkoutModal.style.display = 'none';
    });
});
