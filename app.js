const BASE_URL = "https://api.exchangerate-api.com/v4/latest";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// Populate country options
for (let select of dropdowns) {
  for (currCode in countryList) {
    let option = document.createElement("option");
    option.value = currCode;
    option.textContent = currCode;
    if (select.name === "from" && currCode === "USD") option.selected = true;
    if (select.name === "to" && currCode === "INR") option.selected = true;
    select.appendChild(option);
  }

  select.addEventListener("change", (e) => {
    updateFlag(e.target);
  });
}

function updateFlag(element) {
  const currCode = element.value;
  const countryCode = countryList[currCode];
  const img = element.parentElement.querySelector("img");
  img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
}

async function updateExchangeRate() {
  let amountInput = document.querySelector(".amount input");
  let amtVal = amountInput.value;

  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amountInput.value = "1";
  }

  try {
    const response = await fetch(`${BASE_URL}/${fromCurr.value}`);
    const data = await response.json();
    const rate = data.rates[toCurr.value];
    const finalAmount = (amtVal * rate).toFixed(2);
    msg.textContent = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
  } catch (err) {
    msg.textContent = "Something went wrong! Please try again.";
  }
}

btn.addEventListener("click", (e) => {
  e.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});
