import type { Invoice, Performance } from "./invoices";
import { type Play, type Plays, PlayType } from "./plays";

export function statement(invoice: Invoice, plays: Plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `Statement for ${invoice.customer}\n`;
  const format = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format;

  function getChargeForPerformance(aPerformance: Performance) {
    let result = 0;
    switch (getPlay(aPerformance).type) {
      case PlayType.Tragedy:
        result = 40000;
        if (aPerformance.audience > 30) {
          result += 1000 * (aPerformance.audience - 30);
        }
        break;
      case PlayType.Comedy:
        result = 30000;
        if (aPerformance.audience > 20) {
          result += 10000 + 500 * (aPerformance.audience - 20);
        }
        result += 300 * aPerformance.audience;
        break;
      default:
        throw new Error(`unknown type: ${getPlay(aPerformance).type}`);
    }
    return result;
  }

  function getPlay(performance: Performance) {
    return plays[performance.playID];
  }

  for (let perf of invoice.performances) {
    const thisAmount = getChargeForPerformance(perf);
    // add volume credits
    volumeCredits += Math.max(perf.audience - 30, 0);
    // add extra credit for every ten comedy attendees
    if ("comedy" === getPlay(perf).type)
      volumeCredits += Math.floor(perf.audience / 5);
    // print line for this order
    result += ` ${getPlay(perf).name}: ${format(thisAmount / 100)} (${perf.audience} seats)\n`;
    totalAmount += thisAmount;
  }
  result += `Amount owed is ${format(totalAmount / 100)}\n`;
  result += `You earned ${volumeCredits} credits\n`;
  return result;
}
