document.addEventListener("DOMContentLoaded", event => {
  if (localStorage.getItem("jwt-token") !== null) {
    authBtns = document.querySelector(".nav-login-btns");
    authBtns.style.display = "none";
    document.querySelector(".nav-account").style.display = "block";
  }
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
