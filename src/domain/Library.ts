import Book from "./Book.js";
import User from "./User.js";
import Loan from "./Loan.js";
import { LoanStatus } from "../models/LoanStatus.js";

export default class Library {
  books: Book[];
  users: User[];
  loans: Loan[];

  constructor() {
    this.books = [];
    this.users = [];
    this.loans = [];
  }

  generateId(array: Array<Book | User | Loan>): number {
    return array.length + 1;
  }

  registerBook(title: string, author: string) {
    const book = new Book(this.generateId(this.books), title, author);

    this.books.push(book);

    return book;
  }

  registerUser(name: string) {
    const user = new User(this.generateId(this.users), name);

    this.users.push(user);

    return user;
  }

  borrowBook(userId: number, bookId: number) {
    const book = this.books.find(b => b.getBookId() === bookId);
    const user = this.users.find(u => u.getUserId() === userId);

    if (!book) {
      throw new Error("Livro nao encontrado!");
    }
    if (!book.isAvailable()) {
      throw new Error("Impossivel emprestar um livro que ja esta emprestado");
    }

    if (!user) {
      throw new Error("Usuario nao encontrado!");
    }
    if (!user.canLend()) {
      throw new Error("Esse usuario ja atingiu o limite de emprestimos");
    }

    const loan = new Loan(this.generateId(this.loans), book, user);

    book.markAsBorrowed();
    user.addLoan(book);

    this.loans.push(loan);

    return loan;
  }

  returnBook(loanId: number) {
    const loan = this.loans.find(l => l.getLoanId() === loanId);

    if (!loan) {
      throw new Error("Emprestimo nao achado!");
    }

    const now = new Date();

    return loan.return(now);
  }

  listActiveLoans() {
    const activeLoans = this.loans.filter(l => l.getLoanStatus() === LoanStatus.ACTIVE);

    return activeLoans;
  }
}