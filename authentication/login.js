const submitBtn = document.querySelector(".submit-btn");
submitBtn.addEventListener("click", event => {
  event.preventDefault();

  if (localStorage.getItem("jwt-token") !== null) {
    console.log("Esti deja logat");
  } else {
    const username = document.querySelector("input[name='username']").value;
    const password = document.querySelector("input[name='password']").value;

    fetch("/auth/login", {
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
  }
});
