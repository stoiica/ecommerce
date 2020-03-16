const submitBtn = document.querySelector(".submit-btn");
submitBtn.addEventListener("click", event => {
  event.preventDefault();

  if (localStorage.getItem("jwt-token") !== null) {
    console.log("You need to log out in order to perform this action");
    setTimeout(() => {
      window.location.assign("/");
    }, 1500);
  } else {
    const username = document.querySelector('input[name="username"]').value;
    const password = document.querySelector('input[name="password"]').value;

    if (
      password ===
        document.querySelector('input[name="confirm-password"]').value &&
      username !== ""
    ) {
      fetch("/auth/register", {
        method: "POST",
        body: JSON.stringify({
          username,
          password
        }),
        headers: {
          "Content-type": "application/json"
        }
      })
        .then(res => res.json())
        .then(res => {
          if (res.token) {
            localStorage.setItem("jwt-token", res.token);
            window.location.assign("/");
          } else {
            console.log(res.err);
          }
        });
    } else {
      console.log("Passwords doesn't match");
    }
  }
});
