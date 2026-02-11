import { BookModel } from "../models/Book.js";

export default class User {
  #id: number;
  #name: string;
  #maxLoans: number;
  #activeLoans: BookModel[];

  constructor(id: number, name: string) {
    if (!id) {
      throw new Error("Impossivel criar um usuario sem ID");
    }
    if(!name) {
      throw new Error("Impossivel criar um usuario sem o nome");
    }

    this.#id = id;
    this.#name = name;
    this.#maxLoans = 3;
    this.#activeLoans = [];
  }

  canLend() {
    if (this.#activeLoans.length === 3) {
      return false
    }
    return true;
  }

  addLoan(borrowedBook: BookModel) {
    if (this.canLend()) {
      return this.#activeLoans.push(borrowedBook);
    }
    throw new Error("Voce ja atingiu o nivel maximo de emprestimos");
  }

  removeLoan(borrowedBook: BookModel) {
    const bookBorrowedFromTheList = this.#activeLoans.find(l => l.id === borrowedBook.id);

    if (!bookBorrowedFromTheList) {
      throw new Error("Livro nao encontrado nos emprestimos do usuario");
    }

    this.#activeLoans = this.#activeLoans.filter(l => l.id !== borrowedBook.id);
  }

  getActiveLoans() {
    return this.#activeLoans;
  }
}