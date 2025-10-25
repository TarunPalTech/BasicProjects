document.addEventListener("DOMContentLoaded", () => {
  const products = [
    { id: 1, name: "Product 1", price: 49.99 },
    { id: 2, name: "Product 2", price: 249.99 },
    { id: 3, name: "Product 3", price: 41.99 },
    { id: 4, name: "Product 4", price: 89.99 },
  ];

  const productList = document.getElementById("product-list");
  const cardItems = document.getElementById("card-items");
  const totalPrice = document.getElementById("total-price");
  const checkoutButton = document.getElementById("checkout-btn");
  const errorMessage = document.getElementById("error-message");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  renderCart();

  // Render product list
  products.forEach((product) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <span>${product.name} - $${product.price}</span>
      <button data-id="${product.id}">Add to Cart</button>
    `;
    productList.appendChild(div);
  });

  // Add to cart handler
  productList.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
      const productId = parseInt(event.target.getAttribute("data-id"));
      const product = products.find((p) => p.id === productId);
      if (product) {
        cart.push(product);
        saveCart();
        renderCart();
      }
    }
  });

  // Remove from cart handler
  cardItems.addEventListener("click", (event) => {
    if (event.target.classList.contains("bgred")) {
      const index = parseInt(event.target.getAttribute("data-index"));
      cart.splice(index, 1);
      saveCart();
      renderCart();
    }
  });

  // Checkout handler
  checkoutButton.addEventListener("click", () => {
    alert("Checkout successfully!");
    cart = [];
    saveCart();
    renderCart();
  });

  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function renderCart() {
    cardItems.innerHTML = "";
    let total = 0;

    cart.forEach((product, index) => {
      const itemDiv = document.createElement("div");
      itemDiv.innerHTML = `
        <span>${product.name} - $${product.price}</span>
        <button class="bgred" data-index="${index}">Remove</button>
      `;
      cardItems.appendChild(itemDiv);
      total += product.price;
    });

    totalPrice.textContent = total.toFixed(2);
  }
});
