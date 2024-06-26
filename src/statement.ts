import type { Invoice, Performance } from "./invoices";
import { type Plays, PlayType } from "./plays";

interface StatementData {
  customer: string;
  performances: Performance[];
}
export function statement(invoice: Invoice, plays: Plays) {
  const statementData: StatementData = {
    customer: invoice.customer,
    performances: invoice.performances,
  };
  return renderPlainText(statementData, plays);
}

function renderPlainText(data: StatementData, plays: Plays) {
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

  function usd(aNumber: number) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(aNumber / 100);
  }

  function totalVolumeCredits() {
    let volumeCredits = 0;
    for (let perf of data.performances) {
      volumeCredits += volumeCreditsFor(perf);
    }
    return volumeCredits;
  }

  function totalAmount() {
    let result = 0;
    for (let perf of data.performances) {
      result += getChargeForPerformance(perf);
    }
    return result;
  }

  let result = `Statement for ${data.customer}\n`;

  for (let perf of data.performances) {
    // print line for this order
    result += ` ${getPlay(perf).name}: ${usd(getChargeForPerformance(perf))} (${perf.audience} seats)\n`;
  }

  result += `Amount owed is ${usd(totalAmount())}\n`;
  result += `You earned ${totalVolumeCredits()} credits\n`;
  return result;
}
