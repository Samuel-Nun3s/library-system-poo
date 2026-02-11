import { LoanStatus } from "../models/LoanStatus.js";
import Book from "./Book.js";
import User from "./User.js";

export default class Loan {
  #id: number;
  #book: Book;
  #user: User;
  #dateLoan: Date;
  #expectedReturnDate: Date;
  #returnDate: Date | null;
  #status: LoanStatus;

  constructor(id: number, book: Book, user: User) {
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
    if (this.#status !== LoanStatus.ACTIVE) {
      throw new Error("Esse emprestimo ja foi devolvido");
    }

    if (!date) {
      throw new Error("Impossivel devolver um livro sem data");
    }

    this.#returnDate = date;

    const fine = this.calculateFine(date);

    if (fine > 0) {
      this.#status = LoanStatus.LATE;
    } else {
      this.#status = LoanStatus.RETURNED;
    }

    this.#book.markAsAvailable();
    this.#user.removeLoan(this.#book);

    return fine;
  }

  thisIsLate(currentDate: Date) {
    if (currentDate > this.#expectedReturnDate) {
      return true;
    }
    return false;
  }

  calculateFine(currentDate: Date): number {
    if (currentDate > this.#expectedReturnDate) {
      const diffInMs = currentDate.getTime() - this.#expectedReturnDate.getTime();
      const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
      return diffInDays * 2;
    }
    return 0;
  }

  getLoanId() {
    return this.#id;
  }

  getLoanStatus() {
    return this.#status;
  }
} 