let shoppingCart = [];

function renderMainContent() {
  renderHeaderAndSidebar();
  renderMenuNavigation();
  renderMenuCategoriesAndDishes(menuObjects.menu);
  initShoppingCartRendering();
}

function initShoppingCartRendering(targetId = "sidebar_shoppingcart_items") {
  renderShoppingCart(targetId);
  updateCartButtonTotal();
}

function renderHeaderAndSidebar() {
  const contentContainer = document.getElementById("content_menu_and_sidebar");
  contentContainer.innerHTML += getHeaderTemplate() + getMenuSidebarTemplate();
}

function renderMenuNavigation() {
  const menuContainer = document.getElementById("content_menu");
  const linksHTML = generateCategoryLinksHTML(menuObjects.categories);
  menuContainer.innerHTML += getMenuNavigationTemplate(linksHTML);
}

function formatPrice(value) {
  return value.toFixed(2).replace(".", ",") + " €";
}

function renderMenuCategoriesAndDishes(menu) {
  const menuContainer = document.getElementById("content_menu");
  let lastCategory = null;

  for (let i = 0; i < menu.length; i++) {
    const dish = menu[i];
    const currentCategory = dish.category;

    if (currentCategory !== lastCategory) {
      lastCategory = currentCategory;
      const categoryImage = menuObjects.categoryImages[currentCategory];
      menuContainer.innerHTML += getMenuCategoryTemplate(currentCategory, categoryImage, "");
    }

    menuContainer.innerHTML += getMenuDishTemplate(dish);
  }
}

function increaseQuantity(name, price) {
  addProductToCart(name, price);
}

function addProductToCart(name, price) {
  for (let i = 0; i < shoppingCart.length; i++) {
    if (shoppingCart[i].name === name) {
      shoppingCart[i].quantity++;
      resetCartView();
      toggleCartEmptyMessage(true);
      return;
    }
  }

  shoppingCart.push({ name, price, quantity: 1 });
  resetCartView();
  toggleCartEmptyMessage(true);
}

function renderShoppingCart(targetId = "sidebar_shoppingcart_items") {
  const cartContainer = document.getElementById(targetId);
  if (!cartContainer) return;

  cartContainer.innerHTML = "";
  let subtotal = 0;
  const shipping = 5;

  for (let i = 0; i < shoppingCart.length; i++) {
    const item = shoppingCart[i];
    subtotal += item.price * item.quantity;
    cartContainer.innerHTML += getShoppingCartTemplate(item);
  }

  if (shoppingCart.length) {
    const total = subtotal + shipping;
    cartContainer.innerHTML += getShoppingCartSummaryTemplate(subtotal, shipping, total);
  }

  toggleCartEmptyMessage(shoppingCart.length > 0);
}

function updateCartButtonTotal() {
  let total = 0;
  for (let i = 0; i < shoppingCart.length; i++) {
    total += shoppingCart[i].price * shoppingCart[i].quantity;
  }
  const cartButton = document.getElementById("cart_button_total");
  if (cartButton) cartButton.innerText = `🛒 Warenkorb ${formatPrice(total)}`;
}

function placeOrder() {
  shoppingCart = [];
  const confirmationMessage = getOrderConfirmationTemplate();
  const sidebarCart = document.getElementById("sidebar_shoppingcart_items");
  const overlayCart = document.getElementById("sidebar_overlay_content");
  if (sidebarCart) sidebarCart.innerHTML = confirmationMessage;
  if (overlayCart) overlayCart.innerHTML = confirmationMessage;
  updateCartButtonTotal();
}

function toggleCartEmptyMessage(hasItems) {
  const sidebarCaptions = document.getElementsByClassName("sidebar_shoppingcart_caption");
  const overlayCaptions = document.getElementsByClassName("sidebar_overlay_caption");

  for (let i = 0; i < sidebarCaptions.length; i++) {
    sidebarCaptions[i].style.display = hasItems ? "none" : "flex";
  }

  for (let i = 0; i < overlayCaptions.length; i++) {
    overlayCaptions[i].style.display = hasItems ? "none" : "flex";
  }
}

function resetCartView() {
  initShoppingCartRendering();
  renderShoppingCart("sidebar_overlay_content");
  renderShoppingCart(); 
}

function toggleSidebarOverlay() {
  let overlayElement = document.getElementById("sidebar_overlay");

  if (window.innerWidth >= 850) {
    if (overlayElement) overlayElement.style.display = "none";
    document.body.classList.remove("overlay_no_scroll");
    return;
  }

  if (!overlayElement) {
    document.body.innerHTML += getSidebarOverlayTemplate();
    overlayElement = document.getElementById("sidebar_overlay");
  }

  const shouldShow = overlayElement.style.display === "none" || overlayElement.style.display === "";
  overlayElement.style.display = shouldShow ? "flex" : "none";
  document.body.classList.toggle("overlay_no_scroll", shouldShow);

  if (shouldShow) {
    renderShoppingCart("sidebar_overlay_content");
  }
}

function decreaseQuantity(name) {
  for (let i = 0; i < shoppingCart.length; i++) {
    if (shoppingCart[i].name === name) {
      shoppingCart[i].quantity--;
      if (shoppingCart[i].quantity <= 0) shoppingCart.splice(i, 1);
      break;
    }
  }

  resetCartView();
  toggleCartEmptyMessage(shoppingCart.length > 0);
}

function removeItem(name) {
  const updatedCart = [];
  for (let i = 0; i < shoppingCart.length; i++) {
    if (shoppingCart[i].name !== name) {
      updatedCart.push(shoppingCart[i]);
    }
  }
  shoppingCart = updatedCart;
  resetCartView();
  toggleCartEmptyMessage(shoppingCart.length > 0);
}