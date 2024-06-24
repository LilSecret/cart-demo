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

const addItemToCart = (title, price) => {
  const numberPrice = Number(price.slice(1, price.length));

  total += numberPrice;

  for (const item of cart) {
    if (item["title"] === title) {
      item.quantityAmount += 1;
      return;
    }
  }

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
      <div class="">1</div>
    </div>
    <div>${price}</div>
    <div class="flex-group">
      <button class="btn cart-btn">
        <i class="fa-solid fa-plus"></i>
      </button>
      <button class="btn cart-btn">
        <i class="fa-solid fa-minus"></i>
      </button>
    </div>
    `;

  userCart.appendChild(newCartItem);
  return;
};

const updateUserTotal = () => {
  userCartTotal.innerHTML = `Total: $${total}`;
};

const updateUserCartItems = (title) => {
  const cartItem = userCart.querySelector(`[data-item="${title}"]`);
  const itemAmount = cartItem.querySelector();

  console.log(cartItem);
};

addGlobalEventListener("click", ".add-in-cart", (e) => {
  const parent = e.target.parentElement;
  const title = parent.querySelector(".card-title").innerHTML;
  const price = parent.querySelector(".card-price").innerHTML;

  addItemToCart(title, price);
  updateUserTotal();
  // console.log(cart);
  updateUserCartItems(title);
});
