import type { Invoice, Performance } from "./invoices";
import { type Plays, PlayType } from "./plays";

export function statement(invoice: Invoice, plays: Plays) {
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

  function volumeCreditsFor(aPerformance: Performance): number {
    let result = 0;
    result += Math.max(aPerformance.audience - 30, 0);
    if ("comedy" === getPlay(aPerformance).type) {
      result += Math.floor(aPerformance.audience / 5);
    }
    return result;
  }

  function format(aNumber: number) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(aNumber);
  }

  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `Statement for ${invoice.customer}\n`;

  for (let perf of invoice.performances) {
    volumeCredits += volumeCreditsFor(perf);
    // print line for this order
    result += ` ${getPlay(perf).name}: ${format(getChargeForPerformance(perf) / 100)} (${perf.audience} seats)\n`;
    totalAmount += getChargeForPerformance(perf);
  }
  result += `Amount owed is ${format(totalAmount / 100)}\n`;
  result += `You earned ${volumeCredits} credits\n`;
  return result;
}
