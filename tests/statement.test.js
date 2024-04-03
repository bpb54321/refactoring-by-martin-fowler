"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const invoices_1 = require("../src/invoices");
const plays_1 = require("../src/plays");
const statement_1 = require("../src/statement");
describe("statement", () => {
    it("should produce the correct statement for invoice 0", () => {
        // Act
        const result = (0, statement_1.statement)(invoices_1.invoices[0], plays_1.plays);
        // Assert
        expect(result).toMatchSnapshot();
    });
});
