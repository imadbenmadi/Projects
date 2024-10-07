async function get() {
let resp = await fetch("https://api.currencyfreaks.com/latest?apikey=887db31461d6485ebe9843bb95e2a0cd")
let data = await resp.json()   
let egp = data["rates"]["EGP"]
let SAR = data["rates"]["SAR"]
let amount = document.querySelector(".amount");
let egpPrice = document.querySelector(".egp span");
let sarPrice = document.querySelector(".sar span");
egpPrice.innerHTML = Math.round(amount.innerHTML * egp);
sarPrice.innerHTML = Math.round(amount.innerHTML * SAR);
}
get()