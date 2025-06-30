const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const fromAmount = document.getElementById("fromAmount");
const toAmount = document.getElementById("toAmount");
const result = document.getElementById("result");

const currencyList = ["USD", "EUR", "GBP", "INR", "JPY", "AUD", "CAD", "CHF", "CNY", "BRL"];

// Populate dropdowns
currencyList.forEach(currency => {
  fromCurrency.innerHTML += `<option value="${currency}">${currency}</option>`;
  toCurrency.innerHTML += `<option value="${currency}">${currency}</option>`;
});

// Set default currencies
fromCurrency.value = "USD";
toCurrency.value = "EUR";

async function convert() {
  const from = fromCurrency.value;
  const to = toCurrency.value;
  const amount = parseFloat(fromAmount.value);

  if (isNaN(amount)) {
    alert("Please enter a valid amount.");
    return;
  }

  const url = `https://api.exchangerate-api.com/v4/latest/${from}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    const rate = data.rates[to];
    const convertedAmount = (amount * rate).toFixed(2);
    toAmount.value = convertedAmount;
    result.innerText = `${amount} ${from} = ${convertedAmount} ${to}`;
  } catch (error) {
    result.innerText = "Error fetching exchange rate.";
  }
}
