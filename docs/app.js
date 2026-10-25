import { calculateSavings, priceFor } from "./calculations.mjs";

const money = new Intl.NumberFormat("en-US", { style:"currency", currency:"USD", maximumFractionDigits:0 });
const number = new Intl.NumberFormat("en-US", { maximumFractionDigits:1 });
const form = document.querySelector("#roi-form");
const output = document.querySelector("#roi-status");
const hours = document.querySelector("#hours-saved");
const savings = document.querySelector("#labor-savings");

function refreshCalculator() {
  try {
    const result = calculateSavings(Object.fromEntries(new FormData(form)));
    hours.textContent = number.format(result.hoursSaved);
    savings.textContent = money.format(result.laborSavings);
    output.textContent = "Estimate updated.";
  } catch (error) { output.textContent = error.message; }
}
form.addEventListener("input", refreshCalculator);
form.addEventListener("submit", event => { event.preventDefault(); refreshCalculator(); });
refreshCalculator();

const toggle = document.querySelector("#billing-toggle");
function refreshPricing() {
  const cycle = toggle.checked ? "yearly" : "monthly";
  document.querySelectorAll("[data-monthly]").forEach(node => {
    const price = priceFor(cycle, Number(node.dataset.monthly));
    node.querySelector("strong").textContent = money.format(price.displayed);
    node.querySelector("span").textContent = price.label;
    node.closest(".price-card").querySelector("[data-billed]").textContent = cycle === "yearly" ? `${money.format(price.billed)} billed once a year` : "Billed monthly";
  });
  document.querySelector("#billing-status").textContent = toggle.checked ? "Annual billing selected. Prices include a 20% discount." : "Monthly billing selected.";
}
toggle.addEventListener("change", refreshPricing); refreshPricing();

const menu = document.querySelector("#menu");
const nav = document.querySelector("#nav-links");
menu.addEventListener("click", () => { const open = menu.getAttribute("aria-expanded") === "true"; menu.setAttribute("aria-expanded", String(!open)); nav.dataset.open = String(!open); });
nav.addEventListener("click", event => { if (event.target.matches("a")) { menu.setAttribute("aria-expanded", "false"); nav.dataset.open = "false"; } });

document.querySelectorAll(".faq button").forEach(button => button.addEventListener("click", () => {
  const panel = document.querySelector(`#${button.getAttribute("aria-controls")}`);
  const open = button.getAttribute("aria-expanded") === "true";
  button.setAttribute("aria-expanded", String(!open)); panel.hidden = open;
}));
