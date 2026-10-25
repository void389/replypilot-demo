export function calculateSavings({ tickets, minutes, hourlyCost, automation }) {
  const values = [tickets, minutes, hourlyCost, automation].map(Number);
  if (values.some(value => !Number.isFinite(value) || value < 0)) throw new Error("Enter valid positive numbers.");
  const [ticketCount, minutesPerTicket, staffCost, automationPercent] = values;
  if (automationPercent > 100) throw new Error("Automation must be between 0% and 100%.");
  const hoursSaved = (ticketCount * minutesPerTicket / 60) * (automationPercent / 100);
  return { hoursSaved, laborSavings: hoursSaved * staffCost };
}

export function priceFor(cycle, monthlyPrice) {
  if (cycle === "monthly") return { displayed: monthlyPrice, billed: monthlyPrice, label:"per month" };
  if (cycle === "yearly") return { displayed: monthlyPrice * 0.8, billed: monthlyPrice * 12 * 0.8, label:"per month, billed annually" };
  throw new Error("Unknown billing cycle");
}
