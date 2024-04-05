import { invoices } from "../src/invoices";
import { plays } from "../src/plays";
import { statement } from "../src/statement";

describe("statement", () => {
  it("should produce the correct statement for invoice 0", () => {
    // Act
    const result = statement(invoices[0], plays);

    // Assert
    expect(result).toMatchSnapshot();
  });
});
