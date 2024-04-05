import { invoices } from "../src/invoices";
import { plays, PlayType } from "../src/plays";
import { statement } from "../src/statement";

describe("statement", () => {
  it("should produce the correct statement for invoice 0", () => {
    // act
    const result = statement(invoices[0], plays);

    // assert
    expect(result).toMatchSnapshot();
  });
  it("should throw an error on unknown play type", () => {
    // arrange
    const invoice = {
      customer: "Le théâtre de trente sous",
      performances: [{ playID: "unknownTypePlay", audience: 20 }],
    };
    const plays = {
      unknownTypePlay: {
        name: "Play With Unknown Type",
        type: "my unknown play type" as PlayType,
      },
    };

    // assert
    expect(() => {
      statement(invoice, plays);
    }).toThrowErrorMatchingSnapshot();
  });
});
