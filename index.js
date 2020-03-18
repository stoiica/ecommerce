const PRODUCT_AMOUNT = 10;
let productsWithOffer = [];

// Verify if the user is logged in and also display all the products on the first page
document.addEventListener("DOMContentLoaded", event => {
  if (localStorage.getItem("jwt-token") !== null) {
    authBtns = document.querySelector(".nav-login-btns");
    authBtns.style.display = "none";
    document.querySelector(".nav-account").style.display = "block";
  }

  fetch("/api/products", {
    method: "GET",
    headers: {
      amount: PRODUCT_AMOUNT,
      category: "laptopuri"
    }
  })
    .then(res => res.json())
    .then(res => {
      productsWithOffer = res.response;
      displayProducts(productsWithOffer);
    });
});

document.querySelector(".nav-account").addEventListener("click", event => {
  accountOverflow = document.querySelector(".nav-account-overflow");
  if (accountOverflow.style.display === "block") {
    accountOverflow.style.display = "none";
  } else {
    accountOverflow.style.display = "block";
  }
});

document.querySelector(".nav-logout").addEventListener("click", event => {
  event.preventDefault();
  localStorage.removeItem("jwt-token");
  window.location.assign("/");
});

document.querySelector(".fa-bars").addEventListener("click", event => {
  // Toggle opacity on the overflow menu
  const navOverflow = document.querySelector(".nav-overflow");
  if (navOverflow.classList.contains("nav-overflow-opacity")) {
    navOverflow.classList.remove("nav-overflow-opacity");
  } else {
    navOverflow.classList.add("nav-overflow-opacity");
  }
});

function displayProducts(products) {
  for (let p of products) {
    let new_price = p.product_new_price.split(" ");
    let old_price = p.product_old_price.split(" ");
    let productDiv = document.createElement("div");
    productDiv.classList.add("deals-item");
    productDiv.innerHTML = `<a href="#"><img src="${p.product_img_url}" alt="product"/></a>
    <div class="deals-price">
      <div class="deals-new-price">
        <span class="new-price-main">
          <i class="fas fa-tag"></i>${new_price[0]}
        </span>
        <span class="price-secondary">,${new_price[1]}</span>
        <span class="price-currency">${p.product_currency}</span>
      </div>
      <div class="deals-old-price">
        <span class="old-price-main">${old_price[0]}</span>
        <span class="price-secondary">,${old_price[1]}</span>
        <span class="price-currency">${p.product_currency}</span>
        <div class="line-through"></div>
      </div>
    </div>
    <p class="deals-description">
      ${p.product_title}
    </p>
    <p class="deals-details">Vezi detalii</p>`;

    let productContent = document.querySelector(".deals-content");
    productContent.appendChild(productDiv);
  }
}
