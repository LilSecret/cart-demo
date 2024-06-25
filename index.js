const userCart = document.querySelector(".cart");
const userCartTotal = document.querySelector(".cart-total");

const cart = [];
let total = 0;

const addGlobalEventListener = (type, selector, callback) => {
  document.addEventListener(type, (e) => {
    if (e.target.matches(selector)) {
      callback(e);
    }
  });
};

const addOrSubtractCartItem = (title, add) => {
  for (const item of cart) {
    if (item["title"] === title) {
      if (add === "add") {
        item.quantityAmount += 1;
      } else {
        item.quantityAmount -= 1;
      }
      return true;
    }
  }
  console.log("Item was not found in cart.");
  return false;
};

const removeItemFromCart = (title) => {
  const itemInUserCart = userCart.querySelector(`[data-item="${title}"]`);

  for (let i = 0; i < cart.length; i++) {
    if (cart[i].title === title) {
      cart.splice(i, 1);
    }
  }

  userCart.removeChild(itemInUserCart);
};

const addItemToCart = (title, price) => {
  const numberPrice = Number(price.slice(1, price.length));

  total += numberPrice;

  // updates the item if found in cart
  if (addOrSubtractCartItem(title, "add")) {
    return;
  }

  // adds the item to cart
  cart.push({
    title,
    price: numberPrice,
    quantityAmount: 1,
    quantityTotalPrice: function () {
      return this.price * this.quantityAmount;
    },
  });

  const newCartItem = document.createElement("div");
  newCartItem.classList.add("cart-item");
  newCartItem.setAttribute("data-item", title);

  newCartItem.innerHTML = `
    <h4 class="item-title heading">${title}</h4>
    <div class="flex-group item-amount">
      <div class="">Qty:</div>
      <div class="quantity-value">1</div>
    </div>
    <div class="quantity-price-total">${price}</div>
    <div class="flex-group">
      <button class="btn cart-btn cart-item-add">
        <i class="fa-solid fa-plus"></i>
      </button>
      <button class="btn cart-btn cart-item-subtract">
        <i class="fa-solid fa-minus"></i>
      </button>
    </div>
    `;

  userCart.appendChild(newCartItem);
};

const updateUserTotal = () => {
  userCartTotal.innerHTML = `Total: $${total}`;
};

const updateUserCartItems = (title) => {
  const cartItem = userCart.querySelector(`[data-item="${title}"]`);
  const userCartItemQuantity = cartItem.querySelector(".quantity-value");
  const userQuantityPriceTotal = cartItem.querySelector(
    ".quantity-price-total"
  );

  userCartItemQuantity.innerHTML = `${getCartItemPropertyValue(
    title,
    "quantityAmount"
  )}`;

  userQuantityPriceTotal.innerHTML = `$${getCartItemPropertyValue(
    title,
    "quantityTotalPrice"
  )}`;

  if (userCartItemQuantity.innerHTML == 0) {
    removeItemFromCart(title);
  }
};

const getCartItemPropertyValue = (title, property) => {
  for (const item of cart) {
    if (item["title"] === title) {
      return typeof item[property] === "function"
        ? item[property]()
        : item[property];
    }
  }
};

// add to cart buttons listener
addGlobalEventListener("click", ".add-in-cart", (e) => {
  const parent = e.target.parentElement;
  const title = parent.querySelector(".card-title").innerHTML;
  const price = parent.querySelector(".card-price").innerHTML;

  addItemToCart(title, price);
  updateUserTotal();
  updateUserCartItems(title);
});

// add item in cart btn
addGlobalEventListener("click", ".cart-item-add", (e) => {
  const cartItem = e.target.parentElement.parentElement;
  const itemTitle = cartItem.getAttribute("data-item");
  const itemPrice = getCartItemPropertyValue(itemTitle, "price");

  total += itemPrice;

  addOrSubtractCartItem(itemTitle, "add");
  updateUserTotal();
  updateUserCartItems(itemTitle);
});

// subtract item in cart btn
addGlobalEventListener("click", ".cart-item-subtract", (e) => {
  const cartItem = e.target.parentElement.parentElement;
  const itemTitle = cartItem.getAttribute("data-item");
  const itemPrice = getCartItemPropertyValue(itemTitle, "price");

  total -= itemPrice;

  addOrSubtractCartItem(itemTitle, "subtract");
  updateUserTotal();
  updateUserCartItems(itemTitle);
});
