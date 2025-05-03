// Product data
const products = [
    {
        id: 1,
        title: "Trading Chart Pattern Quick Guide. Technical Analysis Chart Poster. PDF & PNG",
        image: "https://picasso.cosmofeed.com/media.cosmofeed.com/Meta-Ads-Copy--1--2024-04-10-11-52-36.png",
        price: 199,
        discountPrice: 29,
        discount: "85% off"
    },
    {
        id: 2,
        title: "Life-Changing Books to Read in Hindi",
        image: "https://picasso.cosmofeed.com/media.cosmofeed.com/il_794xN-2024-04-10-12-20-38.jpg",
        price: 99,
        discountPrice: 29,
        discount: "71% off"
    },
    {
        id: 3,
        title: "500+ Trading & Finance eBooks",
        image: "https://picasso.cosmofeed.com/media.cosmofeed.com/Meta-Ads-Copy--2--2024-04-10-01-31-28.png",
        price: 199,
        discountPrice: 39,
        discount: "80% off"
    },
    {
        id: 4,
        title: "3,50,000 PLR eBook Bundle",
        image: "https://picasso.cosmofeed.com/media.cosmofeed.com/il_794xN-2024-05-10-07-03-59.jpg",
        price: 199,
        discountPrice: 99,
        discount: "50% off"
    },
    {
        id: 5,
        title: "1000+ Excel Templates | Spreadsheet | Planners | Productivity | Digital",
        image: "https://picasso.cosmofeed.com/media.cosmofeed.com/excel-bundle-2024-05-10-07-32-56.png",
        price: 1999,
        discountPrice: 99,
        discount: "95% off"
    }
];

// Cart state
let cart = [];

// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
    const productsGrid = document.querySelector('.grid');
    const cartModal = document.getElementById('cartModal');
    const cartCount = document.querySelector('.absolute');
    const cartIcon = document.querySelector('.relative');

    // Render products
    function renderProducts() {
        productsGrid.innerHTML = products.map(product => `
            <div class="product-card bg-white rounded-lg shadow-md overflow-hidden">
                <img src="${product.image}" alt="${product.title}" class="w-full h-48 object-cover">
                <div class="p-4">
                    <h5 class="text-lg font-semibold mb-2 line-clamp-2">${product.title}</h5>
                    <div class="flex items-center gap-2 mb-4">
                        <span class="text-xl font-bold">₹ ${product.discountPrice}</span>
                        <span class="text-gray-400 line-through">₹ ${product.price}</span>
                        <span class="text-xs text-white px-2 py-1 rounded discount-badge">${product.discount}</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <button class="text-blue-600 hover:underline">View details</button>
                        <button onclick="addToCart(${product.id})" class="flex items-center gap-2 text-blue-600 hover:text-blue-700">
                            <i class="fas fa-cart-plus"></i>
                            Add to cart
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Add to cart
    window.addToCart = function(productId) {
        const product = products.find(p => p.id === productId);
        if (product) {
            cart.push(product);
            updateCartCount();
            updateCartModal();
            showCartModal();
        }
    }

    // Update cart count
    function updateCartCount() {
        cartCount.textContent = cart.length;
    }

    // Update cart modal content
    function updateCartModal() {
        const modalContent = document.querySelector('#cartModal .p-6');
        if (cart.length === 0) {
            modalContent.innerHTML = `
                <h2 class="text-2xl font-bold mb-4">Cart</h2>
                <div class="text-center py-8">
                    <i class="fas fa-shopping-cart text-6xl text-gray-300 mb-4"></i>
                    <p class="text-gray-600 mb-2">Your cart is empty!</p>
                    <p class="text-gray-400">Add products to your cart to be able to checkout</p>
                </div>
            `;
        } else {
            const total = cart.reduce((sum, item) => sum + item.discountPrice, 0);
            modalContent.innerHTML = `
                <div class="flex justify-between items-center mb-4">
                    <h2 class="text-2xl font-bold">Cart</h2>
                    <button onclick="clearCart()" class="text-red-500 hover:text-red-700">Clear Cart</button>
                </div>
                <div class="max-h-96 overflow-y-auto mb-4">
                    ${cart.map(item => `
                        <div class="flex items-center gap-4 py-4 border-b">
                            <img src="${item.image}" alt="${item.title}" class="w-20 h-20 object-cover rounded">
                            <div class="flex-1">
                                <h3 class="font-semibold line-clamp-2">${item.title}</h3>
                                <p class="text-blue-600">₹ ${item.discountPrice}</p>
                            </div>
                            <button onclick="removeFromCart(${item.id})" class="text-red-500 hover:text-red-700">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    `).join('')}
                </div>
                <div class="border-t pt-4">
                    <div class="flex justify-between items-center mb-4">
                        <span class="font-semibold">Total:</span>
                        <span class="text-xl font-bold">₹ ${total}</span>
                    </div>
                    <button onclick="checkout()" class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                        Proceed to Checkout
                    </button>
                </div>
            `;
        }
    }

    // Show/hide cart modal
    window.showCartModal = function() {
        cartModal.classList.remove('hidden');
    }

    window.hideCartModal = function() {
        cartModal.classList.add('hidden');
    }

    // Remove from cart
    window.removeFromCart = function(productId) {
        cart = cart.filter(item => item.id !== productId);
        updateCartCount();
        updateCartModal();
        if (cart.length === 0) {
            hideCartModal();
        }
    }

    // Clear cart
    window.clearCart = function() {
        cart = [];
        updateCartCount();
        updateCartModal();
        hideCartModal();
    }

    // Checkout
    window.checkout = function() {
        if (cart.length > 0) {
            alert('Proceeding to checkout...');
            // Add checkout logic here
        }
    }

    // Initialize
    renderProducts();
    updateCartCount();

    // Event listeners
    cartIcon.addEventListener('click', showCartModal);
    cartModal.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            hideCartModal();
        }
    });
});
