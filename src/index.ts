import Library from "./domain/Library.js";

const library = new Library();

const book = library.registerBook("Clean Code", "Robert Martin");
const user = library.registerUser("Samuel");

const loan = library.borrowBook(user.getUserId(), book.getBookId());

const fine = library.returnBook(loan.getLoanId());

console.log("Multa: ", fine);