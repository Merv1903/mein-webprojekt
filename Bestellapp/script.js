function renderMainContent() {
  renderHeaderAndSidebar();
  renderMenuNavigation();
  renderTopDishes(menuObjects.menu);
  renderMenuCategoriesAndDishes(menuObjects.menu);
  renderShoppingCart();
}

function renderHeaderAndSidebar() {
  const container = document.getElementById("content_menu_and_sidebar");
  container.innerHTML += getHeaderTemplate() + getMenuSidebarTemplate();
}

function renderMenuNavigation() {
  const menu = document.getElementById("content_menu");
  menu.innerHTML += getMenuNavigationTemplate();
}

function formatPrice(value) {
  return value.toFixed(2).replace(".", ",") + " €";
}

function renderMenuCategoriesAndDishes(menu) {
  const contentMenu = document.getElementById("content_menu");
  let lastCategory = null;
  let showCategory = true;
  let categoryImg = "";

  for (let i = 0; i < menu.length; i++) {
    const dish = menu[i];
    const currentCategory = dish.category;

    if (currentCategory !== lastCategory) {
      showCategory = true;
      lastCategory = currentCategory;
      categoryImg = menuObjects.categoryImages[currentCategory];
    }

    if (showCategory) {
      contentMenu.innerHTML += getMenuCategoryTemplate(currentCategory,categoryImg,"");
      showCategory = false;
    }

    contentMenu.innerHTML += getMenuDishTemplate(dish);
  }
}


function renderTopDishes(menuArray) {
  const container = document.getElementById("content_top_dish");
  if (!container) return;

  container.innerHTML = getTopDishesTemplate(menuArray);
}

function findTop3Dishes(menuArray) {
  let top1 = null,
    top2 = null,
    top3 = null;

  for (const dish of menuArray) {
    if (!top1 || dish.likes > top1.likes) {
      top3 = top2;
      top2 = top1;
      top1 = dish;
    } else if (!top2 || dish.likes > top2.likes) {
      top3 = top2;
      top2 = dish;
    } else if (!top3 || dish.likes > top3.likes) {
      top3 = dish;
    }
  }

  return [top1, top2, top3].filter(Boolean);
}

function getTopDishesTemplate(menuArray) {
  const topDishes = findTop3Dishes(menuArray);

  let topDishesHTML = '<div class="top_dishes_container">';
  for (const dish of topDishes) {
    topDishesHTML += showPopularDish(dish);
  }
  topDishesHTML += "</div>";

  return topDishesHTML;
}

let shoppingCart = [];

function addProductToCart(name, price) {
  for (let i = 0; i < shoppingCart.length; i++) {
    if (shoppingCart[i].name === name) {
      shoppingCart[i].quantity++;
      renderShoppingCart();
      updateCartButtonTotal();
      return;
    }
  }

  shoppingCart.push({ name, price, quantity: 1 });
  renderShoppingCart();
  updateCartButtonTotal();
}

function renderShoppingCart(targetId = "sidebar_shoppingcart_items") {
  const container = document.getElementById(targetId);
  if (!container) return;

  container.innerHTML = "";

  let subtotal = 0;
  let html = "";

  for (let i = 0; i < shoppingCart.length; i++) {
    const item = shoppingCart[i];
    subtotal += item.price * item.quantity;
    html += getShoppingCartTemplate(item);
  }

  container.innerHTML = html;

  if (shoppingCart.length > 0) {
    container.innerHTML += getShoppingCartSummaryTemplate(subtotal, 5.0);
  }

  toggleCartEmptyMessage(shoppingCart.length > 0);
}

function renderCartSummary(container, subtotal, shipping) {
  container.innerHTML += getShoppingCartSummaryTemplate(subtotal, shipping);
}

function toggleCartEmptyMessage(hasItems) {
  const captions1 = document.getElementsByClassName(
    "sidebar_shoppingcart_caption"
  );
  const captions2 = document.getElementsByClassName("sidebar_overlay_caption");

  for (let i = 0; i < captions1.length; i++) {
    captions1[i].style.display = hasItems ? "none" : "flex";
  }

  for (let i = 0; i < captions2.length; i++) {
    captions2[i].style.display = hasItems ? "none" : "flex";
  }
}

function updateCartButtonTotal() {
  let total = 0;

  for (let i = 0; i < shoppingCart.length; i++) {
    total += shoppingCart[i].price * shoppingCart[i].quantity;
  }

  const display = formatPrice(total);

  const totalCosts = document.getElementById("cart_button_total");
  if (totalCosts) {
    totalCosts.innerText = `🛒 Warenkorb ${display}`;
  }
}

function placeOrder() {
  shoppingCart = [];

  const messageHtml = getOrderConfirmationTemplate();

  const mainCart = document.getElementById("sidebar_shoppingcart_items");
  const overlayCart = document.getElementById("sidebar_overlay_content");

  if (mainCart) mainCart.innerHTML = messageHtml;
  if (overlayCart) overlayCart.innerHTML = messageHtml;

  updateCartButtonTotal();
}

function resetCartView() {
  renderShoppingCart();
  renderShoppingCart("sidebar_overlay_content");
  updateCartButtonTotal();
}

function toggleSidebarOverlay() {
  let overlay = document.getElementById("sidebar_overlay");

  if (window.innerWidth >= 850) {
    if (overlay) {
      overlay.style.display = "none";
    }
    return;
  }

  if (!overlay) {
    document.body.innerHTML += getSidebarOverlayTemplate();
    overlay = document.getElementById("sidebar_overlay");
  }

  if (overlay.style.display === "none" || overlay.style.display === "") {
    overlay.style.display = "flex";
    renderShoppingCart("sidebar_overlay_content");
  } else {
    overlay.style.display = "none";
  }
}

function decreaseQuantity(name) {
  for (let i = 0; i < shoppingCart.length; i++) {
    if (shoppingCart[i].name === name) {
      shoppingCart[i].quantity--;
      if (shoppingCart[i].quantity <= 0) {
        shoppingCart.splice(i, 1);
      }
      break;
    }
  }

  renderShoppingCart();
  renderShoppingCart("sidebar_overlay_content");
}

function removeItem(name) {
  shoppingCart = shoppingCart.filter((item) => item.name !== name);
  renderShoppingCart();
  renderShoppingCart("sidebar_overlay_content");
}
