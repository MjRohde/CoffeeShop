const buttonCheckout = document.getElementById("checkOutButton");
const data = JSON.parse(localStorage.getItem("cart"));
let array = [];
for (let i = 0; i < data.length; i++) {
  array.push({ id: i, quantity: data[i].quantity });
}
console.log(array);
if (buttonCheckout) {
  buttonCheckout.addEventListener("click", (e) => {
    console.log(e.type);
    fetch("http://localhost:3001/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: array,
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return res.json().then((json) => Promise.reject(json));
      })
      .then(({ url }) => {
        window.location = url;
      })
      .catch((e) => {
        console.error(e.error);
      });
  });
}
