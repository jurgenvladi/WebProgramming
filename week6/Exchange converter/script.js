const currencyOne = document.getElementById("currency-one");
const amountOne = document.getElementById("amount-one");
const currencyTwo = document.getElementById("currency-two");
const amountTwo = document.getElementById("amount-two");
const rate = document.getElementById("rate");
const swap = document.getElementById("swap");
const darkModeToggle = document.getElementById("dark-mode-toggle");
const wrapper = document.querySelector(".wrapper");

const exchangeRates = {
  EUR: { EUR: 1, ALL: 117, USD: 1.07, GBP: 0.87, JPY: 160.5, CAD: 1.47, CHF: 0.97 },
  ALL: { EUR: 0.0085, ALL: 1, USD: 0.0091, GBP: 0.0074, JPY: 1.37, CAD: 0.013, CHF: 0.0083 },
  USD: { EUR: 0.93, ALL: 110, USD: 1, GBP: 0.82, JPY: 149.8, CAD: 1.38, CHF: 0.91 },
  GBP: { EUR: 1.15, ALL: 135, USD: 1.22, GBP: 1, JPY: 183.5, CAD: 1.69, CHF: 1.11 },
  JPY: { EUR: 0.0062, ALL: 0.73, USD: 0.0067, GBP: 0.0054, JPY: 1, CAD: 0.0092, CHF: 0.006 },
  CAD: { EUR: 0.68, ALL: 79.7, USD: 0.72, GBP: 0.59, JPY: 108.6, CAD: 1, CHF: 0.66 },
  CHF: { EUR: 1.03, ALL: 120.3, USD: 1.1, GBP: 0.9, JPY: 164.4, CAD: 1.52, CHF: 1 }
};

function calculate() {
  const fromCurrency = currencyOne.value;
  const toCurrency = currencyTwo.value;
  const amount = parseFloat(amountOne.value);

  if (!isNaN(amount) && amount >= 0) {
    const rateValue = exchangeRates[fromCurrency][toCurrency];
    const convertedAmount = amount * rateValue;
    amountTwo.value = convertedAmount.toFixed(2);
    rate.innerHTML = `<strong>1 ${fromCurrency} = ${rateValue.toFixed(4)} ${toCurrency}</strong>`;
  } else {
    amountTwo.value = "";
    rate.innerText = "Please enter a valid amount.";
  }
}

function toggleDarkMode() {
  const isDark = document.body.classList.toggle("dark-mode");
  localStorage.setItem("darkMode", isDark);
  darkModeToggle.textContent = isDark ? "☀️" : "🌙";
}

// Load dark mode preference on page load
window.addEventListener("DOMContentLoaded", () => {
  const isDark = localStorage.getItem("darkMode") === "true";
  if (isDark) {
    document.body.classList.add("dark-mode");
    darkModeToggle.textContent = "☀️";
  } else {
    darkModeToggle.textContent = "🌙";
  }
  calculate(); // Initial calculation on load
});

currencyOne.addEventListener("change", calculate);
amountOne.addEventListener("input", calculate);
currencyTwo.addEventListener("change", calculate);

swap.addEventListener("click", () => {
  const temp = currencyOne.value;
  currencyOne.value = currencyTwo.value;
  currencyTwo.value = temp;
  calculate();
  wrapper.classList.add("swapping");
  setTimeout(() => {
    wrapper.classList.remove("swapping");
  }, 300);
});

darkModeToggle.addEventListener("click", toggleDarkMode);

amountOne.addEventListener('blur', function () {
  if (this.value !== '' && !isNaN(parseFloat(this.value))) {
    this.value = parseFloat(this.value).toFixed(2);
  }
});
