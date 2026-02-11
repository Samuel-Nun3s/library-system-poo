import { LoanStatus } from "../models/LoanStatus.js";

export default class Loan {
  #id: number;
  #book: number;
  #user: number;
  #dateLoan: Date;
  #expectedReturnDate: Date;
  #returnDate: Date | null;
  #status: LoanStatus;

  constructor(id: number, book: number, user: number) {
    if (!id) {
      throw new Error("Impossivel criar um emprestimo sem ID");
    }
    if (!book) {
      throw new Error("Impossivel criar um emprestimo sem livro");
    }
    if (!user) {
      throw new Error("Impossivel criar um emprestimo sem usuario");
    }

    const now = new Date();

    this.#id = id;
    this.#book = book;
    this.#user = user;
    this.#dateLoan = now;
    this.#expectedReturnDate = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    this.#returnDate = null;
    this.#status = LoanStatus.ACTIVE;
  }

  return(date: Date) {
    if (this.#status != LoanStatus.ACTIVE)
    if (!date) {
      throw new Error("Impossivel devolver um livro sem data");
    }

    this.#returnDate = date;
    this.#status = LoanStatus.RETURNED;

  }

  thisIsLate(currentDate: Date) {}

  calculateFine(currentDate: Date) {}

  getLoanId() {
    return this.#id;
  }
} 