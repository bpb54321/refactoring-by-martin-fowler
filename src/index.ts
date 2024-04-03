import { statement } from "./statement";
import { invoices } from "./invoices";
import { plays } from "./plays";

const myStatement = statement(invoices[0], plays);

console.log(myStatement);
