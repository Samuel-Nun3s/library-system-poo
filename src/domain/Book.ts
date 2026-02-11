export default class Book {
  #id: number;
  #title: string;
  #author: string;
  #available: boolean;

  constructor(id: number, title: string, author: string) {
    if (!id) {
      throw new Error("Impossivel criar um livro sem id");
    }
    if (!title) {
      throw new Error("Impossivel criar um livro sem titulo");
    }
    if (!author) {
      throw new Error("Impossivel criar um livro sem autor");
    }

    this.#id = id;
    this.#title = title;
    this.#author = author;
    this.#available = true;
  }

  markAsBorrowed() {
    if (!this.#available) {
      throw new Error("Esse livro ja esta emprestado");
    }
    return this.#available = false;
  }

  markAsAvailable() {
    if(this.#available) {
      throw new Error("Esse livro ja esta disponivel");
    }
    this.#available = true;
  }

  isAvailable() {
    return this.#available;
  }
}