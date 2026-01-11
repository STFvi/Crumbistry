// === DATA ===
const PRODUCTS = [
  { id: "1", name: "Velvet Rose", category: "Cakes", price: 78.00, image: "https://images.unsplash.com/photo-1627834377411-8da5f4f09de8?auto=format&fit=crop&q=80&w=800", tags: ["Signature", "Sweet"], description: "Layers of red velvet sponge with raspberry coulis and rose-infused buttercream.", rating: 5 },
  { id: "2", name: "Truffle Dream", category: "Cakes", price: 85.00, image: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&q=80&w=800", tags: ["Best Seller", "Rich"], description: "Rich dark chocolate ganache with truffle filling and gold leaf finish.", rating: 5 },
  { id: "3", name: "Lemon Zing", category: "Cakes", price: 72.00, image: "https://images.unsplash.com/photo-1519340333755-56e9c1d04579?auto=format&fit=crop&q=80&w=800", tags: ["Citrus", "Fresh"], description: "Zesty lemon sponge with floral elderflower buttercream.", rating: 4.8 },
  { id: "4", name: "Caramel Drip", category: "Cakes", price: 76.00, image: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&q=80&w=800", tags: ["Gooey", "Salty"], description: "Vanilla bean cake with house-made caramel drip and pretzel crunch.", rating: 4.9 },
  { id: "5", name: "Berry Bliss", category: "Cupcakes", price: 5.50, image: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&q=80&w=800", tags: ["GF", "Fruity"], description: "Almond flour base with fresh strawberry frosting.", rating: 4.7 },
  { id: "6", name: "Choc Muffin", category: "Cupcakes", price: 4.50, image: "https://images.unsplash.com/photo-1599785209707-306788afab78?auto=format&fit=crop&q=80&w=800", tags: ["Kids Love", "Yum"], description: "Moist chocolate muffin with chocolate chunks.", rating: 4.8 },
  { id: "7", name: "Macaron Set", category: "Gift Boxes", price: 35.00, image: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&q=80&w=800", tags: ["Gifting", "Colorful"], description: "Assortment of 12 premium French macarons.", rating: 5 },
  { id: "8", name: "Butter Croissant", category: "Pastries", price: 4.20, image: "https://images.unsplash.com/photo-1555507036-ab1f40388085?auto=format&fit=crop&q=80&w=800", tags: ["Flaky", "Warm"], description: "Buttery, flaky, authentic French croissant.", rating: 4.9 }
];

// === STATE ===
let currentView = 'home';
let cart = [];
let categoryFilter = 'All';
let selectedProduct = null;
let customSubmitted = false;

// === DOM ELEMENTS ===
const mainContent = document.getElementById('mainContent');

// === ICONS ===
const icons = {
  plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M5 12h14"/><path d="M12 5v14"/></svg>',
  minus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M5 12h14"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>',
  star: '<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
  heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6 9 17l-5-5"/></svg>',
  smile: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/></svg>',
  truck: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 18H3c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v11"/><path d="M14 9h4l4 4v4c0 .6-.4 1-1 1h-2"/><circle cx="7" cy="18" r="2"/><path d="M15 18H9"/><circle cx="17" cy="18" r="2"/></svg>',
  award: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>',
  bag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>'
};

// === TEMPLATES ===
function renderHero() {
  return `
    <section class="hero">
      <div class="hero-card">
        <div class="hero-bg-1"></div>
        <div class="hero-bg-2"></div>
        <div class="hero-bg-3"></div>
        <div class="hero-grid">
          <div class="hero-content">
            <div class="hero-badge">
              ${icons.smile}
              <span>Fresh from the oven!</span>
            </div>
            <h1 class="hero-title font-serif">Life is Short.<br><span class="accent">Eat Cake First.</span></h1>
            <p class="hero-desc">The softest sponge, the richest cream, and a whole lot of love. Baked fresh every morning in our little kitchen.</p>
            <div class="hero-btns">
              <button class="btn btn-primary" onclick="changeView('shop')">Order Now ${icons.arrow}</button>
              <button class="btn btn-secondary" onclick="changeView('custom')">Custom Cakes</button>
            </div>
          </div>
          <div class="hero-images">
            <div class="hero-img-1"><img src="https://images.unsplash.com/photo-1578985545062-69928b1d9587" alt="Cake"></div>
            <div class="hero-img-2"><img src="https://images.unsplash.com/photo-1614707267469-951e4900a66d" alt="Cupcakes"></div>
            <div class="hero-emoji"><div class="hero-emoji-inner">🧁</div></div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderTrustRow() {
  return `
    <section class="trust-section">
      <div class="trust-card">
        <div class="trust-grid">
          <div class="trust-item">
            ${icons.truck}
            <h3 class="font-serif">Super Fast Delivery</h3>
            <p>To your door in 2 hours</p>
          </div>
          <div class="trust-item">
            ${icons.award}
            <h3 class="font-serif">Top Quality Stuff</h3>
            <p>Real butter, real happiness</p>
          </div>
          <div class="trust-item">
            ${icons.star}
            <h3 class="font-serif">4.9 Star Rating</h3>
            <p>Everyone loves us!</p>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderProductCard(product) {
  return `
    <div class="product-card" onclick="viewProduct('${product.id}')">
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}">
        <div class="product-tags">
          ${product.tags.map(tag => `<span class="product-tag">${tag}</span>`).join('')}
        </div>
        <button class="product-add" onclick="event.stopPropagation(); addToCart('${product.id}')">
          ${icons.plus}
        </button>
      </div>
      <div class="product-info">
        <p class="product-category">${product.category}</p>
        <h3 class="product-name font-serif">${product.name}</h3>
        <span class="product-price">$${product.price.toFixed(2)}</span>
      </div>
    </div>
  `;
}

function renderProductsSection(products, title = "Crowd Pleasers", subtitle = "Warning: May cause extreme happiness.") {
  return `
    <section class="products-section">
      <div class="section-header">
        <h2 class="font-serif">${title}</h2>
        <p>${subtitle}</p>
      </div>
      <div class="product-grid">
        ${products.map(p => renderProductCard(p)).join('')}
      </div>
    </section>
  `;
}

function renderHome() {
  return renderHero() + renderTrustRow() + renderProductsSection(PRODUCTS.slice(0, 4));
}

function renderShop() {
  const filtered = categoryFilter === 'All' ? PRODUCTS : PRODUCTS.filter(p => p.category === categoryFilter);
  const categories = ['All', 'Cakes', 'Cupcakes', 'Gift Boxes'];
  
  return `
    <div class="shop-page">
      <div class="shop-header">
        <h1 class="font-serif">The Menu</h1>
        <div class="filter-btns">
          ${categories.map(cat => `
            <button class="filter-btn ${categoryFilter === cat ? 'active' : ''}" onclick="filterCategory('${cat}')">${cat}</button>
          `).join('')}
        </div>
      </div>
      <div class="product-grid animate-fade-in">
        ${filtered.map(p => renderProductCard(p)).join('')}
      </div>
    </div>
  `;
}

function renderProductDetail() {
  const p = selectedProduct;
  return `
    <div class="product-detail">
      <button class="back-btn" onclick="closeProductDetail()">
        ${icons.arrow} Back to Menu
      </button>
      <div class="detail-grid">
        <div class="detail-image">
          <img src="${p.image}" alt="${p.name}">
          <div class="detail-badge">Only 4 left today!</div>
        </div>
        <div class="detail-content">
          <div>
            <div class="detail-meta">
              <span class="detail-cat">${p.category}</span>
              <div class="detail-rating">
                ${icons.star}${icons.star}${icons.star}${icons.star}${icons.star}
                <span>(124)</span>
              </div>
            </div>
            <h1 class="detail-title font-serif">${p.name}</h1>
            <p class="detail-price">$${p.price.toFixed(2)}</p>
          </div>
          <p class="detail-desc">${p.description}</p>
          <div>
            <h4 class="detail-tags-label">Good to know</h4>
            <div class="detail-tags">
              ${p.tags.map(tag => `<span class="detail-tag">${tag}</span>`).join('')}
            </div>
          </div>
          <div class="detail-actions">
            <button class="detail-add-btn" onclick="addToCart('${p.id}')">
              Add to Bag ${icons.plus}
            </button>
            <button class="detail-fav-btn">${icons.heart}</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderCustom() {
  if (customSubmitted) {
    return `
      <div class="custom-success">
        <div class="success-icon">${icons.check}</div>
        <h2 class="success-title font-serif">Yay! Received.</h2>
        <p class="success-desc">We'll check our oven schedule and get back to you within 24 hours!</p>
        <button class="success-btn" onclick="resetCustomForm()">Send another one</button>
      </div>
    `;
  }
  
  return `
    <div class="custom-page">
      <div class="custom-header">
        <h1 class="font-serif">Dream Cakes</h1>
        <p>Tell us about your party! Weddings, birthdays, or just because it's Tuesday.</p>
      </div>
      <div class="custom-card">
        <div class="custom-form-wrap">
          <form class="custom-form" onsubmit="submitCustomForm(event)">
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Name</label>
                <input type="text" class="form-input" placeholder="Your name" required>
              </div>
              <div class="form-group">
                <label class="form-label">Contact</label>
                <input type="text" class="form-input" placeholder="Phone or Email" required>
              </div>
            </div>
            <div class="form-group full">
              <label class="form-label">The Vibe</label>
              <textarea class="form-input" rows="4" placeholder="Unicorns? Dinosaurs? Elegant floral? Tell us everything!"></textarea>
            </div>
            <button type="submit" class="form-submit">Send Request</button>
          </form>
        </div>
        <div class="custom-image">
          <img src="https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&q=80&w=800" alt="Wedding Cake">
        </div>
      </div>
    </div>
  `;
}

function renderAbout() {
  return `
    <div class="about-page">
      <h1 class="font-serif">Our Story</h1>
      <p>Coming soon...</p>
    </div>
  `;
}

// === CART ===
function renderCart() {
  const cartItems = document.getElementById('cartItems');
  const cartFooter = document.getElementById('cartFooter');
  
  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-icon">${icons.bag}</div>
        <p class="cart-empty-title">Your box is empty!</p>
        <p class="cart-empty-desc">Time to fill it with goodies.</p>
      </div>
    `;
    cartFooter.innerHTML = '';
    cartFooter.classList.add('empty');
  } else {
    cartItems.innerHTML = cart.map(item => `
      <div class="cart-item">
        <div class="cart-item-img"><img src="${item.image}" alt="${item.name}"></div>
        <div class="cart-item-info">
          <h3 class="cart-item-name font-serif">${item.name}</h3>
          <p class="cart-item-price">$${item.price.toFixed(2)}</p>
          <div class="cart-item-qty">
            <button class="qty-btn" onclick="updateQuantity('${item.id}', -1)">${icons.minus}</button>
            <span class="qty-value">${item.qty}</span>
            <button class="qty-btn" onclick="updateQuantity('${item.id}', 1)">${icons.plus}</button>
          </div>
        </div>
      </div>
    `).join('');
    
    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
    cartFooter.innerHTML = `
      <div class="cart-total">
        <span>Total</span>
        <span>$${subtotal.toFixed(2)}</span>
      </div>
      <button class="checkout-btn">
        <span>Checkout</span>
        ${icons.arrow}
      </button>
    `;
    cartFooter.classList.remove('empty');
  }
  
  updateCartCount();
}

function updateCartCount() {
  const count = cart.reduce((acc, item) => acc + item.qty, 0);
  document.getElementById('cartCount').textContent = count;
  document.getElementById('cartCount').dataset.count = count;
  document.getElementById('mobileCartCount').textContent = count;
  document.getElementById('mobileCartCount').dataset.count = count;
}

function toggleCart() {
  const overlay = document.getElementById('cartOverlay');
  const drawer = document.getElementById('cartDrawer');
  const isOpen = drawer.classList.contains('open');
  
  if (isOpen) {
    overlay.classList.remove('open');
    drawer.classList.remove('open');
  } else {
    renderCart();
    overlay.classList.add('open');
    drawer.classList.add('open');
  }
}

function addToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  
  const existing = cart.find(p => p.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  
  toggleCart();
}

function updateQuantity(productId, change) {
  const item = cart.find(p => p.id === productId);
  if (item) {
    item.qty = Math.max(0, item.qty + change);
    if (item.qty === 0) {
      cart = cart.filter(p => p.id !== productId);
    }
  }
  renderCart();
}

// === NAVIGATION ===
function changeView(view) {
  currentView = view;
  selectedProduct = null;
  
  // Update nav links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.dataset.view === view);
  });
  document.querySelectorAll('.mobile-nav-item').forEach(item => {
    item.classList.toggle('active', item.dataset.view === view);
  });
  
  render();
}

function filterCategory(cat) {
  categoryFilter = cat;
  render();
}

function viewProduct(productId) {
  selectedProduct = PRODUCTS.find(p => p.id === productId);
  render();
}

function closeProductDetail() {
  selectedProduct = null;
  render();
}

function submitCustomForm(e) {
  e.preventDefault();
  customSubmitted = true;
  render();
}

function resetCustomForm() {
  customSubmitted = false;
  render();
}

// === RENDER ===
function render() {
  if (selectedProduct) {
    mainContent.innerHTML = renderProductDetail();
    return;
  }
  
  switch (currentView) {
    case 'home': mainContent.innerHTML = renderHome(); break;
    case 'shop': mainContent.innerHTML = renderShop(); break;
    case 'custom': mainContent.innerHTML = renderCustom(); break;
    case 'about': mainContent.innerHTML = renderAbout(); break;
    default: mainContent.innerHTML = renderHome();
  }
}

// === SEARCH ===
let searchOpen = false;

function toggleSearch() {
  const overlay = document.getElementById('searchOverlay');
  const modal = document.getElementById('searchModal');
  const input = document.getElementById('searchInput');
  
  searchOpen = !searchOpen;
  
  if (searchOpen) {
    overlay.classList.add('open');
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(() => input.focus(), 100);
  } else {
    overlay.classList.remove('open');
    modal.classList.remove('open');
    document.body.style.overflow = '';
    clearSearch();
  }
}

function handleSearchInput(query) {
  const suggestions = document.getElementById('searchSuggestions');
  const clearBtn = document.getElementById('searchClear');
  
  // Show/hide clear button
  clearBtn.style.display = query.length > 0 ? 'flex' : 'none';
  
  if (query.length === 0) {
    suggestions.innerHTML = renderSearchPlaceholder();
    return;
  }
  
  const searchTerm = query.toLowerCase().trim();
  const results = PRODUCTS.filter(product => {
    const searchFields = [
      product.name.toLowerCase(),
      product.category.toLowerCase(),
      product.description.toLowerCase(),
      ...product.tags.map(tag => tag.toLowerCase())
    ].join(' ');
    return searchFields.includes(searchTerm);
  });
  
  if (results.length === 0) {
    suggestions.innerHTML = `
      <div class="search-empty">
        <div class="search-empty-icon">🔍</div>
        <p class="search-empty-title">No results found</p>
        <p class="search-empty-desc">Try searching for "cake", "cupcake", or "chocolate"</p>
      </div>
    `;
  } else {
    suggestions.innerHTML = `
      <div class="search-results-header">
        <span>${results.length} result${results.length !== 1 ? 's' : ''} found</span>
      </div>
      <div class="search-results">
        ${results.map(product => `
          <div class="search-result-item" onclick="selectSearchResult('${product.id}')">
            <div class="search-result-image">
              <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="search-result-info">
              <span class="search-result-category">${product.category}</span>
              <h4 class="search-result-name">${highlightMatch(product.name, query)}</h4>
              <span class="search-result-price">$${product.price.toFixed(2)}</span>
            </div>
            <button class="search-result-add" onclick="event.stopPropagation(); addToCartFromSearch('${product.id}')">
              ${icons.plus}
            </button>
          </div>
        `).join('')}
      </div>
    `;
  }
}

function highlightMatch(text, query) {
  const regex = new RegExp(`(${query})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
}

function renderSearchPlaceholder() {
  const popular = PRODUCTS.slice(0, 4);
  return `
    <div class="search-placeholder">
      <p class="search-placeholder-title">Popular Searches</p>
      <div class="search-popular-tags">
        <button class="search-tag" onclick="setSearchQuery('Cake')">🎂 Cake</button>
        <button class="search-tag" onclick="setSearchQuery('Chocolate')">🍫 Chocolate</button>
        <button class="search-tag" onclick="setSearchQuery('Cupcake')">🧁 Cupcake</button>
        <button class="search-tag" onclick="setSearchQuery('Gift')">🎁 Gift</button>
      </div>
    </div>
    <div class="search-trending">
      <p class="search-trending-title">Trending Now</p>
      <div class="search-trending-items">
        ${popular.map(p => `
          <div class="search-trending-item" onclick="selectSearchResult('${p.id}')">
            <img src="${p.image}" alt="${p.name}">
            <span>${p.name}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function setSearchQuery(query) {
  const input = document.getElementById('searchInput');
  input.value = query;
  handleSearchInput(query);
}

function clearSearch() {
  const input = document.getElementById('searchInput');
  const suggestions = document.getElementById('searchSuggestions');
  const clearBtn = document.getElementById('searchClear');
  
  input.value = '';
  clearBtn.style.display = 'none';
  suggestions.innerHTML = renderSearchPlaceholder();
}

function selectSearchResult(productId) {
  toggleSearch();
  viewProduct(productId);
}

function addToCartFromSearch(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  
  const existing = cart.find(p => p.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  
  updateCartCount();
  
  // Show brief feedback
  const btn = event.currentTarget;
  btn.innerHTML = icons.check;
  btn.style.background = '#25D366';
  btn.style.color = 'white';
  setTimeout(() => {
    btn.innerHTML = icons.plus;
    btn.style.background = '';
    btn.style.color = '';
  }, 1000);
}

// === INIT ===
document.addEventListener('DOMContentLoaded', () => {
  render();
  renderCart();
  
  // Initialize search suggestions
  const suggestions = document.getElementById('searchSuggestions');
  if (suggestions) {
    suggestions.innerHTML = renderSearchPlaceholder();
  }
  
  // Handle ESC key to close search
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && searchOpen) {
      toggleSearch();
    }
  });
});
