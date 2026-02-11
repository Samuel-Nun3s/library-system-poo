import { BookModel } from "../models/Book.js";
import { UserModel } from "../models/User.js";
import { LoanModel } from "../models/Loan.js";
import Book from "./Book.js";

export default class Library {
  books: BookModel[];
  users: UserModel[];
  loans: LoanModel[];

  constructor() {
    this.books = [];
    this.users = [];
    this.loans = [];
  }

  registerBook(title: string, author: string) {
    const book = new Book(this.generateId(this.books), title, author);

    // this.books.push(book);
  }

  generateId(array: Array<BookModel | UserModel | LoanModel>): number {
    return array.length;
  }
}